export type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";
export type QRSize = 128 | 256 | 512;

export interface QROptions {
  url: string;
  fgColor: string;
  bgColor: string;
  size: QRSize;
  level: ErrorCorrectionLevel;
  logoSrc: string | null;
}
