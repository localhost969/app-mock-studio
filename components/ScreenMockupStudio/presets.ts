import type { DeviceSpec, TiltAngle, ShadowStyle } from "./types";

export interface BackgroundPreset {
  id: string;
  name: string;
  value: string;
  category: "gradient" | "mesh" | "solid";
  previewCss: string;
}

export const BACKGROUND_PRESETS: BackgroundPreset[] = [
  // Gradients
  {
    id: "midnight-violet",
    name: "Midnight Violet",
    category: "gradient",
    value: "linear-gradient(135deg, #090a0f 0%, #17152c 50%, #2e1d4d 100%)",
    previewCss: "linear-gradient(135deg, #090a0f 0%, #17152c 50%, #2e1d4d 100%)",
  },
  {
    id: "deep-space",
    name: "Deep Space",
    category: "gradient",
    value: "linear-gradient(135deg, #0b132b 0%, #1c2541 50%, #3a506b 100%)",
    previewCss: "linear-gradient(135deg, #0b132b 0%, #1c2541 50%, #3a506b 100%)",
  },
  {
    id: "sunset-horizon",
    name: "Sunset Horizon",
    category: "gradient",
    value: "linear-gradient(135deg, #f97316 0%, #e11d48 50%, #7c3aed 100%)",
    previewCss: "linear-gradient(135deg, #f97316 0%, #e11d48 50%, #7c3aed 100%)",
  },
  {
    id: "cyber-mint",
    name: "Cyber Mint",
    category: "gradient",
    value: "linear-gradient(135deg, #031e17 0%, #064e3b 50%, #059669 100%)",
    previewCss: "linear-gradient(135deg, #031e17 0%, #064e3b 50%, #059669 100%)",
  },
  {
    id: "aurora",
    name: "Aurora Glow",
    category: "gradient",
    value: "linear-gradient(135deg, #052e16 0%, #164e63 50%, #312e81 100%)",
    previewCss: "linear-gradient(135deg, #052e16 0%, #164e63 50%, #312e81 100%)",
  },
  {
    id: "electric-pink",
    name: "Electric Rose",
    category: "gradient",
    value: "linear-gradient(135deg, #4c0519 0%, #831843 50%, #db2777 100%)",
    previewCss: "linear-gradient(135deg, #4c0519 0%, #831843 50%, #db2777 100%)",
  },
  {
    id: "golden-hour",
    name: "Golden Hour",
    category: "gradient",
    value: "linear-gradient(135deg, #fef3c7 0%, #fed7aa 50%, #f472b6 100%)",
    previewCss: "linear-gradient(135deg, #fef3c7 0%, #fed7aa 50%, #f472b6 100%)",
  },
  {
    id: "nordic-fog",
    name: "Nordic Clean",
    category: "gradient",
    value: "linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)",
    previewCss: "linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)",
  },
  {
    id: "darkroom",
    name: "Studio Darkroom",
    category: "gradient",
    value: "linear-gradient(145deg, #18181b 0%, #09090b 100%)",
    previewCss: "linear-gradient(145deg, #18181b 0%, #09090b 100%)",
  },

  // Mesh radial glows
  {
    id: "mesh-violet",
    name: "Violet Aura",
    category: "mesh",
    value: "radial-gradient(circle at 50% 45%, #6366f1 0%, #1e1b4b 60%, #09090b 100%)",
    previewCss: "radial-gradient(circle at 50% 50%, #6366f1 0%, #1e1b4b 60%, #09090b 100%)",
  },
  {
    id: "mesh-emerald",
    name: "Emerald Halo",
    category: "mesh",
    value: "radial-gradient(circle at 50% 45%, #10b981 0%, #064e3b 60%, #050507 100%)",
    previewCss: "radial-gradient(circle at 50% 50%, #10b981 0%, #064e3b 60%, #050507 100%)",
  },
  {
    id: "mesh-cyan",
    name: "Neon Blue Halo",
    category: "mesh",
    value: "radial-gradient(circle at 50% 45%, #06b6d4 0%, #0f172a 65%, #020617 100%)",
    previewCss: "radial-gradient(circle at 50% 50%, #06b6d4 0%, #0f172a 65%, #020617 100%)",
  },

  // Solids
  {
    id: "solid-white",
    name: "Pure White",
    category: "solid",
    value: "#ffffff",
    previewCss: "#ffffff",
  },
  {
    id: "solid-slate",
    name: "Studio Gray",
    category: "solid",
    value: "#f1f3f5",
    previewCss: "#f1f3f5",
  },
  {
    id: "solid-zinc",
    name: "Deep Slate",
    category: "solid",
    value: "#18181b",
    previewCss: "#18181b",
  },
  {
    id: "solid-black",
    name: "OLED Black",
    category: "solid",
    value: "#070709",
    previewCss: "#070709",
  },
];

