# MIDI Network - ESP32 Synchronized Music Creation System

A real-time, low-latency MIDI network system for synchronized music creation across multiple ESP32 devices with a beautiful web-based control interface.

## 🎯 Overview

The MIDI Network system enables you to create a mesh of ESP32 devices that communicate via MIDI, synchronized with ultra-low latency for live music performance and production. The web UI provides real-time device management, MIDI routing, clock synchronization, and pattern sequencing.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│              Web UI (Nuxt/Vue + Inspira UI)             │
│  • Device discovery & management                        │
│  • Real-time connection monitoring                      │
│  • MIDI routing configuration                           │
│  • Clock/sync control (BPM, start/stop)                 │
│  • Visual feedback & metrics                            │
└────────────────┬────────────────────────────────────────┘
                 │ WebSocket (ws://localhost:8080)
                 ▼
┌─────────────────────────────────────────────────────────┐
│         Nuxt Server (WebSocket Handler)                 │
│  • Real-time bidirectional communication                │
│  • Device registry & state management                   │
│  • Message routing & broadcasting                       │
└─────┬───────────────────────────────────────────────┬───┘
      │ ESP-NOW / WiFi Mesh                           │
      ▼                                               ▼
┌─────────────────┐                         ┌─────────────────┐
│  ESP32 Master   │◄───────────────────────►│  ESP32 Slave    │
│  • MIDI Clock   │   ESP-NOW Mesh          │  • Clock Sync   │
│  • MIDI In/Out  │   (< 10ms latency)      │  • MIDI In/Out  │
│  • WebSocket    │                         │  • Pattern Play │
└─────────────────┘                         └─────────────────┘
      │                                               │
      ▼                                               ▼
   Hardware                                      Hardware
   MIDI Devices                                  MIDI Devices
```

## 🚀 Features

### Current Implementation (Proof of Concept)

✅ **WebSocket Communication**
- Real-time bidirectional communication between UI and devices
- Automatic reconnection with exponential backoff
- Connection status monitoring
- Message type routing (device, MIDI, clock, routing, pattern)

✅ **Device Discovery & Management**
- Auto-discovery of ESP32 nodes on the network
- Real-time device status (online/offline/syncing)
- Device capabilities display (MIDI In/Out, Clock Sync)
- Master/Slave role assignment
- Connection health monitoring with automatic timeout detection

✅ **Real-time Monitoring**
- Live connection status indicator
- Device latency tracking
- Network statistics (total devices, online count, avg latency)
- Device-specific metrics (RSSI, firmware version)

✅ **Clock Control Interface**
- BPM adjustment (20-300 BPM)
- Start/Stop clock commands
- Master device selection

✅ **Beautiful UI Components**
- Responsive device cards with status indicators
- Animated connection status badges
- Real-time stats dashboard
- Debug information panel

### Planned Features

🔲 **MIDI Routing Matrix**
- Visual drag-and-drop routing interface
- Input → Output mapping
- MIDI channel filtering
- Message type filtering (notes, CC, clock, etc.)

🔲 **Step Sequencer**
- Grid-based pattern editor
- Pattern storage on devices
- Pattern chaining
- Trigger pads for live performance

🔲 **Advanced Sync**
- Latency compensation
- NTP time synchronization
- Drift correction
- Sync health visualization

🔲 **MIDI Message Monitoring**
- Real-time message log viewer
- Visual activity indicators
- Message filtering
- Performance metrics

## 📁 Project Structure

```
/workspaces/brutus/
├── composables/
│   ├── useWebSocketConnection.ts    # WebSocket connection management
│   ├── useMidiDevice.ts             # Device state management
│   └── useMidiNetwork.ts            # Main MIDI network composable
│
├── components/
│   └── midi/
│       ├── DeviceCard.vue           # Device status card
│       └── ConnectionStatus.vue     # Connection indicator
│
├── pages/
│   └── midi.vue                     # Main MIDI network dashboard
│
└── server/
    └── websocket.ts                 # WebSocket server handler (mock)
```

## 🛠️ Tech Stack

### Frontend
- **Nuxt 3** - Full-stack Vue framework
- **Vue 3** - Composition API with TypeScript
- **Inspira UI** - Beautiful, animated UI components
- **Tailwind CSS** - Utility-first styling
- **WebSocket API** - Real-time communication

### Backend (Planned)
- **ESP32** - Microcontroller platform
- **ESP-NOW** - Ultra-low latency peer-to-peer (< 10ms)
- **WiFi** - WebSocket server for UI communication
- **MIDI Library** - FortySevenEffects MIDI Library
- **NTP** - Time synchronization
- **mDNS** - Device discovery

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- ESP32 development board (for hardware implementation)
- MIDI hardware (synthesizers, controllers, etc.)

### Installation

1. **Clone and install dependencies:**
   ```bash
   cd /workspaces/brutus
   pnpm install
   ```

2. **Start the development server:**
   ```bash
   pnpm dev
   ```

3. **Access the MIDI Network UI:**
   Navigate to [http://localhost:3000/midi](http://localhost:3000/midi)

### Testing with Mock Server

The current implementation includes a mock WebSocket server for testing without hardware:

1. Start the dev server (WebSocket server runs automatically)
2. Open the MIDI page at `/midi`
3. Click "Discover Devices" to see mock ESP32 devices
4. Interact with device cards and clock controls

The mock server simulates:
- 3 ESP32 devices (1 master, 2 slaves)
- Device discovery responses
- Real-time ping/latency updates
- Master device switching
- Clock control acknowledgments

## 📡 WebSocket Protocol

### Message Format

All messages follow this structure:

```typescript
interface WebSocketMessage {
  type: "device" | "midi" | "clock" | "routing" | "pattern" | "ping";
  deviceId?: string;
  timestamp: number;
  payload: any;
}
```

### Message Types

#### Device Messages

**Discovery Request:**
```json
{
  "type": "device",
  "timestamp": 1234567890,
  "payload": {
    "action": "discover"
  }
}
```

**Discovery Response:**
```json
{
  "type": "device",
  "timestamp": 1234567890,
  "payload": {
    "action": "discovered",
    "id": "esp32-001",
    "name": "Master Sequencer",
    "type": "master",
    "ipAddress": "192.168.1.100",
    "midiIn": true,
    "midiOut": true,
    "clockSync": true,
    "firmwareVersion": "1.0.0",
    "rssi": -45,
    "latency": 8
  }
}
```

**Set Master Device:**
```json
{
  "type": "device",
  "deviceId": "esp32-002",
  "timestamp": 1234567890,
  "payload": {
    "action": "setMaster"
  }
}
```

#### Clock Messages

**Set BPM:**
```json
{
  "type": "clock",
  "timestamp": 1234567890,
  "payload": {
    "action": "setBPM",
    "bpm": 120
  }
}
```

**Start/Stop Clock:**
```json
{
  "type": "clock",
  "timestamp": 1234567890,
  "payload": {
    "action": "start"  // or "stop"
  }
}
```

#### MIDI Messages

**Send MIDI Data:**
```json
{
  "type": "midi",
  "deviceId": "esp32-001",
  "timestamp": 1234567890,
  "payload": {
    "data": [144, 60, 127]  // Note On, Middle C, Velocity 127
  }
}
```

#### Ping Messages

**Heartbeat:**
```json
{
  "type": "ping",
  "timestamp": 1234567890,
  "payload": {
    "deviceId": "esp32-001",
    "latency": 8
  }
}
```

## 🎨 UI Components

### DeviceCard

Displays individual device information with real-time status updates.

**Props:**
- `device: MidiDevice` - Device object
- `showActions?: boolean` - Show action buttons (default: true)
- `class?: string` - Additional CSS classes

**Events:**
- `@setMaster(deviceId)` - Set device as master
- `@info(deviceId)` - Request device info

**Features:**
- Real-time status indicator (online/offline/syncing)
- Latency display
- MIDI capabilities badges (In/Out/Sync)
- Master device badge
- Firmware version and RSSI
- Action buttons

### ConnectionStatus

Shows WebSocket connection status with visual feedback.

**Props:**
- `status: ConnectionStatus` - Connection state
- `reconnectAttempts?: number` - Number of reconnection attempts
- `class?: string` - Additional CSS classes

**States:**
- `connected` - Green, pulsing indicator
- `connecting` - Yellow, animated
- `disconnected` - Gray
- `error` - Red

## 🔧 Composables

### useWebSocketConnection

Low-level WebSocket connection management.

```typescript
const {
  status,           // ConnectionStatus
  error,            // Error message
  isConnected,      // Boolean
  lastMessage,      // Last received message
  reconnectAttempts,// Number of reconnection attempts
  connect,          // () => void
  disconnect,       // () => void
  send,             // (message: WebSocketMessage) => void
  on,               // (type: string, handler: Function) => unsubscribe
} = useWebSocketConnection("ws://localhost:8080");
```

**Features:**
- Automatic reconnection (max 5 attempts)
- Message type routing
- Connection state management
- Error handling

### useMidiDevice

Device state management.

```typescript
const {
  devices,          // MidiDevice[]
  onlineDevices,    // MidiDevice[]
  masterDevice,     // MidiDevice | undefined
  slaveDevices,     // MidiDevice[]
  deviceStats,      // Map<string, DeviceStats>
  addDevice,        // (device: MidiDevice) => void
  updateDevice,     // (id: string, updates: Partial<MidiDevice>) => void
  removeDevice,     // (id: string) => void
  updateDeviceStats,// (id: string, stats: Partial<DeviceStats>) => void
  getDevice,        // (id: string) => MidiDevice | undefined
  getDeviceStats,   // (id: string) => DeviceStats | undefined
  checkDeviceHealth,// () => void
  clearDevices,     // () => void
} = useMidiDevice();
```

**Features:**
- Device registry
- Health monitoring (10s timeout)
- Statistics tracking
- Computed device lists

### useMidiNetwork

High-level MIDI network management (combines WebSocket + Device management).

```typescript
const {
  status,           // ConnectionStatus
  isConnected,      // Boolean
  devices,          // MidiDevice[]
  onlineDevices,    // MidiDevice[]
  masterDevice,     // MidiDevice | undefined
  slaveDevices,     // MidiDevice[]
  isDiscovering,    // Boolean
  startDiscovery,   // () => void
  stopDiscovery,    // () => void
  requestDeviceInfo,// (deviceId: string) => void
  setMasterDevice,  // (deviceId: string) => void
  sendMidiMessage,  // (deviceId: string, midiData: number[]) => void
  setClockBPM,      // (bpm: number) => void
  startClock,       // () => void
  stopClock,        // () => void
} = useMidiNetwork("ws://localhost:8080");
```

**Features:**
- Automatic connection on mount
- Device discovery
- Clock control
- MIDI message sending
- Health monitoring (5s interval)
- Automatic cleanup on unmount

## 🔌 ESP32 Implementation (Planned)

### Hardware Requirements

- ESP32 DevKit (any variant with WiFi)
- MIDI DIN connectors (5-pin)
- Optocouplers (6N138 or similar)
- Resistors and diodes
- Power supply (5V)

### Firmware Architecture

```cpp
// Main components
- WiFiManager: Network connection
- WebSocketClient: UI communication
- ESPNowManager: Peer-to-peer mesh
- MIDIHandler: MIDI I/O
- ClockSync: Timing synchronization
- PatternEngine: Sequencer
```

### Key Features

1. **ESP-NOW Mesh Network**
   - Ultra-low latency (< 10ms)
   - Automatic peer discovery
   - Broadcast and unicast support
   - 250 byte packet size

2. **MIDI Implementation**
   - Hardware UART for MIDI I/O
   - Standard MIDI baud rate (31250)
   - Full MIDI message support
   - MIDI clock generation/sync

3. **Clock Synchronization**
   - NTP for initial time sync
   - Master broadcasts clock via ESP-NOW
   - Slaves sync to master with drift correction
   - Latency compensation

4. **WebSocket Server**
   - Runs on master device
   - Handles UI communication
   - Device registry
   - Message routing

### Example ESP32 Code Structure

```cpp
// pseudocode - actual implementation needed

#include <WiFi.h>
#include <WebSocketsServer.h>
#include <esp_now.h>
#include <MIDI.h>

// Configuration
#define MIDI_BAUD 31250
#define WS_PORT 8080

// Global objects
WebSocketsServer webSocket(WS_PORT);
MIDI_CREATE_INSTANCE(HardwareSerial, Serial2, MIDI);

// Device state
struct DeviceState {
  String id;
  String name;
  bool isMaster;
  uint8_t peerMAC[6];
  uint32_t lastSeen;
  int16_t latency;
};

void setup() {
  // Initialize WiFi
  WiFi.begin(SSID, PASSWORD);
  
  // Initialize ESP-NOW
  esp_now_init();
  esp_now_register_recv_cb(onESPNowReceive);
  
  // Initialize MIDI
  MIDI.begin(MIDI_CHANNEL_OMNI);
  
  // Initialize WebSocket (master only)
  if (isMaster) {
    webSocket.begin();
    webSocket.onEvent(onWebSocketEvent);
  }
  
  // Start device discovery
  discoverPeers();
}

void loop() {
  // Handle WebSocket
  if (isMaster) {
    webSocket.loop();
  }
  
  // Handle MIDI
  if (MIDI.read()) {
    handleMIDI();
  }
  
  // Handle clock
  if (isMaster && clockRunning) {
    sendClockPulse();
  }
  
  // Health check
  checkPeerHealth();
}

void onESPNowReceive(const uint8_t *mac, const uint8_t *data, int len) {
  // Handle ESP-NOW messages
  // - MIDI data
  // - Clock sync
  // - Device discovery
  // - Status updates
}

void onWebSocketEvent(uint8_t num, WStype_t type, uint8_t *payload, size_t length) {
  // Handle WebSocket messages from UI
  // - Device discovery
  // - Clock control
  // - MIDI routing
  // - Configuration
}

void handleMIDI() {
  // Process incoming MIDI
  // Route to appropriate outputs
  // Broadcast via ESP-NOW if needed
}

void sendClockPulse() {
  // Generate MIDI clock pulse
  // Broadcast to all peers via ESP-NOW
  // Send to hardware MIDI out
}
```

## 🎛️ Usage Examples

### Basic Device Discovery

```typescript
// In your component
const { isConnected, startDiscovery, devices } = useMidiNetwork();

// Wait for connection
watch(isConnected, (connected) => {
  if (connected) {
    startDiscovery();
  }
});

// Devices will populate automatically
watch(devices, (newDevices) => {
  console.log(`Found ${newDevices.length} devices`);
});
```

### Clock Control

```typescript
const { setClockBPM, startClock, stopClock } = useMidiNetwork();

// Set tempo
setClockBPM(128);

// Start playback
startClock();

// Stop playback
stopClock();
```

### Send MIDI Messages

```typescript
const { sendMidiMessage } = useMidiNetwork();

// Send Note On (channel 1, note 60, velocity 100)
sendMidiMessage("esp32-001", [0x90, 60, 100]);

// Send Note Off
sendMidiMessage("esp32-001", [0x80, 60, 0]);

// Send Control Change (CC 1, value 64)
sendMidiMessage("esp32-001", [0xB0, 1, 64]);
```

### Monitor Device Health

```typescript
const { devices, getDeviceStats } = useMidiNetwork();

// Check device latency
devices.value.forEach(device => {
  const stats = getDeviceStats(device.id);
  if (stats && stats.avgLatency > 50) {
    console.warn(`High latency on ${device.name}: ${stats.avgLatency}ms`);
  }
});
```

## 🧪 Testing

### Mock Server Testing

The included mock WebSocket server simulates a complete MIDI network:

1. **Start the server:**
   ```bash
   pnpm dev
   ```

2. **Open the UI:**
   Navigate to `http://localhost:3000/midi`

3. **Test features:**
   - Click "Discover Devices" to populate mock devices
   - Watch real-time latency updates (every 3 seconds)
   - Switch master device
   - Adjust BPM and control clock
   - Monitor connection status

### Hardware Testing (Future)

1. Flash ESP32 firmware to devices
2. Configure WiFi credentials
3. Power on devices
4. Connect to WebSocket server
5. Test MIDI I/O with hardware

## 🐛 Troubleshooting

### WebSocket Connection Issues

**Problem:** Cannot connect to WebSocket server

**Solutions:**
- Verify server is running (`pnpm dev`)
- Check WebSocket URL in `pages/midi.vue`
- Ensure port 8080 is not blocked
- Check browser console for errors

### Device Not Appearing

**Problem:** Devices don't show up after discovery

**Solutions:**
- Check WebSocket connection status
- Verify mock server is responding (check server logs)
- Try manual refresh
- Check browser console for errors

### High Latency

**Problem:** Device latency is too high

**Solutions:**
- Check network congestion
- Verify WiFi signal strength (RSSI)
- Reduce number of concurrent devices
- Use ESP-NOW for time-critical MIDI (hardware implementation)

## 📊 Performance Considerations

### Latency Targets

- **ESP-NOW (device-to-device):** < 10ms
- **WebSocket (UI-to-device):** < 50ms
- **MIDI Clock Jitter:** < 1ms
- **UI Update Rate:** 60 FPS

### Scalability

- **Max Devices:** 20 (ESP-NOW limit: 20 peers)
- **Max Concurrent WebSocket Clients:** 10
- **MIDI Messages/Second:** 1000+ per device
- **Network Bandwidth:** ~100 Kbps per device

### Optimization Tips

1. **Use ESP-NOW for time-critical MIDI**
   - Clock sync
   - Note timing
   - Real-time control

2. **Use WebSocket for configuration**
   - Device management
   - Routing setup
   - Pattern storage

3. **Batch UI updates**
   - Throttle device status updates
   - Debounce user input
   - Use virtual scrolling for large device lists

4. **Minimize message size**
   - Use binary protocols where possible
   - Compress JSON payloads
   - Send deltas instead of full state

## 🗺️ Roadmap

### Phase 1: Foundation ✅ (Current)
- [x] WebSocket communication
- [x] Device discovery
- [x] Connection monitoring
- [x] Basic UI components
- [x] Mock server for testing

### Phase 2: Core Features (Next)
- [ ] MIDI routing matrix UI
- [ ] Real-time MIDI message viewer
- [ ] Pattern storage/recall
- [ ] ESP32 firmware (basic)
- [ ] Hardware MIDI I/O

### Phase 3: Advanced Features
- [ ] Step sequencer interface
- [ ] Latency compensation
- [ ] NTP synchronization
- [ ] Pattern chaining
- [ ] Performance metrics

### Phase 4: Polish
- [ ] PWA support
- [ ] Mobile responsive design
- [ ] Settings persistence
- [ ] Firmware OTA updates
- [ ] Comprehensive documentation

## 🤝 Contributing

Contributions are welcome! Areas where help is needed:

- ESP32 firmware implementation
- MIDI routing matrix UI
- Step sequencer component
- Performance optimization
- Documentation
- Testing

## 📝 License

This project is part of the Inspira UI repository and follows the same MIT license.

## 🙏 Acknowledgments

- **Inspira UI** - Beautiful component library
- **Nuxt 3** - Full-stack framework
- **ESP-NOW** - Low-latency mesh networking
- **MIDI Specification** - Musical Instrument Digital Interface

## 📚 Resources

### MIDI
- [MIDI Specification](https://www.midi.org/specifications)
- [MIDI Messages](https://www.midi.org/specifications-old/item/table-1-summary-of-midi-message)

### ESP32
- [ESP-NOW Documentation](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/network/esp_now.html)
- [ESP32 Arduino Core](https://github.com/espressif/arduino-esp32)
- [FortySevenEffects MIDI Library](https://github.com/FortySevenEffects/arduino_midi_library)

### WebSocket
- [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [Nuxt WebSocket](https://nuxt.com/docs/guide/directory-structure/server#websocket)

---

**Built with ❤️ for music creators**
