import { toPng } from "html-to-image";

// Padding around the device frame in the export (in pixels at 2x resolution)
const EXPORT_PADDING = 60;

/**
 * Converts a blob URL to a data URL by drawing it to a canvas
 */
async function blobUrlToDataUrl(blobUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
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
 * Pre-processes images to convert blob URLs to data URLs
 */
async function convertBlobImagesToDataUrls(
  element: HTMLElement
): Promise<Map<HTMLImageElement, string>> {
  const images = element.querySelectorAll("img");
  const originalSrcs = new Map<HTMLImageElement, string>();

  const conversions = Array.from(images).map(async (img) => {
    const src = img.src;
    if (src && src.startsWith("blob:")) {
      try {
        originalSrcs.set(img, src);
        const dataUrl = await blobUrlToDataUrl(src);
        img.src = dataUrl;
      } catch (error) {
        console.warn("Failed to convert blob URL to data URL:", error);
      }
    }
  });

  await Promise.all(conversions);
  return originalSrcs;
}

/**
 * Restores original blob URLs after capture
 */
function restoreOriginalSrcs(
  originalSrcs: Map<HTMLImageElement, string>
): void {
  originalSrcs.forEach((src, img) => {
    img.src = src;
  });
}

/**
 * Extends an image with padding using Canvas
 */
async function extendImageWithPadding(
  imageDataUrl: string,
  padding: number,
  bgColor: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width + padding * 2;
      canvas.height = img.height + padding * 2;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      // Fill the entire canvas with background color
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the captured image in the center
      ctx.drawImage(img, padding, padding);

      try {
        const extendedDataUrl = canvas.toDataURL("image/png");
        resolve(extendedDataUrl);
      } catch (e) {
        reject(e);
      }
    };

    img.onerror = () => {
      reject(new Error("Failed to load captured image"));
    };

    img.src = imageDataUrl;
  });
}

/**
 * Downloads the device frame as a PNG image with padding around it
 */
export async function downloadDeviceFrame(
  element: HTMLElement,
  deviceLabel: string,
  bgColor: string
): Promise<void> {
  try {
    // The actual device frame is the first child of the passed element
    const deviceFrame = element.firstElementChild as HTMLElement;

    if (!deviceFrame) {
      console.error("No device frame found inside element");
      alert("Failed to download image. No device frame found.");
      return;
    }

    // Convert blob URLs to data URLs
    const originalSrcs = await convertBlobImagesToDataUrls(deviceFrame);

    // Small delay to ensure images are loaded
    await new Promise((r) => setTimeout(r, 100));

    try {
      // Step 1: Capture the device frame exactly as it appears (clean capture)
      const capturedDataUrl = await toPng(deviceFrame, {
        backgroundColor: bgColor,
        pixelRatio: 2,
        cacheBust: true,
      });

      // Step 2: Extend the captured image with padding on all sides
      const finalDataUrl = await extendImageWithPadding(
        capturedDataUrl,
        EXPORT_PADDING,
        bgColor
      );

      // Trigger download
      const link = document.createElement("a");
      link.download = `${deviceLabel.replace(/\s+/g, "-")}-${Date.now()}.png`;
      link.href = finalDataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      // Restore original blob URLs
      restoreOriginalSrcs(originalSrcs);
    }
  } catch (error) {
    console.error("Download failed:", error);
    alert("Failed to download image. Please try again.");
  }
}
