<template>
  <div class="min-h-screen bg-background p-6">
    <div class="mx-auto max-w-7xl space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-bold tracking-tight text-foreground">MIDI Network</h1>
          <p class="mt-2 text-muted-foreground">
            Manage your synchronized MIDI device network
          </p>
        </div>

        <div class="flex items-center gap-4">
          <MidiConnectionStatus
            :status="status"
            :reconnect-attempts="reconnectAttempts"
          />
          <button
            v-if="isConnected"
            :disabled="isDiscovering"
            class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            @click="handleDiscovery"
          >
            {{ isDiscovering ? "Discovering..." : "Discover Devices" }}
          </button>
        </div>
      </div>

      <!-- Stats Overview -->
      <div class="grid gap-4 md:grid-cols-4">
        <div class="rounded-lg border bg-card p-4">
          <div class="flex items-center justify-between">
            <p class="text-sm text-muted-foreground">Total Devices</p>
            <Icon
              name="lucide:cpu"
              size="20"
              class="text-muted-foreground"
            />
          </div>
          <p class="mt-2 text-3xl font-bold">{{ devices.length }}</p>
        </div>

        <div class="rounded-lg border bg-card p-4">
          <div class="flex items-center justify-between">
            <p class="text-sm text-muted-foreground">Online</p>
            <Icon
              name="lucide:wifi"
              size="20"
              class="text-green-500"
            />
          </div>
          <p class="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">
            {{ onlineDevices.length }}
          </p>
        </div>

        <div class="rounded-lg border bg-card p-4">
          <div class="flex items-center justify-between">
            <p class="text-sm text-muted-foreground">Master Device</p>
            <Icon
              name="lucide:crown"
              size="20"
              class="text-yellow-500"
            />
          </div>
          <p class="mt-2 text-lg font-semibold">
            {{ masterDevice?.name || "None" }}
          </p>
        </div>

        <div class="rounded-lg border bg-card p-4">
          <div class="flex items-center justify-between">
            <p class="text-sm text-muted-foreground">Avg Latency</p>
            <Icon
              name="lucide:activity"
              size="20"
              class="text-muted-foreground"
            />
          </div>
          <p class="mt-2 text-3xl font-bold">{{ avgLatency }}ms</p>
        </div>
      </div>

      <!-- Device Grid -->
      <div>
        <h2 class="mb-4 text-2xl font-semibold">Devices</h2>

        <div
          v-if="devices.length === 0"
          class="flex flex-col items-center justify-center rounded-lg border border-dashed py-12"
        >
          <Icon
            name="lucide:search"
            size="48"
            class="mb-4 text-muted-foreground"
          />
          <p class="text-lg font-medium text-muted-foreground">No devices found</p>
          <p class="mt-1 text-sm text-muted-foreground">
            Click "Discover Devices" to scan for MIDI devices
          </p>
        </div>

        <div
          v-else
          class="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          <MidiDeviceCard
            v-for="device in devices"
            :key="device.id"
            :device="device"
            @set-master="handleSetMaster"
            @info="handleDeviceInfo"
          />
        </div>
      </div>

      <!-- Clock Control -->
      <div
        v-if="masterDevice"
        class="rounded-lg border bg-card p-6"
      >
        <h2 class="mb-4 text-2xl font-semibold">Clock Control</h2>

        <div class="flex items-center gap-4">
          <div class="flex-1">
            <label class="mb-2 block text-sm font-medium">BPM</label>
            <input
              v-model.number="bpm"
              type="number"
              min="20"
              max="300"
              class="w-full rounded-md border bg-background px-4 py-2"
              @change="handleBPMChange"
            />
          </div>

          <div class="flex gap-2">
            <button
              class="rounded-md bg-green-600 px-6 py-2 font-medium text-white transition-colors hover:bg-green-700"
              @click="handleStartClock"
            >
              Start
            </button>
            <button
              class="rounded-md bg-red-600 px-6 py-2 font-medium text-white transition-colors hover:bg-red-700"
              @click="handleStopClock"
            >
              Stop
            </button>
          </div>
        </div>
      </div>

      <!-- Debug Info -->
      <details class="rounded-lg border bg-card p-4">
        <summary class="cursor-pointer font-medium">Debug Information</summary>
        <div class="mt-4 space-y-2">
          <div class="rounded bg-muted p-3 font-mono text-xs">
            <p><strong>WebSocket URL:</strong> {{ wsUrl }}</p>
            <p><strong>Status:</strong> {{ status }}</p>
            <p><strong>Devices:</strong> {{ devices.length }}</p>
            <p><strong>Online:</strong> {{ onlineDevices.length }}</p>
          </div>
        </div>
      </details>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useMidiNetwork } from "~/composables/useMidiNetwork";

const wsUrl = ref("ws://localhost:8080");

const {
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
  setClockBPM,
  startClock,
  stopClock,
} = useMidiNetwork(wsUrl.value);

const bpm = ref(120);
const reconnectAttempts = ref(0);

const avgLatency = computed(() => {
  if (onlineDevices.value.length === 0) return 0;
  const total = onlineDevices.value.reduce((sum, device) => sum + device.latency, 0);
  return Math.round(total / onlineDevices.value.length);
});

function handleDiscovery() {
  startDiscovery();
  setTimeout(() => stopDiscovery(), 5000);
}

function handleSetMaster(deviceId: string) {
  setMasterDevice(deviceId);
}

function handleDeviceInfo(deviceId: string) {
  requestDeviceInfo(deviceId);
}

function handleBPMChange() {
  setClockBPM(bpm.value);
}

function handleStartClock() {
  startClock();
}

function handleStopClock() {
  stopClock();
}

useSeoMeta({
  title: "MIDI Network - Device Management",
  description: "Manage your synchronized MIDI device network",
});
</script>
