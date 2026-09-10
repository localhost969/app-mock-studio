export type DeviceKey = "iphone" | "android";

export type DevicePlatform = "ios" | "android";

export type DeviceSpec = {
  key: DeviceKey;
  label: string;
  platform: DevicePlatform;
  viewport: {
    width: number;
    height: number;
  };
  diagonal: string;
  note: string;
  finish: string;
};

export type ScreenItem = {
  id: string;
  src: string;
  name: string;
  type: string;
  size: number;
};

export type DevicePlacement = {
  frameZoom: number;
  framePan: {
    x: number;
    y: number;
  };
  imageZoom: number;
  imageOffset: {
    x: number;
    y: number;
  };
};
