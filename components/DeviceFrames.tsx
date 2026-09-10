import * as React from "react";
import type { DeviceSpec } from "./ScreenMockupStudio/types";

interface DeviceFrameProps {
  device: DeviceSpec;
  children: React.ReactNode;
  className?: string;
}

export function DeviceFrame({ device, children, className = "" }: DeviceFrameProps) {
  const isIPhone = device.key === "iphone";

  if (isIPhone) {
    // iPhone 15 Pro - Hyper-Realistic Natural Titanium
    const width = 250;
    const height = 542; // 393:852
    const outerRadius = 46;
    const screenRadius = 38;

    return (
      <div
        className={`relative select-none flex-none ${className}`.trim()}
        style={{ width, height }}
      >
        {/* Deep ambient ground contact shadow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: outerRadius,
            boxShadow:
              "0 32px 64px -16px rgba(0, 0, 0, 0.45), 0 16px 32px -8px rgba(0, 0, 0, 0.3), 0 2px 6px rgba(0, 0, 0, 0.2)",
          }}
        />

        {/* Outer Natural Titanium Chassis */}
        <div
          className="absolute inset-0"
          style={{
            borderRadius: outerRadius,
            background:
              "linear-gradient(145deg, #222327 0%, #575962 28%, #2d2e33 55%, #636570 82%, #26272b 100%)",
          }}
        />

        {/* Outer Precision Specular Chamfer Highlight */}
        <div
          className="absolute pointer-events-none"
          style={{
            inset: 1,
            borderRadius: outerRadius - 1,
            border: "1px solid rgba(255, 255, 255, 0.25)",
            boxShadow:
              "inset 0 1px 2px rgba(255, 255, 255, 0.4), inset 0 -1px 2px rgba(0, 0, 0, 0.7)",
          }}
        />

        {/* Antenna Bands (Top Left, Top Right, Bottom Left, Bottom Right) */}
        <div className="absolute -top-[1px] left-[42px] w-[2px] h-[3px] bg-[#1a1b1e]/90 z-20" />
        <div className="absolute -top-[1px] right-[42px] w-[2px] h-[3px] bg-[#1a1b1e]/90 z-20" />
        <div className="absolute -bottom-[1px] left-[42px] w-[2px] h-[3px] bg-[#1a1b1e]/90 z-20" />
        <div className="absolute -bottom-[1px] right-[42px] w-[2px] h-[3px] bg-[#1a1b1e]/90 z-20" />

        {/* Inner Dark Bezel Rim */}
        <div
          className="absolute bg-[#08080a]"
          style={{
            inset: 4.5,
            borderRadius: screenRadius + 2,
            boxShadow: "inset 0 0 4px rgba(0, 0, 0, 0.8)",
          }}
        />

        {/* Screen Viewport */}
        <div
          className="absolute z-10 overflow-hidden bg-black"
          style={{
            inset: 6.5,
            borderRadius: screenRadius,
          }}
        >
          <div className="relative h-full w-full overflow-hidden bg-[#090a0d]">
            {children}

            {/* Realistic Diagonal Glass Sheen Reflection */}
            <div
              className="pointer-events-none absolute inset-0 z-30 opacity-45"
              style={{
                background:
                  "linear-gradient(130deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 28%, transparent 35%)",
              }}
            />

          </div>
        </div>

        {/* Dynamic Island with Dual Sensors & AR Lens Coating */}
        <div
          className="absolute left-1/2 z-30 -translate-x-1/2 rounded-full bg-black shadow-[0_2px_6px_rgba(0,0,0,0.85)] ring-1 ring-white/[0.08] flex items-center justify-between px-2.5"
          style={{
            top: 12,
            width: 82,
            height: 22,
          }}
        >
          {/* FaceID Flood Illuminator / Sensor */}
          <span className="h-2 w-2 rounded-full bg-[#0a0c10] border border-[#171922] opacity-70" />
          {/* Front Camera Lens with blue AR coating sheen */}
          <span className="relative flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[#07090e] border border-[#1a1f2e] shadow-[inset_0_0_2px_rgba(59,130,246,0.7)]">
            <span className="h-1 w-1 rounded-full bg-[#030408]" />
          </span>
        </div>

        {/* Precision Top Speaker Ear Receiver Slit */}
        <div className="absolute top-[2.5px] left-1/2 -translate-x-1/2 z-30 h-[2px] w-12 rounded-full bg-black/95 shadow-inner" />

        {/* Hardware Physical Buttons */}
        {/* Action Button */}
        <div
          className="absolute left-[-2.5px] top-[76px] z-0 h-[22px] w-[3px] rounded-l-sm bg-[#42444a]"
          style={{ boxShadow: "inset 0 1px 1px rgba(255,255,255,0.3)" }}
        />
        {/* Volume Up */}
        <div
          className="absolute left-[-2.5px] top-[110px] z-0 h-[44px] w-[3px] rounded-l-sm bg-[#42444a]"
          style={{ boxShadow: "inset 0 1px 1px rgba(255,255,255,0.3)" }}
        />
        {/* Volume Down */}
        <div
          className="absolute left-[-2.5px] top-[164px] z-0 h-[44px] w-[3px] rounded-l-sm bg-[#42444a]"
          style={{ boxShadow: "inset 0 1px 1px rgba(255,255,255,0.3)" }}
        />
        {/* Power / Side Button */}
        <div
          className="absolute right-[-2.5px] top-[126px] z-0 h-[60px] w-[3px] rounded-r-sm bg-[#42444a]"
          style={{ boxShadow: "inset 0 1px 1px rgba(255,255,255,0.3)" }}
        />

        {/* Outer Specular Edge Glow */}
        <div
          className="pointer-events-none absolute inset-0 z-40"
          style={{
            borderRadius: outerRadius,
            boxShadow:
              "inset 0 0 10px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.12)",
          }}
        />
      </div>
    );
  }

  // Samsung Galaxy S24 Ultra - Iconic Boxy Frame with Titanium Gray Edge
  const width = 250;
  const height = 542; // Matching height for perfect side-by-side symmetry
  const outerRadius = 18; // Distinctive sharp corners of S24 Ultra
  const screenRadius = 13;

  return (
    <div
      className={`relative select-none flex-none ${className}`.trim()}
      style={{ width, height }}
    >
      {/* Deep ambient ground contact shadow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: outerRadius,
          boxShadow:
            "0 32px 64px -16px rgba(0, 0, 0, 0.45), 0 16px 32px -8px rgba(0, 0, 0, 0.3), 0 2px 6px rgba(0, 0, 0, 0.2)",
        }}
      />

      {/* Samsung Titanium Gray Armor Chassis */}
      <div
        className="absolute inset-0"
        style={{
          borderRadius: outerRadius,
          background:
            "linear-gradient(135deg, #1c1d21 0%, #4b4e57 32%, #25272c 58%, #5a5d66 85%, #1e1f23 100%)",
        }}
      />

      {/* Precision Metallic Chamfer Edge */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: 1,
          borderRadius: outerRadius - 1,
          border: "1px solid rgba(255, 255, 255, 0.22)",
          boxShadow:
            "inset 0 1px 2px rgba(255, 255, 255, 0.35), inset 0 -1px 2px rgba(0, 0, 0, 0.7)",
        }}
      />

      {/* S24 Ultra Antenna Bands */}
      <div className="absolute top-[28px] -left-[1px] w-[3px] h-[2px] bg-[#16171a]/90 z-20" />
      <div className="absolute top-[28px] -right-[1px] w-[3px] h-[2px] bg-[#16171a]/90 z-20" />
      <div className="absolute bottom-[28px] -left-[1px] w-[3px] h-[2px] bg-[#16171a]/90 z-20" />
      <div className="absolute bottom-[28px] -right-[1px] w-[3px] h-[2px] bg-[#16171a]/90 z-20" />

      {/* Razor-thin Bezel Band */}
      <div
        className="absolute bg-[#08080a]"
        style={{
          inset: 4,
          borderRadius: screenRadius + 1.5,
          boxShadow: "inset 0 0 3px rgba(0, 0, 0, 0.8)",
        }}
      />

      {/* Screen Viewport */}
      <div
        className="absolute z-10 overflow-hidden bg-black"
        style={{
          inset: 5.5,
          borderRadius: screenRadius,
        }}
      >
        <div className="relative h-full w-full overflow-hidden bg-[#090a0d]">
          {children}

          {/* Subtle Diagonal Glass Sheen */}
          <div
            className="pointer-events-none absolute inset-0 z-30 opacity-45"
            style={{
              background:
                "linear-gradient(130deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 28%, transparent 35%)",
            }}
          />

        </div>
      </div>

      {/* Centered Infinity-O Front Camera with Precision Glass Ring */}
      <div
        className="absolute left-1/2 z-30 -translate-x-1/2 rounded-full bg-black shadow-[0_0_0_1.5px_rgba(255,255,255,0.15)] flex items-center justify-center"
        style={{
          top: 11,
          width: 12,
          height: 12,
        }}
      >
        {/* Anti-reflective sapphire lens glint */}
        <span className="relative flex h-2 w-2 items-center justify-center rounded-full bg-[#080b12] border border-[#1c2233] shadow-[inset_0_0_2px_rgba(59,130,246,0.8)]">
          <span className="h-0.5 w-0.5 rounded-full bg-[#020305]" />
        </span>
      </div>

      {/* Top Speaker Micro-Slit */}
      <div className="absolute top-[2px] left-1/2 -translate-x-1/2 z-30 h-[1.5px] w-10 rounded-full bg-black/90" />

      {/* Right Side Hardware Buttons: Power and Volume Rocker */}
      <div
        className="absolute right-[-2.5px] top-[96px] z-0 h-[34px] w-[3px] rounded-r-sm bg-[#3c3e44]"
        style={{ boxShadow: "inset 0 1px 1px rgba(255,255,255,0.25)" }}
      />
      <div
        className="absolute right-[-2.5px] top-[144px] z-0 h-[62px] w-[3px] rounded-r-sm bg-[#3c3e44]"
        style={{ boxShadow: "inset 0 1px 1px rgba(255,255,255,0.25)" }}
      />

      {/* Outer Metallic Specular Edge */}
      <div
        className="pointer-events-none absolute inset-0 z-40"
        style={{
          borderRadius: outerRadius,
          boxShadow:
            "inset 0 0 10px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.12)",
        }}
      />
    </div>
  );
}
