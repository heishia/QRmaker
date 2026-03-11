"use client";

import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";
import type { QROptions } from "./types";
import type { RefObject } from "react";

interface QRPreviewProps {
  options: QROptions;
  svgRef: RefObject<HTMLDivElement | null>;
  canvasRef: RefObject<HTMLDivElement | null>;
}

export default function QRPreview({ options, svgRef, canvasRef }: QRPreviewProps) {
  const { url, fgColor, bgColor, size, level, logoSrc } = options;

  const imageSettings = logoSrc
    ? {
        src: logoSrc,
        width: Math.round(size * 0.2),
        height: Math.round(size * 0.2),
        excavate: true,
      }
    : undefined;

  if (!url) {
    return (
      <div
        className="flex items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white text-slate-400 text-sm select-none"
        style={{ width: 256, height: 256 }}
      >
        <div className="text-center">
          <svg
            className="mx-auto mb-2 w-10 h-10 text-slate-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75V16.5zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75V13.5zM13.5 19.5h.75v.75h-.75V19.5zM19.5 13.5h.75v.75h-.75V13.5zM19.5 19.5h.75v.75h-.75V19.5zM16.5 16.5h.75v.75h-.75V16.5z"
            />
          </svg>
          URL을 입력하면<br />QR 코드가 생성됩니다
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      {/* 화면 표시용 SVG */}
      <div
        ref={svgRef}
        className="rounded-2xl shadow-lg overflow-hidden"
        style={{ lineHeight: 0 }}
      >
        <QRCodeSVG
          value={url}
          size={size}
          fgColor={fgColor}
          bgColor={bgColor}
          level={level}
          imageSettings={imageSettings}
        />
      </div>

      {/* 다운로드용 Canvas (숨김) */}
      <div ref={canvasRef} className="hidden" aria-hidden="true">
        <QRCodeCanvas
          value={url}
          size={size}
          fgColor={fgColor}
          bgColor={bgColor}
          level={level}
          imageSettings={imageSettings}
        />
      </div>

      <p className="text-xs text-slate-400 max-w-[256px] truncate text-center">
        {url}
      </p>
    </div>
  );
}
