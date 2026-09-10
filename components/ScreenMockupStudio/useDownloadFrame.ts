import { toPng } from "html-to-image";

/**
 * Converts a blob URL to a data URL by drawing it to a canvas
 */
async function blobUrlToDataUrl(blobUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth || 800;
      canvas.height = img.naturalHeight || 1600;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }
      ctx.drawImage(img, 0, 0);
      try {
        const dataUrl = canvas.toDataURL("image/png");
        resolve(dataUrl);
      } catch (e) {
        reject(e);
      }
    };

    img.onerror = () => {
      reject(new Error("Failed to load image from blob URL"));
    };

    img.src = blobUrl;
  });
}

/**
 * Pre-processes images inside element to ensure all blob URLs are converted to base64 Data URLs
 */
async function prepareImagesForExport(element: HTMLElement): Promise<() => void> {
  const images = element.querySelectorAll("img");
  const originalSrcs = new Map<HTMLImageElement, string>();

  const tasks = Array.from(images).map(async (img) => {
    const src = img.src;
    if (src && src.startsWith("blob:")) {
      try {
        originalSrcs.set(img, src);
        const dataUrl = await blobUrlToDataUrl(src);
        img.src = dataUrl;
      } catch (error) {
        console.warn("Could not pre-convert blob URL for export:", error);
      }
    }
  });

  await Promise.all(tasks);

  // Return restore function
  return () => {
    originalSrcs.forEach((src, img) => {
      img.src = src;
    });
  };
}

/**
 * Captures an HTML element as high-res 2X PNG and triggers download
 */
export async function downloadElementAsPng(
  element: HTMLElement,
  filename: string
): Promise<void> {
  const restore = await prepareImagesForExport(element);

  // Short delay to ensure DOM render settled
  await new Promise((resolve) => setTimeout(resolve, 80));

  try {
    const dataUrl = await toPng(element, {
      pixelRatio: 2,
      cacheBust: true,
      filter: (node) => {
        // Exclude interactive floating control toolbars with data-no-export
        if (node instanceof HTMLElement && node.getAttribute("data-no-export") === "true") {
          return false;
        }
        return true;
      },
    });

    const link = document.createElement("a");
    link.download = `${filename.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } finally {
    restore();
  }
}

/**
 * Copies the mockup directly to the clipboard
 */
export async function copyElementToClipboard(element: HTMLElement): Promise<boolean> {
  const restore = await prepareImagesForExport(element);

  await new Promise((resolve) => setTimeout(resolve, 80));

  try {
    const dataUrl = await toPng(element, {
      pixelRatio: 2,
      cacheBust: true,
      filter: (node) => {
        if (node instanceof HTMLElement && node.getAttribute("data-no-export") === "true") {
          return false;
        }
        return true;
      },
    });

    const res = await fetch(dataUrl);
    const blob = await res.blob();

    if (navigator.clipboard && window.ClipboardItem) {
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      return true;
    }
    return false;
  } catch (err) {
    console.warn("Clipboard copy not supported or failed:", err);
    return false;
  } finally {
    restore();
  }
}

// Backward-compatible alias
export const downloadDeviceFrame = async (
  element: HTMLElement,
  label: string,
  _bgColor?: string
) => {
  return downloadElementAsPng(element, label);
};