export const DEVICE_SPECS: DeviceSpec[] = [
  {
    key: "iphone-15-pro",
    label: "iPhone 15 Pro",
    subLabel: "iOS Dynamic Island",
    platform: "ios",
    family: "iphone-dynamic",
    viewport: { width: 393, height: 852 },
    diagonal: "6.1 in",
    note: "Super Retina XDR",
    finish: "natural",
    finishes: [
      { id: "natural", name: "Natural Titanium", hex: "#909299" },
      { id: "black", name: "Space Black", hex: "#222326" },
      { id: "desert", name: "Desert Titanium", hex: "#8c7866" },
      { id: "blue", name: "Blue Titanium", hex: "#3e4f68" },
    ],
  },
  {
    key: "galaxy-s24-ultra",
    label: "Galaxy S24 Ultra",
    subLabel: "Android Titanium",
    platform: "android",
    family: "galaxy",
    viewport: { width: 384, height: 832 },
    diagonal: "6.8 in",
    note: "Dynamic AMOLED 2X",
    finish: "gray",
    finishes: [
      { id: "gray", name: "Titanium Gray", hex: "#767a84" },
      { id: "black", name: "Onyx Black", hex: "#222325" },
      { id: "violet", name: "Cobalt Violet", hex: "#4b3c66" },
    ],
  },
  {
    key: "pixel-8-pro",
    label: "Pixel 8 Pro",
    subLabel: "Google Tensor",
    platform: "android",
    family: "pixel",
    viewport: { width: 390, height: 844 },
    diagonal: "6.7 in",
    note: "Super Actua Display",
    finish: "obsidian",
    finishes: [
      { id: "obsidian", name: "Obsidian", hex: "#27272a" },
      { id: "porcelain", name: "Porcelain", hex: "#e5e7eb" },
      { id: "bay", name: "Bay Blue", hex: "#60a5fa" },
    ],
  },
  {
    key: "minimal-clay",
    label: "Minimal Clay",
    subLabel: "Modern Portfolio",
    platform: "clay",
    family: "clay",
    viewport: { width: 393, height: 852 },
    diagonal: "6.1 in",
    note: "Clean Frameless",
    finish: "light",
    finishes: [
      { id: "light", name: "Clay White", hex: "#ffffff" },
      { id: "dark", name: "Clay Dark", hex: "#18181b" },
    ],
  },
];

export const TILT_ANGLES: { id: TiltAngle; label: string; description: string }[] = [
  { id: "flat", label: "Flat", description: "Direct front view" },
  { id: "tilt-3d", label: "3D Angle", description: "Isometric depth" },
  { id: "tilt-left", label: "Tilt Left", description: "Dynamic perspective" },
  { id: "tilt-right", label: "Tilt Right", description: "Showcase angle" },
];

export const SHADOW_STYLES: { id: ShadowStyle; label: string }[] = [
  { id: "none", label: "Flat (No Shadow)" },
  { id: "soft", label: "Soft Ambient" },
  { id: "studio", label: "Studio Float" },
  { id: "dramatic", label: "Dramatic Depth" },
  { id: "glow", label: "Neon Glow" },
];
