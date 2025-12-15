import * as React from "react";

export function MinimalFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative mx-auto w-[300px] h-[600px] ${className ?? ""}`.trim()}>
      <div className="absolute inset-0 shadow-2xl ring-1 ring-black/5 bg-white dark:bg-gray-900 z-0" />
      <div className="absolute inset-2 overflow-hidden bg-white dark:bg-black z-10 flex flex-col items-start">
        <div className="w-full h-full">{children}</div>
      </div>
    </div>
  );
}
