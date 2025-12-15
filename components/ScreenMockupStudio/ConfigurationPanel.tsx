import { PinIcon, MousePointerIcon, ZoomInIcon } from 'lucide-react';

export function ConfigurationPanel({
  bgColor,
  setBgColor,
  addFiles,
  hasImage,
}: {
  bgColor: string;
  setBgColor: (c: string) => void;
  addFiles: (files: FileList | null) => void;
  hasImage: boolean;
}) {
  return (
    <aside className="space-y-4 h-fit sticky top-4 w-64">
      <div className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="font-semibold text-base">Settings</h2>

        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground/70">Background</label>
          <div className="grid grid-cols-5 gap-2">
            {['#ffffff', '#f8f8f8', '#e5e5e5', '#1a1a1a', '#0a0a0a'].map((color) => (
              <button
                key={color}
                onClick={() => setBgColor(color)}
                className={`w-full aspect-square rounded-md border-2 transition-all shadow-sm hover:scale-105 ${bgColor === color ? 'border-accent ring-2 ring-accent/30' : 'border-border hover:border-foreground/20'}`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <label className="block w-full cursor-pointer rounded-lg border-2 border-dashed border-border hover:border-accent/50 hover:bg-accent/5 transition-colors p-6 text-center group">
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 rounded-full bg-foreground/5 group-hover:bg-accent/10 transition-colors">
                <svg className="w-6 h-6 text-foreground/60 group-hover:text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="text-sm font-medium">Upload Image</span>
              <span className="text-xs text-foreground/50">PNG, JPG, WebP</span>
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
        </div>

        {hasImage && (
          <div className="pt-3 border-t border-border text-xs text-foreground/50 space-y-2">
            <p className="flex items-center gap-2"><PinIcon className="w-4 h-4" /> <span className="text-foreground/70">Drag image</span> to adjust into frame</p>
            <p className="flex items-center gap-2"><MousePointerIcon className="w-4 h-4" /> <span className="text-foreground/70">Drag background</span> to move frame</p>
            <p className="flex items-center gap-2"><ZoomInIcon className="w-4 h-4" /> Use buttons to zoom</p>
          </div>
        )}
      </div>
    </aside>
  );
}
