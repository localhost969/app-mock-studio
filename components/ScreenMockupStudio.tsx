import * as React from "react";
import { ConfigurationPanel } from "./ScreenMockupStudio/ConfigurationPanel";
import { PreviewArea } from "./ScreenMockupStudio/PreviewArea";
import type { DeviceKey, DevicePlacement, DeviceSpec, ScreenItem } from "./ScreenMockupStudio/types";
import { SAMPLE_PRESETS } from "./ScreenMockupStudio/sampleScreens";

export const DEVICE_SPECS: DeviceSpec[] = [
  {
    key: "iphone",
    label: "iPhone 15 Pro",
    platform: "ios",
    viewport: { width: 393, height: 852 },
    diagonal: "6.1 in",
    note: "Super Retina XDR",
    finish: "Natural Titanium",
  },
  {
    key: "android",
    label: "Galaxy S24 Ultra",
    platform: "android",
    viewport: { width: 384, height: 832 },
    diagonal: "6.8 in",
    note: "Dynamic AMOLED 2X",
    finish: "Titanium Gray",
  },
];

const DEFAULT_PLACEMENT: DevicePlacement = {
  frameZoom: 1,
  framePan: { x: 0, y: 0 },
  imageZoom: 1,
  imageOffset: { x: 0, y: 0 },
};

function createPlacements(): Record<DeviceKey, DevicePlacement> {
  return DEVICE_SPECS.reduce((placements, device) => {
    placements[device.key] = {
      frameZoom: DEFAULT_PLACEMENT.frameZoom,
      framePan: { ...DEFAULT_PLACEMENT.framePan },
      imageZoom: DEFAULT_PLACEMENT.imageZoom,
      imageOffset: { ...DEFAULT_PLACEMENT.imageOffset },
    };
    return placements;
  }, {} as Record<DeviceKey, DevicePlacement>);
}

function makeId() {
  if (globalThis.crypto && "randomUUID" in globalThis.crypto) {
    return (globalThis.crypto as Crypto).randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function ScreenMockupStudio() {
  const [currentScreen, setCurrentScreen] = React.useState<ScreenItem | null>(null);
  const [bgColor, setBgColor] = React.useState("#f8f8f8");
  const [placements, setPlacements] = React.useState<Record<DeviceKey, DevicePlacement>>(() =>
    createPlacements()
  );
  const currentObjectUrl = React.useRef<string | null>(null);

  const addFiles = React.useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;

    const image = Array.from(files).find((file) => file.type.startsWith("image/"));
    if (!image) return;
    if (currentObjectUrl.current) {
      URL.revokeObjectURL(currentObjectUrl.current);
    }
    const src = URL.createObjectURL(image);
    currentObjectUrl.current = src;
    setCurrentScreen({
      id: makeId(),
      src,
      name: image.name || "Uploaded screen",
      type: image.type,
      size: image.size,
    });
    setPlacements(createPlacements());
  }, []);

  const loadSample = React.useCallback(() => {
    if (currentObjectUrl.current) {
      URL.revokeObjectURL(currentObjectUrl.current);
      currentObjectUrl.current = null;
    }
    const sample = SAMPLE_PRESETS[0];
    setCurrentScreen({
      id: makeId(),
      src: sample.src,
      name: "Sample App UI",
      type: "image/svg+xml",
      size: 38000,
    });
    setPlacements(createPlacements());
  }, []);

  React.useEffect(() => {
    return () => {
      if (currentObjectUrl.current) URL.revokeObjectURL(currentObjectUrl.current);
    };
  }, []);

  const removeScreen = React.useCallback(() => {
    if (currentObjectUrl.current) {
      URL.revokeObjectURL(currentObjectUrl.current);
      currentObjectUrl.current = null;
    }
    setCurrentScreen(null);
    setPlacements(createPlacements());
  }, []);

  const updatePlacement = React.useCallback(
    (deviceKey: DeviceKey, nextPlacement: DevicePlacement) => {
      setPlacements((current) => ({
        ...current,
        [deviceKey]: nextPlacement,
      }));
    },
    []
  );

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <div className="mx-auto w-full max-w-[1720px] px-4 py-4 sm:px-6 sm:py-5">
        {/* Minimal Clean Header */}
        <header className="mb-4 sm:mb-5">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            App Mockup Studio
          </h1>
          <p className="text-xs sm:text-sm text-foreground/60">
            Create device mockups for your app screenshots
          </p>
        </header>

        {/* Studio Workspace Layout - Optimized for all desktop screens */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5 items-start">
          <ConfigurationPanel
            bgColor={bgColor}
            setBgColor={setBgColor}
            addFiles={addFiles}
            hasImage={currentScreen !== null}
            screen={currentScreen}
            removeScreen={removeScreen}
            onLoadSample={loadSample}
          />

          <PreviewArea
            screen={currentScreen}
            bgColor={bgColor}
            devices={DEVICE_SPECS}
            placements={placements}
            updatePlacement={updatePlacement}
            addFiles={addFiles}
          />
        </div>
      </div>
    </div>
  );
}
