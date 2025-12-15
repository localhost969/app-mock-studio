export type LayoutDirection = "row" | "column";

export type DeviceKey = "iphone" | "pixel";
export type TextAlign = "left" | "center" | "right";
export type FontFamily = "sans" | "serif" | "mono";

export type TextOverlay = {
  id: string;
  text: string;
  /** Position within the device screen in percentages (0..100). */
  xPct: number;
  yPct: number;
  fontFamily: FontFamily;
  fontSize: number;
  fontWeight: 400 | 500 | 600 | 700;
  italic: boolean;
  underline: boolean;
  align: TextAlign;
  color: string;
};

export type ScreenItem = {
  id: string;
  src: string;
  name: string;
  overlays: Record<DeviceKey, TextOverlay[]>;
};
