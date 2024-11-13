# @wemap/expo-livemap

A custom WebView component for Expo applications that exposes a Livemap component and methods to interact with it.

## Installation

```bash
npm install @wemap/expo-livemap
```

## Usage

### Basic Usage

```javascript
import React from 'react';
import { View } from 'react-native';
import { LiveMap } from '@wemap/expo-livemap';

function App() {
  const handleCustomMessage = (event) => {
    console.log('Received message from LiveMap:', event);
  };

  return (
    <View style={{ flex: 1 }}>
      <LiveMap
        source={{ uri: 'https://livemap.getwemap.com' }}
        onCustomMessage={handleCustomMessage}
      />
    </View>
  );
}
```

### Advanced Usage with Ref

```javascript
import React, { useRef } from 'react';
import { View, Button } from 'react-native';
import { LiveMap, LiveMapRef } from '@wemap/expo-livemap';

function App() {
  const mapRef = useRef<LiveMapRef>(null);

  const handleCustomMessage = (event) => {
    console.log('Received message from LiveMap:', event);
  };

  const sendMessageToMap = () => {
    mapRef.current?.postCustomMessage('Hello from React Native!');
  };

  return (
    <View style={{ flex: 1 }}>
      <LiveMap
        ref={mapRef}
        source={{ uri: 'https://livemap.getwemap.com' }}
        onCustomMessage={handleCustomMessage}
      />
      <Button 
        title="Send Message to LiveMap" 
        onPress={sendMessageToMap} 
      />
    </View>
  );
}
```

### WebView JavaScript Interface

Inside your web content, you can send messages to React Native using the injected postCustomMessage function:

```javascript
// Send message from LiveMap to React Native
window.postCustomMessage({
  type: 'mapEvent',
  data: 'Map is ready!'
});
```

## API Reference

### Props

The component accepts all standard React Native WebView props plus:

onCustomMessage: (event: any) => void
Callback function that handles messages sent from the LiveMap

### Ref Methods

postCustomMessage(message: string): Sends a message to the LiveMap
reload(): Reloads the LiveMap

## TypeScript Support

The package includes TypeScript definitions. For TypeScript projects, you can import types:

```typescript
import { LiveMapProps, LiveMapRef } from '@wemap/expo-livemap';
```

## Requirements

- Expo SDK 51 or higher
- React Native WebView 11 or higher

## License

MIT

## Author

Simon Milleto <simon@getwemap.com>