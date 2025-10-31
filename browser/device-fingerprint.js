// Get OS information from userAgent
export function getOS() {
  const userAgent = navigator.userAgent;
  if (/Windows/.test(userAgent)) return "Windows";
  if (/Macintosh/.test(userAgent)) return "Mac OS";
  if (/Linux/.test(userAgent)) return "Linux";
  if (/Android/.test(userAgent)) return "Android";
  if (/iOS|iPhone|iPad|iPod/.test(userAgent)) return "iOS";
  return "Unknown OS";
}

// Get browser information
export function getBrowser() {
  const userAgent = navigator.userAgent;
  if (/Edg/.test(userAgent)) return "Microsoft Edge";
  if (/Chrome/.test(userAgent)) return "Chrome";
  if (/Firefox/.test(userAgent)) return "Firefox";
  if (/Safari/.test(userAgent)) return "Safari";
  if (/Opera/.test(userAgent)) return "Opera";
  return "Unknown Browser";
}

export function getBrowserLanguage(fallback) {
  if (Array.isArray(navigator.languages) && navigator.languages[0]) {
    return navigator.languages.map((lang) => lang.split("-")[0]).join(",");
  }
  return (navigator.language || navigator.userLanguage || "").split("-")[0] || fallback || "";
}

export function getDeviceInfo() {
  const info = {
    // Browser info
    userAgent: navigator.userAgent,
    language: getBrowserLanguage(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    cookiesEnabled: navigator.cookieEnabled,
    doNotTrack: navigator.doNotTrack || "unknown",
    // Screen info
    screenWidth: screen.width,
    screenHeight: screen.height,
    colorDepth: screen.colorDepth,
    pixelDepth: screen.pixelDepth,
    // Device capabilities
    hardwareConcurrency: navigator.hardwareConcurrency || "unknown",
    deviceMemory: navigator.deviceMemory || "unknown",
    // Platform
    platform: getOS(),
    browser: getBrowser(),
    touchSupport: "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0,
    webglVendor: null,
    webglRenderer: null,
    vendorPrefix: null,
  };

  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (gl) {
      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      if (debugInfo) {
        info.webglRenderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        info.webglVendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
        info.vendorPrefix = gl.getParameter(gl.VENDOR);
      }
    }
  } catch (e) {}

  return info;
}

export function getCanvasFingerprint() {
  // Canvas fingerprinting works by drawing text and shapes on a hidden HTML5 canvas element and then converting it to a data URL. The resulting image data varies slightly based on:
  // Operating system,Graphics hardware, Graphics drivers, Anti-aliasing settings, Font rendering differences
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  ctx.textBaseline = "top";
  ctx.font = "14px Arial";
  ctx.fillStyle = "#f60";
  ctx.fillRect(125, 1, 62, 20);
  ctx.fillStyle = "#069";
  ctx.fillText("Hello, world!", 2, 15);
  ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
  ctx.fillText("Hello, world!", 4, 17);

  return canvas.toDataURL();
}

// Create a hash of the components
export async function hashString(string) {
  // Using SubtleCrypto for modern browsers
  if (window.crypto && window.crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(string);
    const hash = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }
}

export default async function generateUserFingerprint() {
  const deviceInfo = getDeviceInfo();
  const canvasPrint = getCanvasFingerprint().substring(20, 120); // First 50 chars for brevity
  // Combine all data into a string
  const fingerprintData = JSON.stringify({ ...deviceInfo, canvasPrint: canvasPrint });
  // Hash the fingerprint data (using simple hash for example)
  return await hashString(fingerprintData); // fingerprintHash
}
