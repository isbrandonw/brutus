import { ref, computed } from "vue";

export interface MidiDevice {
  id: string;
  name: string;
  type: "master" | "slave";
  status: "online" | "offline" | "syncing";
  ipAddress: string;
  lastSeen: number;
  latency: number;
  midiIn: boolean;
  midiOut: boolean;
  clockSync: boolean;
  firmwareVersion?: string;
  rssi?: number;
}

export interface DeviceStats {
  messagesReceived: number;
  messagesSent: number;
  avgLatency: number;
  uptime: number;
}

export function useMidiDevice() {
  const devices = ref<Map<string, MidiDevice>>(new Map());
  const deviceStats = ref<Map<string, DeviceStats>>(new Map());

  const deviceList = computed(() => Array.from(devices.value.values()));
  const onlineDevices = computed(() =>
    deviceList.value.filter((d) => d.status === "online"),
  );
  const masterDevice = computed(() => deviceList.value.find((d) => d.type === "master"));
  const slaveDevices = computed(() => deviceList.value.filter((d) => d.type === "slave"));

  function addDevice(device: MidiDevice) {
    devices.value.set(device.id, device);
    if (!deviceStats.value.has(device.id)) {
      deviceStats.value.set(device.id, {
        messagesReceived: 0,
        messagesSent: 0,
        avgLatency: 0,
        uptime: 0,
      });
    }
  }

  function updateDevice(id: string, updates: Partial<MidiDevice>) {
    const device = devices.value.get(id);
    if (device) {
      devices.value.set(id, { ...device, ...updates, lastSeen: Date.now() });
    }
  }

  function removeDevice(id: string) {
    devices.value.delete(id);
    deviceStats.value.delete(id);
  }

  function updateDeviceStats(id: string, stats: Partial<DeviceStats>) {
    const currentStats = deviceStats.value.get(id);
    if (currentStats) {
      deviceStats.value.set(id, { ...currentStats, ...stats });
    }
  }

  function getDevice(id: string): MidiDevice | undefined {
    return devices.value.get(id);
  }

  function getDeviceStats(id: string): DeviceStats | undefined {
    return deviceStats.value.get(id);
  }

  function checkDeviceHealth() {
    const now = Date.now();
    const timeout = 10000;

    devices.value.forEach((device, id) => {
      if (now - device.lastSeen > timeout && device.status !== "offline") {
        updateDevice(id, { status: "offline" });
      }
    });
  }

  function clearDevices() {
    devices.value.clear();
    deviceStats.value.clear();
  }

  return {
    devices: deviceList,
    onlineDevices,
    masterDevice,
    slaveDevices,
    deviceStats,
    addDevice,
    updateDevice,
    removeDevice,
    updateDeviceStats,
    getDevice,
    getDeviceStats,
    checkDeviceHealth,
    clearDevices,
  };
}
