import type { IncomingMessage } from "http";
import type { Duplex } from "stream";

interface MockDevice {
  id: string;
  name: string;
  type: "master" | "slave";
  ipAddress: string;
  midiIn: boolean;
  midiOut: boolean;
  clockSync: boolean;
  firmwareVersion: string;
  rssi: number;
}

const mockDevices: MockDevice[] = [
  {
    id: "esp32-001",
    name: "Master Sequencer",
    type: "master",
    ipAddress: "192.168.1.100",
    midiIn: true,
    midiOut: true,
    clockSync: true,
    firmwareVersion: "1.0.0",
    rssi: -45,
  },
  {
    id: "esp32-002",
    name: "Synth Controller",
    type: "slave",
    ipAddress: "192.168.1.101",
    midiIn: true,
    midiOut: true,
    clockSync: true,
    firmwareVersion: "1.0.0",
    rssi: -52,
  },
  {
    id: "esp32-003",
    name: "Drum Machine",
    type: "slave",
    ipAddress: "192.168.1.102",
    midiIn: false,
    midiOut: true,
    clockSync: true,
    firmwareVersion: "1.0.0",
    rssi: -38,
  },
];

export default defineWebSocketHandler({
  open(peer) {
    console.log("[WebSocket] Client connected:", peer.id);

    peer.send(
      JSON.stringify({
        type: "ping",
        timestamp: Date.now(),
        payload: {
          message: "Connected to MIDI Network Server",
        },
      }),
    );

    const pingInterval = setInterval(() => {
      if (peer.readyState === 1) {
        mockDevices.forEach((device) => {
          peer.send(
            JSON.stringify({
              type: "ping",
              timestamp: Date.now(),
              payload: {
                deviceId: device.id,
                latency: Math.floor(Math.random() * 10) + 5,
              },
            }),
          );
        });
      }
    }, 3000);

    peer.ctx = { pingInterval };
  },

  message(peer, message) {
    console.log("[WebSocket] Received:", message.text());

    try {
      const data = JSON.parse(message.text());

      if (data.type === "device") {
        if (data.payload.action === "discover") {
          console.log("[WebSocket] Discovery requested");

          mockDevices.forEach((device, index) => {
            setTimeout(() => {
              peer.send(
                JSON.stringify({
                  type: "device",
                  timestamp: Date.now(),
                  payload: {
                    action: "discovered",
                    id: device.id,
                    name: device.name,
                    type: device.type,
                    ipAddress: device.ipAddress,
                    midiIn: device.midiIn,
                    midiOut: device.midiOut,
                    clockSync: device.clockSync,
                    firmwareVersion: device.firmwareVersion,
                    rssi: device.rssi,
                    latency: Math.floor(Math.random() * 10) + 5,
                  },
                }),
              );
            }, index * 500);
          });
        } else if (data.payload.action === "info") {
          const device = mockDevices.find((d) => d.id === data.deviceId);
          if (device) {
            peer.send(
              JSON.stringify({
                type: "device",
                timestamp: Date.now(),
                payload: {
                  action: "info",
                  ...device,
                  latency: Math.floor(Math.random() * 10) + 5,
                },
              }),
            );
          }
        } else if (data.payload.action === "setMaster") {
          console.log("[WebSocket] Setting master device:", data.deviceId);

          mockDevices.forEach((device) => {
            device.type = device.id === data.deviceId ? "master" : "slave";
          });

          peer.send(
            JSON.stringify({
              type: "device",
              timestamp: Date.now(),
              payload: {
                action: "update",
                id: data.deviceId,
                updates: { type: "master" },
              },
            }),
          );
        }
      } else if (data.type === "clock") {
        console.log("[WebSocket] Clock command:", data.payload.action);

        peer.send(
          JSON.stringify({
            type: "clock",
            timestamp: Date.now(),
            payload: {
              action: "ack",
              command: data.payload.action,
              bpm: data.payload.bpm,
            },
          }),
        );
      } else if (data.type === "midi") {
        console.log("[WebSocket] MIDI message:", data.payload);

        peer.send(
          JSON.stringify({
            type: "midi",
            timestamp: Date.now(),
            payload: {
              deviceId: data.deviceId,
              stats: {
                messagesReceived: Math.floor(Math.random() * 1000),
                messagesSent: Math.floor(Math.random() * 1000),
              },
            },
          }),
        );
      }
    } catch (error) {
      console.error("[WebSocket] Error parsing message:", error);
    }
  },

  close(peer, event) {
    console.log("[WebSocket] Client disconnected:", peer.id);
    if (peer.ctx?.pingInterval) {
      clearInterval(peer.ctx.pingInterval);
    }
  },

  error(peer, error) {
    console.error("[WebSocket] Error:", error);
  },
});
