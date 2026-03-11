"use client";

import type { QROptions } from "./types";
import type { RefObject } from "react";

interface DownloadButtonsProps {
  options: QROptions;
  svgRef: RefObject<HTMLDivElement | null>;
  canvasRef: RefObject<HTMLDivElement | null>;
}

function triggerDownload(href: string, filename: string) {
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(href);
}

function getFilename(url: string, ext: string) {
  try {
    const hostname = new URL(url).hostname.replace(/\./g, "_");
    return `qr_${hostname}.${ext}`;
  } catch {
    return `qrcode.${ext}`;
  }
}

export default function DownloadButtons({
  options,
  svgRef,
  canvasRef,
}: DownloadButtonsProps) {
  const handlePNGDownload = () => {
    const canvas = canvasRef.current?.querySelector("canvas");
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    triggerDownload(dataUrl, getFilename(options.url, "png"));
  };

  const handleSVGDownload = () => {
    const svg = svgRef.current?.querySelector("svg");
    if (!svg) return;
    const svgContent = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    triggerDownload(url, getFilename(options.url, "svg"));
  };

  return (
    <div className="flex gap-3 w-full max-w-xs">
      <button
        onClick={handlePNGDownload}
        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 text-white rounded-xl text-sm font-semibold shadow-sm hover:bg-indigo-700 transition"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        PNG
      </button>

      <button
        onClick={handleSVGDownload}
        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-white text-slate-700 border border-slate-200 rounded-xl text-sm font-semibold shadow-sm hover:bg-slate-50 hover:border-slate-300 transition"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        SVG
      </button>
    </div>
  );
}
