import { Coordinates, DrawPolylineOptions, Filters, Marker, Pinpoint } from "./types/";

type Command = {
  method: string;
  id: string;
  params: any[];
};

export const createInjectedMethods = () => `
  (function() {
    // Initialize communication bridge
    window.ReactNativeWebView.wemapBridge = {
      ready: false,
      queue: [],
      execute: function(command) {
        if (this.ready) {
          livemap[command.method](...command.params).then((result) => {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'methodResult',
              data: {
                id: command.id,
                method: command.method,
                result: result
              }
            }));
          });
        } else {
          this.queue.push(command);
        }
      }
    };

    livemap.waitForReady().then(() => {
      window.ReactNativeWebView.wemapBridge.ready = true;
      window.ReactNativeWebView.wemapBridge.queue.forEach(function(command) {
        livemap[command.method](...command.params).then((result) => {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'methodResult',
            data: {
              id: command.id,
              method: command.method,
              result: result
            }
          }));
        });
      });
      window.ReactNativeWebView.wemapBridge.queue = [];

      // Notify React Native
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'mapReady'
      }));
    });

    const eventsName = [
      'arEnabled',
      'arDisabled',
      'contentUpdated',
      'pinpointClick',
      'floorChanged',
      'permissionsDenied',
      'deviceAttitudeUpdated',
      'userLocationUpdated',
      'actionButtonClick',
      'pinpointOpen',
      'pinpointClose',
      'eventOpen',
      'eventClose',
      'multipointOpen',
      'multipointClose',
      'listOpen',
      'listClose',
      'mapMoved',
      'mapClick',
      'mapLongClick',
      'guidingStarted',
      'guidingUpdated',
      'guidingStopped',
      'fullscreenEnter',
      'fullscreenExit'
    ];

    for (const eventName of eventsName) {
      livemap.addEventListener(eventName, (data) => {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: eventName,
          data
        }));
      });
    }

  })();
  true;
`;

const sendToWemapBridge = (command: Command) => {
  return `window.ReactNativeWebView.wemapBridge.execute(${JSON.stringify(command)}); true;`;
};

export const generateMethodCalls = function (actionId: string) {
  return {
    centerTo: (coordinates: Coordinates, zoom?: number) => {
      const command = {
        id: actionId,
        method: "centerTo",
        params: [
          {
            lat: coordinates.latitude,
            lng: coordinates.longitude,
          },
          zoom,
        ],
      };
      return sendToWemapBridge(command);
    },
    aroundMe: () => {
      const command = {
        id: actionId,
        method: "aroundMe",
        params: [],
      };
      return sendToWemapBridge(command);
    },
    openEvent: (id: number) => {
      const command = {
        id: actionId,
        method: "openEvent",
        params: [id],
      };
      return sendToWemapBridge(command);
    },
    closeEvent: () => {
      const command = {
        id: actionId,
        method: "closeEvent",
        params: [],
      };
      return sendToWemapBridge(command);
    },
    openPinpoint: (id: number) => {
      const command = {
        id: actionId,
        method: "openPinpoint",
        params: [id],
      };
      return sendToWemapBridge(command);
    },
    closePinpoint: () => {
      const command = {
        id: actionId,
        method: "closePinpoint",
        params: [],
      };
      return sendToWemapBridge(command);
    },
    setFilters: (filters: Filters) => {
      const command = {
        id: actionId,
        method: "setFilters",
        params: [filters],
      };
      return sendToWemapBridge(command);
    },
    stopNavigation: () => {
      const command = {
        id: actionId,
        method: "stopNavigation",
        params: [],
      };
      return sendToWemapBridge(command);
    },
    enableSidebar: () => {
      const command = {
        id: actionId,
        method: "enableSidebar",
        params: [],
      };
      return sendToWemapBridge(command);
    },
    disableSidebar: () => {
      const command = {
        id: actionId,
        method: "disableSidebar",
        params: [],
      };
      return sendToWemapBridge(command);
    },
    signInByToken: (token: string) => {
      const command = {
        id: actionId,
        method: "signInByToken",
        params: [token],
      };
      return sendToWemapBridge(command);
    },
    signOut: () => {
      const command = {
        id: actionId,
        method: "signOut",
        params: [],
      };
      return sendToWemapBridge(command);
    },
    setPinpoints: (pinpoints: Pinpoint[]) => {
      const command = {
        id: actionId,
        method: "setPinpoints",
        params: [pinpoints],
      };
      return sendToWemapBridge(command);
    },
    setSourceLists: (lists: number[]) => {
      const command = {
        id: actionId,
        method: "setSourceLists",
        params: [lists],
      };
      return sendToWemapBridge(command);
    },
    drawPolyline: (
      coordinates: Coordinates[],
      options: DrawPolylineOptions,
    ) => {
      const command = {
        id: actionId,
        method: "drawPolyline",
        params: [coordinates, options],
      };
      return sendToWemapBridge(command);
    },
    removePolyline: (id: string) => {
      const command = {
        id: actionId,
        method: "removePolyline",
        params: [id],
      };
      return sendToWemapBridge(command);
    },
    getUserLocation: () => {
      const command = {
        id: actionId,
        method: "getUserLocation",
        params: [],
      };

      return sendToWemapBridge(command);
    },
    navigateToPinpoint: (id: number) => {
      const command = {
        id: actionId,
        method: "navigateToPinpoint",
        params: [id],
      };
      return sendToWemapBridge(command);
    },
    setCenter: (coordinates: Coordinates) => {
      const command = {
        id: actionId,
        method: "setCenter",
        params: [
          {
            lat: coordinates.latitude,
            lng: coordinates.longitude,
          },
        ],
      };
      return sendToWemapBridge(command);
    },
    addMarker: (marker: Marker) => {
      const command = {
        id: actionId,
        method: "addMarker",
        params: [marker],
      };
      return sendToWemapBridge(command);
    },
    removeMarker: (id: string) => {
      const command = {
        id: actionId,
        method: "removeMarker",
        params: [id],
      };
      return sendToWemapBridge(command);
    },
  };
};
