import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { WebView } from "react-native-webview";
import type { WebViewProps, WebViewMessageEvent } from "react-native-webview";

import { createInjectedMethods, generateMethodCalls } from "./bridgeMethods";
import { Coordinates, DrawPolylineOptions, Filters, Marker, Pinpoint } from "./types";
import { generateUUID } from "./utils";

export interface LivemapWebviewProps extends WebViewProps {
  injectedJavaScript?: string;
  emmid: number;
  customConfig?: {
    allowFileAccess?: boolean;
    cacheEnabled?: boolean;
  };

  onActionButtonClick?(): void;
  onArDisabled?(): void;
  onArEnabled?(): void;
  onContentUpdated?(data: {
    type: "pinpoints";
    items: Pinpoint[];
    query: {
      query: string;
      minaltitude: number;
      maxaltitude: number;
      tags: string[];
    };
  }): void;
  onDeviceAttitudeUpdated?(): void;
  onEventClose?(): void;
  onEventOpen?(): void;
  onFloorChanged?(): void;
  onFullscreenEnter?(): void;
  onFullscreenExit?(): void;
  onGuidingStarted?(): void;
  onGuidingStopped?(): void;
  onGuidingUpdated?(): void;
  onListClose?(): void;
  onListOpen?(): void;
  onMapClick?(data: { latitude: number; longitude: number }): void;
  onMapLongClick?(data: { latitude: number; longitude: number }): void;
  onMapMoved?(data: {
    zoom: number;
    bounds: {
      northEast: {
        latitude: number;
        longitude: number;
      };
      southWest: {
        latitude: number;
        longitude: number;
      };
    };
    latitude: number;
    longitude: number;
  }): void;
  onMultipointClose?(): void;
  onMultipointOpen?(data: { latitude: number; longitude: number }): void;
  onPermissionsDenied?(data: { permissions: string[] }): void;
  onPinpointClick?(data: { pinpoint: Pinpoint }): void;
  onPinpointClose?(): void;
  onPinpointOpen?(data: { pinpoint: Pinpoint }): void;
  onUserLocationUpdated?(data: {
    userLocation: {
      latitude: number;
      longitude: number;
      altitude: number;
      accuracy: number;
    };
  }): void;
}

type MessageResult = { type: string; data: Record<string, any> };

const capitalizeStr = function <T extends string>(str: T): Capitalize<T> {
  return (String(str).charAt(0).toUpperCase() +
    String(str).slice(1)) as Capitalize<T>;
};

export interface LivemapWebviewRef {
  aroundMe: () => void;
  openEvent: (id: number) => void;
  closeEvent: () => void;
  openPinpoint: (id: number) => void;
  closePinpoint: () => void;
  setFilters: (filters: Filters) => void;
  stopNavigation: () => void;
  enableSidebar: () => void;
  disableSidebar: () => void;
  signInByToken: (token: string) => void;
  signOut: () => void;
  setPinpoints: (pinpoints: Pinpoint[]) => void;
  setSourceLists: (lists: number[]) => void;
  drawPolyline: (
    coordinates: Coordinates[],
    options?: DrawPolylineOptions,
  ) => Promise<{
    id: string;
    geometry: {
      type: "LineString";
      coordinates: [number, number][];
    }[];
  }>;
  addMarker: (marker: Marker) => Promise<Marker & { id: string }>;
  removeMarker: (id: string) => void;
  removePolyline: (id: string) => void;
  getUserLocation: () => Promise<{
    latitude: number;
    longitude: number;
    altitude: number;
    accuracy: number;
  }>;
  navigateToPinpoint: (pinpointId: number) => void;
  setCenter: (coordinates: Coordinates) => void;
  centerTo: (coordinates: Coordinates, zoom: number) => void;
}

