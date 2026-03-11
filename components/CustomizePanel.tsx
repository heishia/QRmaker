"use client";

import { useRef } from "react";
import type { QROptions, ErrorCorrectionLevel, QRSize } from "./types";

interface CustomizePanelProps {
  options: QROptions;
  onFgColorChange: (v: string) => void;
  onBgColorChange: (v: string) => void;
  onSizeChange: (v: QRSize) => void;
  onLevelChange: (v: ErrorCorrectionLevel) => void;
  onLogoChange: (v: string | null) => void;
}

const SIZE_OPTIONS: { label: string; value: QRSize }[] = [
  { label: "소 (128px)", value: 128 },
  { label: "중 (256px)", value: 256 },
  { label: "대 (512px)", value: 512 },
];

const LEVEL_OPTIONS: { label: string; value: ErrorCorrectionLevel; desc: string }[] = [
  { label: "L", value: "L", desc: "낮음 (7%)" },
  { label: "M", value: "M", desc: "보통 (15%)" },
  { label: "Q", value: "Q", desc: "높음 (25%)" },
  { label: "H", value: "H", desc: "최고 (30%)" },
];

export default function CustomizePanel({
  options,
  onFgColorChange,
  onBgColorChange,
  onSizeChange,
  onLevelChange,
  onLogoChange,
}: CustomizePanelProps) {
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      onLogoChange(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleLogoRemove = () => {
    onLogoChange(null);
    if (logoInputRef.current) logoInputRef.current.value = "";
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">
      <h2 className="text-sm font-semibold text-slate-700 tracking-wide uppercase">
        커스터마이징
      </h2>

      {/* 색상 설정 */}
      <div className="space-y-4">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">색상</p>

        <div className="flex items-center justify-between">
          <label className="text-sm text-slate-600">QR 색상</label>
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg border border-slate-200 shadow-sm overflow-hidden cursor-pointer"
              style={{ backgroundColor: options.fgColor }}
            >
              <input
                type="color"
                value={options.fgColor}
                onChange={(e) => onFgColorChange(e.target.value)}
                className="opacity-0 w-full h-full cursor-pointer"
              />
            </div>
            <span className="text-xs text-slate-400 font-mono w-16">{options.fgColor}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm text-slate-600">배경 색상</label>
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg border border-slate-200 shadow-sm overflow-hidden cursor-pointer"
              style={{ backgroundColor: options.bgColor }}
            >
              <input
                type="color"
                value={options.bgColor}
                onChange={(e) => onBgColorChange(e.target.value)}
                className="opacity-0 w-full h-full cursor-pointer"
              />
            </div>
            <span className="text-xs text-slate-400 font-mono w-16">{options.bgColor}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100" />

      {/* 크기 설정 */}
      <div className="space-y-3">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">크기</p>
        <div className="grid grid-cols-3 gap-2">
          {SIZE_OPTIONS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => onSizeChange(value)}
              className={`py-2 px-3 rounded-lg text-xs font-medium border transition ${
                options.size === value
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-100" />

      {/* 오류 보정 레벨 */}
      <div className="space-y-3">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
          오류 보정 레벨
        </p>
        <div className="grid grid-cols-4 gap-2">
          {LEVEL_OPTIONS.map(({ label, value, desc }) => (
            <button
              key={value}
              onClick={() => onLevelChange(value)}
              title={desc}
              className={`py-2 rounded-lg text-xs font-semibold border transition ${
                options.level === value
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-400">
          높을수록 QR 코드 일부가 가려져도 인식됩니다. 로고 삽입 시 H 권장.
        </p>
      </div>

      <div className="border-t border-slate-100" />

      {/* 로고 업로드 */}
      <div className="space-y-3">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
          중앙 로고 삽입
        </p>

        {options.logoSrc ? (
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={options.logoSrc}
              alt="로고 미리보기"
              className="w-12 h-12 rounded-lg object-contain border border-slate-200 bg-slate-50"
            />
            <div className="flex-1">
              <p className="text-xs text-slate-600">로고가 설정되었습니다</p>
              <button
                onClick={handleLogoRemove}
                className="text-xs text-red-500 hover:text-red-700 mt-1 transition"
              >
                제거
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => logoInputRef.current?.click()}
            className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-sm text-slate-400 hover:border-indigo-300 hover:text-indigo-500 transition"
          >
            + 이미지 업로드 (PNG, JPG, SVG)
          </button>
        )}

        <input
          ref={logoInputRef}
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          className="hidden"
        />
      </div>
    </div>
  );
}
