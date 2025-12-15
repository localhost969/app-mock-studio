import * as React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";
import AppsIcon from "@mui/icons-material/Apps";

type Pixel8FrameProps = {
  children: React.ReactNode;
  className?: string;
};

export function Pixel8Frame({ children, className }: Pixel8FrameProps) {
  const [value, setValue] = React.useState<number>(1);

  const items = React.useMemo(
    () => [
      { id: 0, label: "Back", Icon: ArrowBackIcon },
      { id: 1, label: "Home", Icon: HomeIcon },
      { id: 2, label: "Recents", Icon: AppsIcon },
    ],
    []
  );

  // keyboard nav: left / right to move focus & selection, Enter/Space to activate
  const handleKey = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setValue(idx);
      return;
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setValue((v) => Math.max(0, v - 1));
      return;
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setValue((v) => Math.min(items.length - 1, v + 1));
      return;
    }
  };

  return (
    <div className={`relative mx-auto w-[220px] aspect-[9/19.5] ${className ?? ""}`.trim()}>
      {/* Buttons - Right Side */}
      <div className="absolute top-[88px] -right-[2px] w-[2px] h-[29px] bg-gray-700 rounded-r-sm z-0" /> {/* Power */}
      <div className="absolute top-[125px] -right-[2px] w-[2px] h-[51px] bg-gray-700 rounded-r-sm z-0" /> {/* Volume */}

      {/* Frame Background */}
      <div className="absolute inset-0 bg-black rounded-[33px]" />

      {/* Frame Border (Aluminum look) */}
      <div className="absolute inset-0 rounded-[33px] border-[2px] border-gray-800 shadow-xl" />

      {/* Inner Bezel */}
      <div
        className="absolute bg-black rounded-[29px]"
        style={{
          left: "6px",
          top: "6px",
          right: "6px",
          bottom: "6px",
        }}
      />

      {/* Screen Content */}
      <div
        className="absolute z-10 overflow-hidden"
        style={{
          left: "8px",
          top: "8px",
          right: "8px",
          bottom: "8px",
          borderRadius: "24px",
        }}
      >
        <div className="relative w-full h-full bg-white dark:bg-black flex flex-col">
          {/* Main content (no status bar) */}
          <div className="flex-1 w-full overflow-hidden">{children}</div>

          {/* Bottom Navigation */}
          {/* Android System Bottom Navigation – Minimal */}
          <nav
            className="w-full h-[28px] bg-black flex items-center justify-center"
            role="navigation"
            aria-label="Android system navigation"
          >
            <div className="w-full flex items-center justify-around px-6">
              {/* Back – Triangle */}
              <button
                onClick={() => setValue(0)}
                aria-label="Back"
                className="flex items-center justify-center w-5 h-5 text-white/80 hover:text-white transition-colors"
              >
                <ArrowBackIcon sx={{ fontSize: 12 }} />
              </button>

              {/* Home – Circle */}
              <button
                onClick={() => setValue(1)}
                aria-label="Home"
                className="flex items-center justify-center w-5 h-5 text-white/90"
              >
                <div className="w-2.5 h-2.5 rounded-full border border-white" />
              </button>

              {/* Recents – Square */}
              <button
                onClick={() => setValue(2)}
                aria-label="Recents"
                className="flex items-center justify-center w-5 h-5 text-white/80 hover:text-white transition-colors"
              >
                <div className="w-2.5 h-2.5 border border-white rounded-[2px]" />
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Camera Hole */}
      <div
        className="absolute z-20 bg-black rounded-full"
        style={{
          left: "50%",
          transform: "translateX(-50%)",
          top: "16px",
          width: "13px",
          height: "13px",
        }}
      >
        <div className="absolute inset-0 rounded-full border border-gray-700/60 shadow-inner" />
        <div className="absolute inset-[3px] bg-[#0f0f0f] rounded-full" />
      </div>

      {/* Glossy Overlay */}
      <div className="absolute inset-0 z-30 pointer-events-none rounded-[33px] shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]" />
    </div>
  );
}