const LivemapWebview = forwardRef<LivemapWebviewRef, LivemapWebviewProps>(
  ({ injectedJavaScript, customConfig, ...props }, ref) => {
    const webViewRef = useRef<WebView>(null);
    const returnResultPromises = useRef<Record<string, (value: any) => void>>(
      {},
    );

    useImperativeHandle(ref, () => ({
      aroundMe: () => {
        const actionId = generateUUID();
        webViewRef.current?.injectJavaScript(
          generateMethodCalls(actionId).aroundMe(),
        );
      },
      openEvent: (id: number) => {
        const actionId = generateUUID();
        webViewRef.current?.injectJavaScript(
          generateMethodCalls(actionId).openEvent(id),
        );
      },
      closeEvent: () => {
        const actionId = generateUUID();
        webViewRef.current?.injectJavaScript(
          generateMethodCalls(actionId).closeEvent(),
        );
      },
      openPinpoint: (id: number) => {
        const actionId = generateUUID();
        webViewRef.current?.injectJavaScript(
          generateMethodCalls(actionId).openPinpoint(id),
        );
      },
      closePinpoint: () => {
        const actionId = generateUUID();
        webViewRef.current?.injectJavaScript(
          generateMethodCalls(actionId).closePinpoint(),
        );
      },
      setFilters: (filters: Filters) => {
        const actionId = generateUUID();
        webViewRef.current?.injectJavaScript(
          generateMethodCalls(actionId).setFilters(filters),
        );
      },
      stopNavigation: () => {
        const actionId = generateUUID();
        webViewRef.current?.injectJavaScript(
          generateMethodCalls(actionId).stopNavigation(),
        );
      },
      enableSidebar: () => {
        const actionId = generateUUID();
        webViewRef.current?.injectJavaScript(
          generateMethodCalls(actionId).enableSidebar(),
        );
      },
      disableSidebar: () => {
        const actionId = generateUUID();
        webViewRef.current?.injectJavaScript(
          generateMethodCalls(actionId).disableSidebar(),
        );
      },
      signInByToken: (token: string) => {
        const actionId = generateUUID();
        webViewRef.current?.injectJavaScript(
          generateMethodCalls(actionId).signInByToken(token),
        );
      },
      signOut: () => {
        const actionId = generateUUID();
        webViewRef.current?.injectJavaScript(
          generateMethodCalls(actionId).signOut(),
        );
      },
      setPinpoints: (pinpoints: Pinpoint[]) => {
        const actionId = generateUUID();
        webViewRef.current?.injectJavaScript(
          generateMethodCalls(actionId).setPinpoints(pinpoints),
        );
      },
      setSourceLists: (lists: number[]) => {
        const actionId = generateUUID();
        webViewRef.current?.injectJavaScript(
          generateMethodCalls(actionId).setSourceLists(lists),
        );
      },
      drawPolyline: (
        coordinates: Coordinates[],
        options: DrawPolylineOptions = {},
      ) => {
        const actionId = generateUUID();

        return new Promise<{
          id: string;
          geometry: {
            type: "LineString";
            coordinates: [number, number][];
          }[];
        }>((resolve) => {
          returnResultPromises.current[actionId] = resolve;

          webViewRef.current?.injectJavaScript(
            generateMethodCalls(actionId).drawPolyline(coordinates, options),
          );
        });
      },
      removePolyline: (id: string) => {
        const actionId = generateUUID();
        webViewRef.current?.injectJavaScript(
          generateMethodCalls(actionId).removePolyline(id),
        );
      },
      getUserLocation: () => {
        const actionId = generateUUID();

        return new Promise<{
          latitude: number;
          longitude: number;
          altitude: number;
          accuracy: number;
        }>((resolve) => {
          returnResultPromises.current[actionId] = resolve;

          webViewRef.current?.injectJavaScript(
            generateMethodCalls(actionId).getUserLocation(),
          );
        });
      },
      navigateToPinpoint: (pinpointId: number) => {
        const actionId = generateUUID();
        webViewRef.current?.injectJavaScript(
          generateMethodCalls(actionId).navigateToPinpoint(pinpointId),
        );
      },
      setCenter: (coordinates: Coordinates) => {
        const actionId = generateUUID();
        webViewRef.current?.injectJavaScript(
          generateMethodCalls(actionId).setCenter(coordinates),
        );
      },
      centerTo: (coordinates: Coordinates, zoom?: number) => {
        const actionId = generateUUID();
        webViewRef.current?.injectJavaScript(
          generateMethodCalls(actionId).centerTo(coordinates, zoom),
        );
      },
      addMarker: (marker: Marker) => {
        const actionId = generateUUID();

        return new Promise<Marker & { id: string }>((resolve) => {
          returnResultPromises.current[actionId] = resolve;

          webViewRef.current?.injectJavaScript(
            generateMethodCalls(actionId).addMarker(marker),
          );
        });
      },
      removeMarker: (id: string) => {
        const actionId = generateUUID();
        webViewRef.current?.injectJavaScript(
          generateMethodCalls(actionId).removeMarker(id),
        );
      },
    }));

    const handleMessage = (event: WebViewMessageEvent) => {
      const messageData: MessageResult = JSON.parse(event.nativeEvent.data);
      if (!messageData || !messageData.type) {
        return;
      }

      switch (messageData.type) {
        case "arEnabled":
        case "arDisabled":
        case "contentUpdated":
        case "pinpointClick":
        case "floorChanged":
        case "permissionsDenied":
        case "deviceAttitudeUpdated":
        case "userLocationUpdated":
        case "actionButtonClick":
        case "pinpointOpen":
        case "pinpointClose":
        case "eventOpen":
        case "eventClose":
        case "multipointOpen":
        case "multipointClose":
        case "listOpen":
        case "listClose":
        case "mapMoved":
        case "mapClick":
        case "mapLongClick":
        case "guidingStarted":
        case "guidingUpdated":
        case "guidingStopped":
        case "fullscreenEnter":
        case "fullscreenExit": {
          const methodName = capitalizeStr(messageData.type);

          if (`on${methodName}` in props) {
            props[`on${methodName}`]!(messageData.data as any);
          }
          break;
        }
        case "methodResult":
          if (returnResultPromises.current[messageData.data.id]) {
            returnResultPromises.current[messageData.data.id](
              messageData.data.result,
            );
          }
          break;
        case "debug":
          console.log(messageData.data);
          break;
        default:
      }
    };

    return (
      <WebView
        {...props}
        originWhitelist={["*"]}
        geolocationEnabled
        source={{
          uri: `https://livemap.getwemap.com/dom?emmid=${props.emmid}&clicktofullscreen=false`,
        }}
        style={{ flex: 1 }}
        ref={webViewRef}
        onMessage={handleMessage}
        injectedJavaScript={createInjectedMethods()}
        allowFileAccess={customConfig?.allowFileAccess}
        cacheEnabled={customConfig?.cacheEnabled}
      />
    );
  },
);

export default LivemapWebview;
