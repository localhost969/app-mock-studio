import * as React from "react";
import { ConfigurationPanel } from "./ScreenMockupStudio/ConfigurationPanel";
import { PreviewArea } from "./ScreenMockupStudio/PreviewArea";
import type { DeviceKey, ScreenItem } from "./ScreenMockupStudio/types";

function makeId() {
  if (globalThis.crypto && "randomUUID" in globalThis.crypto) {
    return (globalThis.crypto as Crypto).randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function ScreenMockupStudio() {
  const [currentScreen, setCurrentScreen] = React.useState<ScreenItem | null>(null);
  const [bgColor, setBgColor] = React.useState("#f8f8f8");

  // iPhone state
  const [iPhoneZoom, setIPhoneZoom] = React.useState(0.75);
  const [iPhonePan, setIPhonePan] = React.useState({ x: 0, y: 0 });
  const [iPhoneIsDragging, setIPhoneIsDragging] = React.useState(false);
  const [iPhoneDragStart, setIPhoneDragStart] = React.useState({ x: 0, y: 0 });
  const [iPhoneImageOffset, setIPhoneImageOffset] = React.useState({ x: 0, y: 0 });
  const [iPhoneIsImageDragging, setIPhoneIsImageDragging] = React.useState(false);
  const [iPhoneImageDragStart, setIPhoneImageDragStart] = React.useState({ x: 0, y: 0 });

  // Pixel state
  const [pixelZoom, setPixelZoom] = React.useState(0.75);
  const [pixelPan, setPixelPan] = React.useState({ x: 0, y: 0 });
  const [pixelIsDragging, setPixelIsDragging] = React.useState(false);
  const [pixelDragStart, setPixelDragStart] = React.useState({ x: 0, y: 0 });
  const [pixelImageOffset, setPixelImageOffset] = React.useState({ x: 0, y: 0 });
  const [pixelIsImageDragging, setPixelIsImageDragging] = React.useState(false);
  const [pixelImageDragStart, setPixelImageDragStart] = React.useState({ x: 0, y: 0 });

  const addFiles = React.useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;

    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      setCurrentScreen({
        id: makeId(),
        src: URL.createObjectURL(file),
        name: file.name,
        overlays: { iphone: [], pixel: [] },
      });
      break; // Only use the first image
    }
  }, []);

  React.useEffect(() => {
    return () => {
      if (currentScreen) URL.revokeObjectURL(currentScreen.src);
    };
  }, [currentScreen]);



  const removeScreen = React.useCallback(() => {
    if (currentScreen) URL.revokeObjectURL(currentScreen.src);
    setCurrentScreen(null);
    setIPhoneZoom(1);
    setIPhonePan({ x: 0, y: 0 });
    setIPhoneImageOffset({ x: 0, y: 0 });
    setPixelZoom(1);
    setPixelPan({ x: 0, y: 0 });
    setPixelImageOffset({ x: 0, y: 0 });
  }, [currentScreen]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <div className="mx-auto w-full max-w-[1600px] px-3 py-4 sm:px-6">
        <header className="flex flex-col gap-1 mb-4">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            App Mockup Studio
          </h1>
          <p className="text-sm text-foreground/60">
            Create device mockups for your app easily.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4">
          <ConfigurationPanel
            bgColor={bgColor}
            setBgColor={setBgColor}
            addFiles={addFiles}
            hasImage={currentScreen !== null}
          />

          <PreviewArea
            screen={currentScreen}
            removeScreen={removeScreen}
            bgColor={bgColor}
            iPhoneZoom={iPhoneZoom}
            setIPhoneZoom={setIPhoneZoom}
            iPhonePan={iPhonePan}
            setIPhonePan={setIPhonePan}
            iPhoneIsDragging={iPhoneIsDragging}
            setIPhoneIsDragging={setIPhoneIsDragging}
            iPhoneDragStart={iPhoneDragStart}
            setIPhoneDragStart={setIPhoneDragStart}
            iPhoneImageOffset={iPhoneImageOffset}
            setIPhoneImageOffset={setIPhoneImageOffset}
            iPhoneIsImageDragging={iPhoneIsImageDragging}
            setIPhoneIsImageDragging={setIPhoneIsImageDragging}
            iPhoneImageDragStart={iPhoneImageDragStart}
            setIPhoneImageDragStart={setIPhoneImageDragStart}
            pixelZoom={pixelZoom}
            setPixelZoom={setPixelZoom}
            pixelPan={pixelPan}
            setPixelPan={setPixelPan}
            pixelIsDragging={pixelIsDragging}
            setPixelIsDragging={setPixelIsDragging}
            pixelDragStart={pixelDragStart}
            setPixelDragStart={setPixelDragStart}
            pixelImageOffset={pixelImageOffset}
            setPixelImageOffset={setPixelImageOffset}
            pixelIsImageDragging={pixelIsImageDragging}
            setPixelIsImageDragging={setPixelIsImageDragging}
            pixelImageDragStart={pixelImageDragStart}
            setPixelImageDragStart={setPixelImageDragStart}
          />
        </div>
      </div>
    </div>
  );
}
