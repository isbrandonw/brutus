import { ref, onMounted, onUnmounted } from "vue";
import { useWebSocketConnection } from "./useWebSocketConnection";
import { useMidiDevice, type MidiDevice } from "./useMidiDevice";

export function useMidiNetwork(wsUrl: string = "ws://localhost:8080") {
  const { status, isConnected, connect, disconnect, send, on } = useWebSocketConnection(wsUrl);
  const {
    devices,
    onlineDevices,
    masterDevice,
    slaveDevices,
    addDevice,
    updateDevice,
    removeDevice,
    updateDeviceStats,
    checkDeviceHealth,
  } = useMidiDevice();

  const isDiscovering = ref(false);
  const healthCheckInterval = ref<NodeJS.Timeout | null>(null);

  function startDiscovery() {
    if (!isConnected.value) {
      console.warn("[MIDI Network] Cannot discover - not connected");
      return;
    }

    isDiscovering.value = true;
    send({
      type: "device",
      timestamp: Date.now(),
      payload: {
        action: "discover",
      },
    });
  }

  function stopDiscovery() {
    isDiscovering.value = false;
  }

  function requestDeviceInfo(deviceId: string) {
    send({
      type: "device",
      deviceId,
      timestamp: Date.now(),
      payload: {
        action: "info",
      },
    });
  }

  function setMasterDevice(deviceId: string) {
    send({
      type: "device",
      deviceId,
      timestamp: Date.now(),
      payload: {
        action: "setMaster",
      },
    });
  }

  function sendMidiMessage(deviceId: string, midiData: number[]) {
    send({
      type: "midi",
      deviceId,
      timestamp: Date.now(),
      payload: {
        data: midiData,
      },
    });
  }

  function setClockBPM(bpm: number) {
    send({
      type: "clock",
      timestamp: Date.now(),
      payload: {
        action: "setBPM",
        bpm,
      },
    });
  }

  function startClock() {
    send({
      type: "clock",
      timestamp: Date.now(),
      payload: {
        action: "start",
      },
    });
  }

  function stopClock() {
    send({
      type: "clock",
      timestamp: Date.now(),
      payload: {
        action: "stop",
      },
    });
  }

  onMounted(() => {
    connect();

    on("device", (payload) => {
      if (payload.action === "discovered" || payload.action === "info") {
        const device: MidiDevice = {
          id: payload.id,
          name: payload.name || `Device ${payload.id}`,
          type: payload.type || "slave",
          status: "online",
          ipAddress: payload.ipAddress || "unknown",
          lastSeen: Date.now(),
          latency: payload.latency || 0,
          midiIn: payload.midiIn || false,
          midiOut: payload.midiOut || false,
          clockSync: payload.clockSync || false,
          firmwareVersion: payload.firmwareVersion,
          rssi: payload.rssi,
        };
        addDevice(device);
      } else if (payload.action === "removed") {
        removeDevice(payload.id);
      } else if (payload.action === "update") {
        updateDevice(payload.id, payload.updates);
      }
    });

    on("midi", (payload) => {
      if (payload.deviceId && payload.stats) {
        updateDeviceStats(payload.deviceId, payload.stats);
      }
    });

    on("ping", (payload) => {
      if (payload.deviceId) {
        updateDevice(payload.deviceId, {
          lastSeen: Date.now(),
          latency: payload.latency || 0,
        });
      }
    });

    healthCheckInterval.value = setInterval(checkDeviceHealth, 5000);
  });

  onUnmounted(() => {
    if (healthCheckInterval.value) {
      clearInterval(healthCheckInterval.value);
    }
    disconnect();
  });

  return {
    status,
    isConnected,
    devices,
    onlineDevices,
    masterDevice,
    slaveDevices,
    isDiscovering,
    startDiscovery,
    stopDiscovery,
    requestDeviceInfo,
    setMasterDevice,
    sendMidiMessage,
    setClockBPM,
    startClock,
    stopClock,
  };
}
