import * as React from "react";
import { DeviceFrame } from "@/components/DeviceFrames";
import type { DeviceKey, ScreenItem } from "./types";
import { downloadDeviceFrame } from "./useDownloadFrame";

interface DeviceViewProps {
  screen: ScreenItem | null;
  deviceKey: DeviceKey;
  deviceType: "iphone-15-pro" | "pixel-8";
  deviceLabel: string;
  zoom: number;
  setZoom: (z: number) => void;
  pan: { x: number; y: number };
  setPan: (p: { x: number; y: number }) => void;
  isDragging: boolean;
  setIsDragging: (d: boolean) => void;
  dragStart: { x: number; y: number };
  setDragStart: (d: { x: number; y: number }) => void;
  bgColor: string;
  removeScreen: () => void;
  imageOffset: { x: number; y: number };
  setImageOffset: (offset: { x: number; y: number }) => void;
  isImageDragging: boolean;
  setIsImageDragging: (d: boolean) => void;
  imageDragStart: { x: number; y: number };
  setImageDragStart: (d: { x: number; y: number }) => void;
  onDownload?: (element: HTMLElement, label: string) => Promise<void>;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function DeviceView({
  screen,
  deviceKey,
  deviceType,
  deviceLabel,
  zoom,
  setZoom,
  pan,
  setPan,
  isDragging,
  setIsDragging,
  dragStart,
  setDragStart,
  bgColor,
  removeScreen,
  imageOffset,
  setImageOffset,
  isImageDragging,
  setIsImageDragging,
  imageDragStart,
  setImageDragStart,
  onDownload,
}: DeviceViewProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const screenRef = React.useRef<HTMLDivElement>(null);
  const imageRef = React.useRef<HTMLImageElement>(null);
  const frameContainerRef = React.useRef<HTMLDivElement>(null);

  const zoomIn = () => setZoom(clamp(zoom * 1.1, 0.5, 3));
  const zoomOut = () => setZoom(clamp(zoom * 0.9, 0.5, 3));
  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!screen) return;
    if (e.button !== 0) return;
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!screen) return;
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    setIsImageDragging(false);
  };

  const handleImagePointerDown = (e: React.PointerEvent<HTMLImageElement>) => {
    if (!screen) return;
    if (e.button !== 0) return;
    e.stopPropagation();
    (e.currentTarget as HTMLImageElement).setPointerCapture(e.pointerId);
    setIsImageDragging(true);
    setImageDragStart({ x: e.clientX - imageOffset.x, y: e.clientY - imageOffset.y });
  };

  const handleImagePointerMove = (e: React.PointerEvent<HTMLImageElement>) => {
    if (!screen || !isImageDragging) return;
    e.stopPropagation();
    setImageOffset({
      x: e.clientX - imageDragStart.x,
      y: e.clientY - imageDragStart.y,
    });
  };

  const handleImagePointerUp = (e: React.PointerEvent<HTMLImageElement>) => {
    e.stopPropagation();
    setIsImageDragging(false);
  };

  return (
    <div className="flex flex-col flex-1 gap-2">
      <div className="rounded-xl border border-border overflow-hidden bg-card shadow-sm flex-1 flex flex-col relative">
        <div className="absolute top-2 right-2 z-20 bg-background/80 backdrop-blur px-1.5 py-0.5 rounded-md text-[10px] font-medium text-foreground/60 border border-border flex items-center gap-1.5">
          <span className="pointer-events-none">{deviceLabel}</span>
          {screen && (
            <div className="flex items-center gap-0.5">
              <button
                onClick={zoomOut}
                className="px-1.5 py-0.5 rounded border border-border text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors text-xs"
                title="Zoom out"
                type="button"
              >
                −
              </button>
              <button
                onClick={zoomIn}
                className="px-1.5 py-0.5 rounded border border-border text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors text-xs"
                title="Zoom in"
                type="button"
              >
                +
              </button>
              <button
                onClick={resetView}
                className="px-1.5 py-0.5 rounded border border-border text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors text-xs"
                title="Reset zoom and pan"
                type="button"
              >
                ↺
              </button>
              <button
                onClick={removeScreen}
                className="ml-0.5 px-1.5 py-0.5 rounded border border-border text-red-500 hover:bg-red-500/10 transition-colors text-xs"
                title="Remove image"
                type="button"
              >
                ✕
              </button>
              {onDownload && (
                <button
                  onClick={() => onDownload(frameContainerRef.current!, deviceLabel)}
                  className="px-2 py-0.5 rounded border border-border text-green-500 hover:bg-green-500/10 transition-colors text-xs font-medium"
                  title="Download frame"
                  type="button"
                >
                  Download
                </button>
              )}
            </div>
          )}
        </div>

        <div
          ref={containerRef}
          className="flex-1 relative overflow-hidden cursor-grab active:cursor-grabbing p-6"
          style={{ backgroundColor: bgColor, touchAction: "none" }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          <div
            ref={frameContainerRef}
            className="relative flex items-center justify-center"
            style={{
              width: "fit-content",
              height: "fit-content",
              margin: "auto",
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: "center center",
              transition: isDragging ? "none" : "transform 0.2s ease-out",
            }}
          >
            <DeviceFrame type={deviceType} className="flex-shrink-0">
              <div ref={screenRef} className="relative w-full h-full select-none overflow-hidden bg-white dark:bg-black">
                <img
                  ref={imageRef}
                  src={screen!.src}
                  alt={screen!.name}
                  className="w-full h-full object-cover cursor-grab active:cursor-grabbing"
                  draggable={false}
                  style={{
                    display: "block",
                    transform: `translate(${imageOffset.x}px, ${imageOffset.y}px)`,
                    transition: isImageDragging ? "none" : "transform 0.2s ease-out",
                  }}
                  onPointerDown={handleImagePointerDown}
                  onPointerMove={handleImagePointerMove}
                  onPointerUp={handleImagePointerUp}
                  onPointerCancel={handleImagePointerUp}
                  onPointerLeave={handleImagePointerUp}
                />
              </div>
            </DeviceFrame>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PreviewArea({
  screen,
  removeScreen,
  bgColor,
  iPhoneZoom,
  setIPhoneZoom,
  iPhonePan,
  setIPhonePan,
  iPhoneIsDragging,
  setIPhoneIsDragging,
  iPhoneDragStart,
  setIPhoneDragStart,
  iPhoneImageOffset,
  setIPhoneImageOffset,
  iPhoneIsImageDragging,
  setIPhoneIsImageDragging,
  iPhoneImageDragStart,
  setIPhoneImageDragStart,
  pixelZoom,
  setPixelZoom,
  pixelPan,
  setPixelPan,
  pixelIsDragging,
  setPixelIsDragging,
  pixelDragStart,
  setPixelDragStart,
  pixelImageOffset,
  setPixelImageOffset,
  pixelIsImageDragging,
  setPixelIsImageDragging,
  pixelImageDragStart,
  setPixelImageDragStart,
}: {
  screen: ScreenItem | null;
  removeScreen: () => void;
  bgColor: string;
  iPhoneZoom: number;
  setIPhoneZoom: (z: number) => void;
  iPhonePan: { x: number; y: number };
  setIPhonePan: (p: { x: number; y: number }) => void;
  iPhoneIsDragging: boolean;
  setIPhoneIsDragging: (d: boolean) => void;
  iPhoneDragStart: { x: number; y: number };
  setIPhoneDragStart: (d: { x: number; y: number }) => void;
  iPhoneImageOffset: { x: number; y: number };
  setIPhoneImageOffset: (offset: { x: number; y: number }) => void;
  iPhoneIsImageDragging: boolean;
  setIPhoneIsImageDragging: (d: boolean) => void;
  iPhoneImageDragStart: { x: number; y: number };
  setIPhoneImageDragStart: (d: { x: number; y: number }) => void;
  pixelZoom: number;
  setPixelZoom: (z: number) => void;
  pixelPan: { x: number; y: number };
  setPixelPan: (p: { x: number; y: number }) => void;
  pixelIsDragging: boolean;
  setPixelIsDragging: (d: boolean) => void;
  pixelDragStart: { x: number; y: number };
  setPixelDragStart: (d: { x: number; y: number }) => void;
  pixelImageOffset: { x: number; y: number };
  setPixelImageOffset: (offset: { x: number; y: number }) => void;
  pixelIsImageDragging: boolean;
  setPixelIsImageDragging: (d: boolean) => void;
  pixelImageDragStart: { x: number; y: number };
  setPixelImageDragStart: (d: { x: number; y: number }) => void;
}) {
  const handleDownload = async (element: HTMLElement, label: string) => {
    if (!element) return;
    await downloadDeviceFrame(element, label, bgColor);
  };
  return (
    <main className="relative flex flex-col gap-3 h-full">
      {screen ? (
        <div className="flex gap-3 flex-1 min-h-0">
          {/* iPhone Preview */}
          <div className="flex-1">
            <DeviceView
              screen={screen}
              deviceKey="iphone"
              deviceType="iphone-15-pro"
              deviceLabel="iPhone 15 Pro"
              zoom={iPhoneZoom}
              setZoom={setIPhoneZoom}
              pan={iPhonePan}
              setPan={setIPhonePan}
              isDragging={iPhoneIsDragging}
              setIsDragging={setIPhoneIsDragging}
              dragStart={iPhoneDragStart}
              setDragStart={setIPhoneDragStart}
              imageOffset={iPhoneImageOffset}
              setImageOffset={setIPhoneImageOffset}
              isImageDragging={iPhoneIsImageDragging}
              setIsImageDragging={setIPhoneIsImageDragging}
              imageDragStart={iPhoneImageDragStart}
              setImageDragStart={setIPhoneImageDragStart}
              bgColor={bgColor}
              removeScreen={removeScreen}
              onDownload={handleDownload}
            />
          </div>

          {/* Pixel Preview */}
          <div className="flex-1">
            <DeviceView
              screen={screen}
              deviceKey="pixel"
              deviceType="pixel-8"
              deviceLabel="Pixel 8"
              zoom={pixelZoom}
              setZoom={setPixelZoom}
              pan={pixelPan}
              setPan={setPixelPan}
              isDragging={pixelIsDragging}
              setIsDragging={setPixelIsDragging}
              dragStart={pixelDragStart}
              setDragStart={setPixelDragStart}
              imageOffset={pixelImageOffset}
              setImageOffset={setPixelImageOffset}
              isImageDragging={pixelIsImageDragging}
              setIsImageDragging={setPixelIsImageDragging}
              imageDragStart={pixelImageDragStart}
              setImageDragStart={setPixelImageDragStart}
              bgColor={bgColor}
              removeScreen={removeScreen}
              onDownload={handleDownload}
            />
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden bg-card shadow-sm flex-1 flex flex-col items-center justify-center text-foreground/40 gap-3">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm font-medium">Image yet not uploaded</p>
        </div>
      )}
    </main>
  );
}
