import { ref, onUnmounted, computed } from "vue";

export type ConnectionStatus = "disconnected" | "connecting" | "connected" | "error";

export interface WebSocketMessage {
  type: "device" | "midi" | "clock" | "routing" | "pattern" | "ping";
  deviceId?: string;
  timestamp: number;
  payload: any;
}

export function useWebSocketConnection(url: string) {
  const ws = ref<WebSocket | null>(null);
  const status = ref<ConnectionStatus>("disconnected");
  const error = ref<string | null>(null);
  const lastMessage = ref<WebSocketMessage | null>(null);
  const reconnectAttempts = ref(0);
  const maxReconnectAttempts = 5;
  const reconnectDelay = 2000;

  const isConnected = computed(() => status.value === "connected");

  const messageHandlers = new Map<string, Set<(payload: any) => void>>();

  function connect() {
    if (status.value === "connecting" || status.value === "connected") {
      return;
    }

    status.value = "connecting";
    error.value = null;

    try {
      ws.value = new WebSocket(url);

      ws.value.onopen = () => {
        status.value = "connected";
        reconnectAttempts.value = 0;
        console.log("[WebSocket] Connected to", url);
      };

      ws.value.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          lastMessage.value = message;

          const handlers = messageHandlers.get(message.type);
          if (handlers) {
            handlers.forEach((handler) => handler(message.payload));
          }
        } catch (err) {
          console.error("[WebSocket] Failed to parse message:", err);
        }
      };

      ws.value.onerror = (event) => {
        console.error("[WebSocket] Error:", event);
        status.value = "error";
        error.value = "WebSocket connection error";
      };

      ws.value.onclose = () => {
        console.log("[WebSocket] Connection closed");
        status.value = "disconnected";
        ws.value = null;

        if (reconnectAttempts.value < maxReconnectAttempts) {
          reconnectAttempts.value++;
          console.log(
            `[WebSocket] Reconnecting... (${reconnectAttempts.value}/${maxReconnectAttempts})`,
          );
          setTimeout(connect, reconnectDelay);
        } else {
          error.value = "Failed to reconnect after multiple attempts";
        }
      };
    } catch (err) {
      console.error("[WebSocket] Failed to create connection:", err);
      status.value = "error";
      error.value = err instanceof Error ? err.message : "Unknown error";
    }
  }

  function disconnect() {
    if (ws.value) {
      reconnectAttempts.value = maxReconnectAttempts;
      ws.value.close();
      ws.value = null;
    }
    status.value = "disconnected";
  }

  function send(message: WebSocketMessage) {
    if (ws.value && ws.value.readyState === WebSocket.OPEN) {
      ws.value.send(JSON.stringify(message));
    } else {
      console.warn("[WebSocket] Cannot send message - not connected");
    }
  }

  function on(type: string, handler: (payload: any) => void) {
    if (!messageHandlers.has(type)) {
      messageHandlers.set(type, new Set());
    }
    messageHandlers.get(type)!.add(handler);

    return () => {
      const handlers = messageHandlers.get(type);
      if (handlers) {
        handlers.delete(handler);
      }
    };
  }

  onUnmounted(() => {
    disconnect();
  });

  return {
    status,
    error,
    isConnected,
    lastMessage,
    reconnectAttempts,
    connect,
    disconnect,
    send,
    on,
  };
}
