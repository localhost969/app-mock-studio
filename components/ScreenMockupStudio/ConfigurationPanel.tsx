import * as React from "react";
import {
  ImagePlusIcon,
  MousePointerIcon,
  PinIcon,
  Trash2Icon,
  UploadCloudIcon,
  ZoomInIcon,
} from "lucide-react";
import type { ScreenItem } from "./types";

interface ConfigurationPanelProps {
  bgColor: string;
  setBgColor: (color: string) => void;
  addFiles: (files: FileList | null) => void;
  hasImage: boolean;
  screen: ScreenItem | null;
  removeScreen: () => void;
  onLoadSample: () => void;
}

const COLOR_SWATCHES = [
  { label: "White", value: "#ffffff" },
  { label: "Off White", value: "#f8f8f8" },
  { label: "Soft Gray", value: "#e5e5e5" },
  { label: "Ice Gray", value: "#e2e8f0" },
  { label: "Charcoal Slate", value: "#1f242d" },
  { label: "OLED Black", value: "#0a0a0c" },
];

export function ConfigurationPanel({
  bgColor,
  setBgColor,
  addFiles,
  hasImage,
  screen,
  removeScreen,
  onLoadSample,
}: ConfigurationPanelProps) {
  return (
    <aside className="w-full lg:w-[280px] flex-none">
      <div className="rounded-2xl border border-border bg-card p-5 shadow-xs space-y-5">
        {/* Section 1: Background */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-foreground/50">
              Background
            </label>
            <span className="font-mono text-[11px] text-foreground/45 uppercase">{bgColor}</span>
          </div>

          <div className="grid grid-cols-6 gap-2">
            {COLOR_SWATCHES.map((color) => {
              const isSelected = bgColor.toLowerCase() === color.value.toLowerCase();
              return (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setBgColor(color.value)}
                  title={color.label}
                  className={`relative aspect-square w-full rounded-lg border transition-all hover:scale-105 active:scale-95 shadow-xs ${
                    isSelected
                      ? "border-accent ring-2 ring-accent/30 scale-105"
                      : "border-border hover:border-foreground/30"
                  }`}
                  style={{ backgroundColor: color.value }}
                />
              );
            })}
          </div>

          {/* Custom Hex Color Input */}
          <div className="flex items-center gap-2 pt-1">
            <div className="flex h-8 flex-1 items-center gap-2 rounded-lg border border-border bg-foreground/[0.02] px-2.5">
              <input
                type="color"
                value={bgColor.startsWith("#") ? bgColor : "#f8f8f8"}
                onChange={(e) => setBgColor(e.target.value)}
                className="h-5 w-5 cursor-pointer rounded border-0 bg-transparent p-0"
              />
              <span className="font-mono text-xs text-foreground/70">{bgColor}</span>
            </div>
          </div>
        </div>

        {/* Section 2: Screenshot Asset */}
        <div className="space-y-2.5 pt-3 border-t border-border">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-foreground/50 block">
            Screenshot
          </label>

          {hasImage && screen ? (
            <div className="space-y-2.5">
              <div className="flex items-center gap-3 rounded-xl border border-border bg-foreground/[0.02] p-2.5">
                <div className="h-12 w-9 flex-none overflow-hidden rounded-md border border-border bg-background shadow-xs">
                  <img src={screen.src} alt={screen.name} className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-foreground">{screen.name}</p>
                  <p className="text-[11px] text-foreground/45">Ready on both frames</p>
                </div>
                <button
                  type="button"
                  onClick={removeScreen}
                  title="Remove image"
                  className="flex h-7 w-7 flex-none items-center justify-center rounded-lg text-foreground/45 transition-colors hover:bg-red-500/10 hover:text-red-500"
                >
                  <Trash2Icon className="h-3.5 w-3.5" />
                </button>
              </div>

              <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-border bg-foreground/[0.03] px-3 py-2 text-xs font-medium text-foreground/80 transition-colors hover:bg-foreground/[0.06] active:scale-[0.99]">
                <ImagePlusIcon className="h-3.5 w-3.5 text-accent" />
                <span>Replace Screenshot</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    addFiles(e.target.files);
                    e.currentTarget.value = "";
                  }}
                />
              </label>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="group flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-foreground/[0.01] p-5 text-center cursor-pointer transition-all hover:border-accent/60 hover:bg-accent/[0.03]">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/[0.05] text-foreground/60 transition-transform group-hover:scale-110 group-hover:bg-accent/15 group-hover:text-accent">
                  <UploadCloudIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Upload Screenshot</p>
                  <p className="text-[11px] text-foreground/45">PNG, JPG, WebP</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    addFiles(e.target.files);
                    e.currentTarget.value = "";
                  }}
                />
              </label>

              <button
                type="button"
                onClick={onLoadSample}
                className="w-full rounded-lg border border-border/70 bg-foreground/[0.02] py-1.5 text-center text-[11px] font-medium text-foreground/70 hover:bg-accent/10 hover:border-accent/40 hover:text-accent transition-colors"
              >
                Load sample screenshot
              </button>
            </div>
          )}
        </div>

        {/* Section 3: Interaction Guide */}
        <div className="space-y-2 pt-3 border-t border-border text-[11px] text-foreground/50">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-foreground/50 block">
            Interaction Guide
          </label>
          <p className="flex items-center gap-2">
            <PinIcon className="h-3.5 w-3.5 text-accent flex-none" />
            <span><strong className="font-semibold text-foreground/75">Drag screen</strong> to adjust crop</span>
          </p>
          <p className="flex items-center gap-2">
            <MousePointerIcon className="h-3.5 w-3.5 text-accent flex-none" />
            <span><strong className="font-semibold text-foreground/75">Drag background</strong> to move frame</span>
          </p>
          <p className="flex items-center gap-2">
            <ZoomInIcon className="h-3.5 w-3.5 text-accent flex-none" />
            <span><strong className="font-semibold text-foreground/75">Toolbar buttons</strong> to zoom &amp; export</span>
          </p>
        </div>
      </div>
    </aside>
  );
}
