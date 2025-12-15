import * as React from "react";
import {
  IPhone15ProFrame,
  Pixel8Frame,
  MinimalFrame,
} from "./frames";

export type DeviceType = "iphone-15-pro" | "pixel-8" | "minimal";

interface DeviceFrameProps {
  type: DeviceType;
  children: React.ReactNode;
  className?: string;
}

export function DeviceFrame({ type, children, className = "" }: DeviceFrameProps) {
  switch (type) {
    case "iphone-15-pro":
      return <IPhone15ProFrame className={className}>{children}</IPhone15ProFrame>;
    case "pixel-8":
      return <Pixel8Frame className={className}>{children}</Pixel8Frame>;
    case "minimal":
      return <MinimalFrame className={className}>{children}</MinimalFrame>;
    default:
      return <MinimalFrame className={className}>{children}</MinimalFrame>;
  }
}
