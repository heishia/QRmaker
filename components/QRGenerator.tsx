"use client";

import { useState, useRef } from "react";
import QRPreview from "./QRPreview";
import CustomizePanel from "./CustomizePanel";
import DownloadButtons from "./DownloadButtons";
import type { QROptions, ErrorCorrectionLevel, QRSize } from "./types";

const DEFAULT_OPTIONS: QROptions = {
  url: "",
  fgColor: "#000000",
  bgColor: "#ffffff",
  size: 256,
  level: "H",
  logoSrc: null,
};

export default function QRGenerator() {
  const [options, setOptions] = useState<QROptions>(DEFAULT_OPTIONS);
  const [inputValue, setInputValue] = useState("");

  const svgRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleGenerate = () => {
    const value = inputValue.trim();
    if (!value) return;
    const normalized =
      value.startsWith("http://") || value.startsWith("https://")
        ? value
        : `https://${value}`;
    setOptions((prev) => ({ ...prev, url: normalized }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleGenerate();
  };

  const updateOption = <K extends keyof QROptions>(
    key: K,
    value: QROptions[K]
  ) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      {/* URL 입력 */}
      <div className="flex gap-2 mb-8">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="URL을 입력하세요 (예: https://example.com)"
          className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
        />
        <button
          onClick={handleGenerate}
          disabled={!inputValue.trim()}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold shadow-sm hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          생성
        </button>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 왼쪽: QR 미리보기 + 다운로드 */}
        <div className="flex flex-col items-center gap-6">
          <QRPreview
            options={options}
            svgRef={svgRef}
            canvasRef={canvasRef}
          />
          {options.url && (
            <DownloadButtons
              options={options}
              svgRef={svgRef}
              canvasRef={canvasRef}
            />
          )}
        </div>

        {/* 오른쪽: 커스터마이징 패널 */}
        <CustomizePanel
          options={options}
          onFgColorChange={(v) => updateOption("fgColor", v)}
          onBgColorChange={(v) => updateOption("bgColor", v)}
          onSizeChange={(v) => updateOption("size", v as QRSize)}
          onLevelChange={(v) =>
            updateOption("level", v as ErrorCorrectionLevel)
          }
          onLogoChange={(v) => updateOption("logoSrc", v)}
        />
      </div>
    </div>
  );
}
