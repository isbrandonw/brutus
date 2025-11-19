<template>
  <div
    :class="
      cn(
        'flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all',
        statusStyles[status].bg,
        statusStyles[status].border,
        statusStyles[status].text,
        props.class,
      )
    "
  >
    <div
      :class="
        cn(
          'h-2 w-2 rounded-full',
          statusStyles[status].dot,
          status === 'connected' && 'animate-pulse',
        )
      "
    />
    <span>{{ statusText }}</span>
    <span
      v-if="reconnectAttempts > 0 && status !== 'connected'"
      class="text-xs opacity-70"
    >
      ({{ reconnectAttempts }})
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "vue";
import type { ConnectionStatus } from "~/composables/useWebSocketConnection";

interface Props {
  status: ConnectionStatus;
  reconnectAttempts?: number;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  reconnectAttempts: 0,
});

const statusStyles = {
  connected: {
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    text: "text-green-600 dark:text-green-400",
    dot: "bg-green-500",
  },
  connecting: {
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    text: "text-yellow-600 dark:text-yellow-400",
    dot: "bg-yellow-500",
  },
  disconnected: {
    bg: "bg-gray-500/10",
    border: "border-gray-500/20",
    text: "text-gray-600 dark:text-gray-400",
    dot: "bg-gray-500",
  },
  error: {
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    text: "text-red-600 dark:text-red-400",
    dot: "bg-red-500",
  },
};

const statusText = computed(() => {
  switch (props.status) {
    case "connected":
      return "Connected";
    case "connecting":
      return "Connecting...";
    case "disconnected":
      return "Disconnected";
    case "error":
      return "Connection Error";
    default:
      return "Unknown";
  }
});
</script>
