/// <reference types="react" />
import type { WebViewProps } from "react-native-webview";

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
  ) => void;
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
declare const LivemapWebview: import("react").ForwardRefExoticComponent<
  LivemapWebviewProps & import("react").RefAttributes<LivemapWebviewRef>
>;
export default LivemapWebview;

export type Coordinates = {
  latitude: number;
  longitude: number;
};
export type Filters = {
  query?: string;
  endDate?: string;
  startDare?: string;
  tags?: string[];
};
export type Pinpoint = {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  address?: string;
  altitude?: number | null;
  description?: string;
  image_url?: string;
  link_url?: string | null;
  media_url?: string | null;
  media_type?: "image" | "video" | null;
  tags?: string[];
  external_data?: Record<string, any>;
};
export type DrawPolylineOptions = {
  color?: string;
  opacity?: number;
  useNetwork?: boolean;
  width?: number;
};
