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
import { LivemapWebview } from '@wemap/expo-livemap';

function App() {
  return (
    <View style={{ flex: 1 }}>
    <LivemapWebview
      emmid={25414} />
    </View>
  );
}
```

### Advanced Usage with Ref and event

```javascript
import React, { useRef } from 'react';
import { View, Button } from 'react-native';
import { LiveMap, LiveMapRef } from '@wemap/expo-livemap';

function App() {
  const mapRef = useRef(null);

  const centerTo = () => {
    livemapWebviewRef.current?.centerTo({ latitude: 43.856614, longitude: 2.352222 }, 15);
  };

  const getUserLocation = () => {
    livemapWebviewRef.current?.getUserLocation().then((userLocation) => {
      console.log(userLocation)
    });
  };

  const onContentUpdated = (data) => {
    console.log('onContentUpdated', data.items.length);
  };

  return (
    <View style={{ flex: 1 }}>
    <LivemapWebview
      onContentUpdated={onContentUpdated}
      ref={livemapWebviewRef}
      emmid={25414} />
    </View>
  );
}
```

## API Reference

### Props

The component accepts all standard React Native WebView props plus specific livemap event like: 

```javascript
onContentUpdated(data) => void
```

All events are specified in the [TypeScript definitions file](./src/index.d.ts)

### Ref Methods

The ref component can be used to trigger specific map action like `centerTo` or `getUserLocation`.

All ref methods are specified in the [TypeScript definitions file](./src/index.d.ts)

## TypeScript Support

The package includes TypeScript definitions. For TypeScript projects, you can import types:

```typescript
import { LivemapWebviewProps, LivemapWebviewRef } from '@wemap/expo-livemap';
```

## Requirements

- Expo SDK 51 or higher
- React Native WebView 11 or higher

## License

MIT

## Author

Wemap