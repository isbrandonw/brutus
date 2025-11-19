<template>
  <div
    :class="
      cn(
        'relative overflow-hidden rounded-lg border bg-card p-6 transition-all duration-300',
        statusColors[device.status].border,
        'hover:shadow-lg',
        props.class,
      )
    "
  >
    <!-- Status Indicator -->
    <div class="absolute right-4 top-4">
      <div
        :class="
          cn(
            'h-3 w-3 rounded-full',
            statusColors[device.status].bg,
            device.status === 'online' && 'animate-pulse',
          )
        "
      />
    </div>

    <!-- Device Info -->
    <div class="space-y-4">
      <div>
        <div class="flex items-center gap-2">
          <h3 class="text-lg font-semibold text-foreground">{{ device.name }}</h3>
          <span
            v-if="device.type === 'master'"
            class="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
          >
            Master
          </span>
        </div>
        <p class="text-sm text-muted-foreground">{{ device.ipAddress }}</p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-1">
          <p class="text-xs text-muted-foreground">Latency</p>
          <p class="text-sm font-medium">{{ device.latency }}ms</p>
        </div>
        <div class="space-y-1">
          <p class="text-xs text-muted-foreground">Status</p>
          <p :class="cn('text-sm font-medium', statusColors[device.status].text)">
            {{ device.status }}
          </p>
        </div>
      </div>

      <!-- MIDI Capabilities -->
      <div class="flex gap-2">
        <div
          v-if="device.midiIn"
          class="flex items-center gap-1 rounded-md bg-green-500/10 px-2 py-1 text-xs text-green-600 dark:text-green-400"
        >
          <Icon
            name="lucide:arrow-down-to-line"
            size="12"
          />
          MIDI In
        </div>
        <div
          v-if="device.midiOut"
          class="flex items-center gap-1 rounded-md bg-blue-500/10 px-2 py-1 text-xs text-blue-600 dark:text-blue-400"
        >
          <Icon
            name="lucide:arrow-up-from-line"
            size="12"
          />
          MIDI Out
        </div>
        <div
          v-if="device.clockSync"
          class="flex items-center gap-1 rounded-md bg-purple-500/10 px-2 py-1 text-xs text-purple-600 dark:text-purple-400"
        >
          <Icon
            name="lucide:clock"
            size="12"
          />
          Sync
        </div>
      </div>

      <!-- Additional Info -->
      <div
        v-if="device.firmwareVersion || device.rssi"
        class="flex items-center justify-between border-t pt-3 text-xs text-muted-foreground"
      >
        <span v-if="device.firmwareVersion">v{{ device.firmwareVersion }}</span>
        <span
          v-if="device.rssi"
          class="flex items-center gap-1"
        >
          <Icon
            name="lucide:wifi"
            size="12"
          />
          {{ device.rssi }}dBm
        </span>
      </div>
    </div>

    <!-- Actions -->
    <div
      v-if="showActions"
      class="mt-4 flex gap-2"
    >
      <button
        v-if="device.type !== 'master'"
        class="flex-1 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        @click="$emit('setMaster', device.id)"
      >
        Set as Master
      </button>
      <button
        class="rounded-md border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
        @click="$emit('info', device.id)"
      >
        Info
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "vue";
import type { MidiDevice } from "~/composables/useMidiDevice";

interface Props {
  device: MidiDevice;
  showActions?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  showActions: true,
});

defineEmits<{
  setMaster: [deviceId: string];
  info: [deviceId: string];
}>();

const statusColors = {
  online: {
    bg: "bg-green-500",
    text: "text-green-600 dark:text-green-400",
    border: "border-green-500/20",
  },
  offline: {
    bg: "bg-gray-400",
    text: "text-gray-600 dark:text-gray-400",
    border: "border-gray-500/20",
  },
  syncing: {
    bg: "bg-yellow-500",
    text: "text-yellow-600 dark:text-yellow-400",
    border: "border-yellow-500/20",
  },
};
</script>
