import * as React from "react";

export function IPhone15ProFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative mx-auto w-[220px] aspect-[393/852] ${className ?? ""}`.trim()}>

      {/* Frame Background */}
      <div className="absolute inset-0 bg-black rounded-[40px]" />

      {/* Frame Border (Titanium look) */}
      <div className="absolute inset-0 rounded-[40px] border-[3px] border-gray-800 shadow-lg" />

      {/* Inner Bezel */}
      <div
        className="absolute bg-black rounded-[34px]"
        style={{
          left: "7px",
          top: "7px",
          right: "7px",
          bottom: "7px",
        }}
      />

      {/* Screen Content */}
      <div
        className="absolute z-10 overflow-hidden"
        style={{
          left: "9px",
          top: "9px",
          right: "9px",
          bottom: "9px",
          borderRadius: "32px",
        }}
      >
        <div className="relative w-full h-full bg-white dark:bg-black flex flex-col">
          {children}
        </div>
      </div>

      {/* Dynamic Island */}
      <div
        className="absolute z-20"
        style={{
          left: "50%",
          transform: "translateX(-50%)",
          top: "13px",
          width: "80px",
          height: "20px",
        }}
      >
        <div className="w-full h-full bg-black rounded-full relative overflow-hidden shadow-md">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black rounded-full" />
          <div className="absolute inset-0 rounded-full border border-gray-800" />
        </div>
      </div>

      {/* Glossy Overlay / Reflection */}
      <div className="absolute inset-0 z-30 pointer-events-none rounded-[40px] shadow-[inset_0_0_8px_rgba(255,255,255,0.1)]" />

      {/* Side Buttons - Front Layer */}
      <div className="absolute top-[77px] -left-[2px] w-[2px] h-[19px] bg-gray-600 rounded-l-sm z-20" /> {/* Action */}
      <div className="absolute top-[110px] -left-[2px] w-[2px] h-[37px] bg-gray-600 rounded-l-sm z-20" /> {/* Vol Up */}
      <div className="absolute top-[158px] -left-[2px] w-[2px] h-[37px] bg-gray-600 rounded-l-sm z-20" /> {/* Vol Down */}
      <div className="absolute top-[132px] -right-[2px] w-[2px] h-[59px] bg-gray-600 rounded-r-sm z-20" /> {/* Power */}
    </div>
  );
}

