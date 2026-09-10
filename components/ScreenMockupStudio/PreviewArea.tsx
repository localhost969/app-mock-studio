import * as React from "react";
import {
  CheckIcon,
  CopyIcon,
  DownloadIcon,
  MoveIcon,
  RotateCcwIcon,
} from "lucide-react";
import { DeviceFrame } from "@/components/DeviceFrames";
import type { DeviceKey, DevicePlacement, DeviceSpec, ScreenItem } from "./types";
import { copyElementToClipboard, downloadElementAsPng } from "./useDownloadFrame";

type DragTarget = "frame" | "image";

interface DeviceCardProps {
  screen: ScreenItem | null;
  device: DeviceSpec;
  placement: DevicePlacement;
  bgColor: string;
  updatePlacement: (deviceKey: DeviceKey, placement: DevicePlacement) => void;
  addFiles: (files: FileList | null) => void;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function DeviceCard({
  screen,
  device,
  placement,
  bgColor,
  updatePlacement,
}: DeviceCardProps) {
  const canvasRef = React.useRef<HTMLDivElement>(null);
  const frameZoomSliderRef = React.useRef<HTMLDivElement>(null);
  const imageZoomSliderRef = React.useRef<HTMLDivElement>(null);

  const [baseScale, setBaseScale] = React.useState<number>(1);

  const dragRef = React.useRef<{
    pointerId: number;
    target: DragTarget;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);

  const [dragTarget, setDragTarget] = React.useState<DragTarget | null>(null);
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [isCopied, setIsCopied] = React.useState(false);

  // Keep latest placement in a ref for stable non-passive event listeners
  const placementRef = React.useRef(placement);
  placementRef.current = placement;

  // Dynamically calculate the optimal base scale so the frame always fits the user's screen
  React.useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    const updateScale = () => {
      const height = el.clientHeight;
      const width = el.clientWidth;
      if (height === 0 || width === 0) return;

      // Phone is 250w x 542h
      // Maintain at least 36px vertical and 28px horizontal clearance
      const scaleY = (height - 36) / 542;
      const scaleX = (width - 28) / 250;
      const fit = Math.min(scaleY, scaleX, 1.05);
      setBaseScale(Math.max(0.5, Number(fit.toFixed(3))));
    };

    updateScale();

    const ro = new ResizeObserver(() => {
      updateScale();
    });
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  const patchPlacement = React.useCallback(
    (patch: Partial<DevicePlacement>) => {
      updatePlacement(device.key, {
        ...placement,
        ...patch,
      });
    },
    [device.key, placement, updatePlacement]
  );

  // Resets ALL user adjustments (frame pan/zoom and image pan/zoom)
  const resetAllPlacements = () => {
    patchPlacement({
      frameZoom: 1,
      framePan: { x: 0, y: 0 },
      imageZoom: 1,
      imageOffset: { x: 0, y: 0 },
    });
  };

  // Attach native non-passive wheel listeners so e.preventDefault() completely stops page scrolling
  React.useEffect(() => {
    const el = frameZoomSliderRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const current = placementRef.current;
      const step = e.shiftKey ? 0.08 : 0.02;
      const delta = e.deltaY < 0 ? step : -step;
      const nextZoom = clamp(Number((current.frameZoom + delta).toFixed(2)), 0.7, 1.5);
      patchPlacement({ frameZoom: nextZoom });
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [patchPlacement]);

  React.useEffect(() => {
    const el = imageZoomSliderRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const current = placementRef.current;
      const step = e.shiftKey ? 0.08 : 0.02;
      const delta = e.deltaY < 0 ? step : -step;
      const nextZoom = clamp(Number((current.imageZoom + delta).toFixed(2)), 0.7, 2.2);
      patchPlacement({ imageZoom: nextZoom });
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [patchPlacement]);

  const beginDrag = (e: React.PointerEvent<HTMLElement>, target: DragTarget) => {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();

    const origin = target === "frame" ? placement.framePan : placement.imageOffset;
    dragRef.current = {
      pointerId: e.pointerId,
      target,
      startX: e.clientX,
      startY: e.clientY,
      originX: origin.x,
      originY: origin.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragTarget(target);
  };

  const moveDrag = (e: React.PointerEvent<HTMLElement>) => {
    const activeDrag = dragRef.current;
    if (!activeDrag || activeDrag.pointerId !== e.pointerId) return;

    const nextOffset = {
      x: activeDrag.originX + e.clientX - activeDrag.startX,
      y: activeDrag.originY + e.clientY - activeDrag.startY,
    };

    if (activeDrag.target === "frame") {
      patchPlacement({ framePan: nextOffset });
    } else {
      patchPlacement({ imageOffset: nextOffset });
    }
  };

  const endDrag = (e: React.PointerEvent<HTMLElement>) => {
    if (dragRef.current?.pointerId === e.pointerId) {
      dragRef.current = null;
      setDragTarget(null);
    }
  };

  const handleDownload = async () => {
    if (!canvasRef.current || isDownloading) return;
    setIsDownloading(true);
    try {
      await downloadElementAsPng(canvasRef.current, `${device.label}-mockup`);
    } catch (err) {
      console.error("Export error:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopy = async () => {
    if (!canvasRef.current || isCopied) return;
    const success = await copyElementToClipboard(canvasRef.current);
    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2200);
    }
  };

  const effectiveScale = baseScale * placement.frameZoom;

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xs">
      {/* 1. TOP HEADER BAR (OUTSIDE & ABOVE THE FRAME BOX - ZERO MERGER) */}
      <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
        {/* Device Label & Platform */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-tight text-foreground">
            {device.label}
          </span>
          <span className="rounded-md bg-foreground/[0.05] px-1.5 py-0.5 text-[10px] font-medium uppercase text-foreground/50">
            {device.platform}
          </span>
        </div>

        {/* Action Buttons: Copy and Download */}
        <div className="flex items-center gap-2">
          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            title="Copy image to clipboard"
            className="flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground/80 hover:bg-foreground/5 hover:text-foreground transition-colors active:scale-95 shadow-2xs"
          >
            {isCopied ? (
              <>
                <CheckIcon className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  Copied
                </span>
              </>
            ) : (
              <>
                <CopyIcon className="h-3.5 w-3.5 text-foreground/60" />
                <span>Copy</span>
              </>
            )}
          </button>

          {/* Download Button */}
          <button
            type="button"
            onClick={handleDownload}
            disabled={isDownloading}
            title="Download 2X PNG"
            className="flex h-8 items-center gap-1.5 rounded-lg bg-accent px-3 text-xs font-semibold text-accent-foreground shadow-2xs hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
          >
            <DownloadIcon className="h-3.5 w-3.5" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* 2. THE FRAME BOX / CANVAS (CONTAINS ONLY PHONE & BACKGROUND - ADJUSTS DYNAMICALLY) */}
      <div
        ref={canvasRef}
        className="relative flex h-[clamp(380px,calc(100vh-270px),620px)] w-full items-center justify-center overflow-hidden select-none transition-colors"
        style={{
          backgroundColor: bgColor,
          touchAction: "none",
        }}
        onPointerDown={(e) => beginDrag(e, "frame")}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
      >
        {/* Dynamic Scale & Positioning Wrapper */}
        <div
          className="relative flex items-center justify-center"
          style={{
            transform: `translate(${placement.framePan.x}px, ${placement.framePan.y}px) scale(${effectiveScale})`,
            transformOrigin: "center center",
            transition: dragTarget === "frame" ? "none" : "transform 160ms ease-out",
          }}
        >
          <DeviceFrame device={device}>
            {screen ? (
              /* Uploaded Screenshot View */
              <div
                className="relative h-full w-full overflow-hidden bg-black"
                onPointerDown={(e) => beginDrag(e, "image")}
                onPointerMove={moveDrag}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                onPointerLeave={endDrag}
              >
                <img
                  src={screen.src}
                  alt={`${screen.name} in ${device.label}`}
                  className="h-full w-full cursor-grab select-none object-cover active:cursor-grabbing"
                  draggable={false}
                  style={{
                    transform: `translate(${placement.imageOffset.x}px, ${placement.imageOffset.y}px) scale(${placement.imageZoom})`,
                    transformOrigin: "center center",
                    transition: dragTarget === "image" ? "none" : "transform 160ms ease-out",
                  }}
                />
              </div>
            ) : (
              /* Realistic Dark OLED Screen (Clean Display with Zero Buttons Inside) */
              <div className="relative h-full w-full bg-[#08090c]" />
            )}
          </DeviceFrame>
        </div>
      </div>

      {/* 3. FOOTER CONTROLS UNDER FRAME (FRAME ZOOM SLIDER, IMAGE ZOOM SLIDER, RESET POSITION) */}
      <div className="border-t border-border bg-card p-3.5 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Frame Zoom Slider with Non-Passive Robust Scroll Wheel Support */}
          <div
            ref={frameZoomSliderRef}
            style={{ overscrollBehavior: "contain" }}
            className="space-y-1 rounded-xl border border-border bg-foreground/[0.02] px-3 py-2 cursor-pointer select-none"
            title="Drag or scroll mouse wheel over this bar to adjust frame zoom"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-foreground/70 text-[11px]">Frame Zoom</span>
              <span className="font-mono text-[11px] text-foreground/50">
                {Math.round(placement.frameZoom * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.7"
              max="1.5"
              step="0.01"
              value={placement.frameZoom}
              onChange={(e) =>
                patchPlacement({ frameZoom: clamp(parseFloat(e.target.value), 0.7, 1.5) })
              }
              className="w-full h-1.5 bg-foreground/15 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Image Zoom Slider with Non-Passive Robust Scroll Wheel Support */}
          <div
            ref={imageZoomSliderRef}
            style={{ overscrollBehavior: "contain" }}
            className="space-y-1 rounded-xl border border-border bg-foreground/[0.02] px-3 py-2 cursor-pointer select-none"
            title="Drag or scroll mouse wheel over this bar to adjust image zoom"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-foreground/70 text-[11px]">Image Zoom</span>
              <span className="font-mono text-[11px] text-foreground/50">
                {Math.round(placement.imageZoom * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.7"
              max="2.2"
              step="0.01"
              value={placement.imageZoom}
              onChange={(e) =>
                patchPlacement({ imageZoom: clamp(parseFloat(e.target.value), 0.7, 2.2) })
              }
              className="w-full h-1.5 bg-foreground/15 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Footer Actions Row */}
        <div className="flex items-center justify-between pt-0.5">
          <span className="text-[11px] text-foreground/45 flex items-center gap-1.5">
            <MoveIcon className="h-3 w-3" />
            Drag canvas to pan • Drag screen to crop • Scroll on bars to zoom
          </span>

          {/* Reset Position Button Under Frame */}
          <button
            type="button"
            onClick={resetAllPlacements}
            title="Reset position and zoom"
            className="flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 text-xs font-medium text-foreground/70 hover:bg-foreground/5 hover:text-foreground transition-colors active:scale-95"
          >
            <RotateCcwIcon className="h-3.5 w-3.5" />
            <span>Reset Position</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export function PreviewArea({
  screen,
  bgColor,
  devices,
  placements,
  updatePlacement,
  addFiles,
}: {
  screen: ScreenItem | null;
  bgColor: string;
  devices: DeviceSpec[];
  placements: Record<DeviceKey, DevicePlacement>;
  updatePlacement: (deviceKey: DeviceKey, placement: DevicePlacement) => void;
  addFiles: (files: FileList | null) => void;
}) {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 pb-6">
      {devices.map((device) => (
        <DeviceCard
          key={device.key}
          screen={screen}
          device={device}
          placement={
            placements[device.key] ?? {
              frameZoom: 1,
              framePan: { x: 0, y: 0 },
              imageZoom: 1,
              imageOffset: { x: 0, y: 0 },
            }
          }
          bgColor={bgColor}
          updatePlacement={updatePlacement}
          addFiles={addFiles}
        />
      ))}
    </main>
  );
}
