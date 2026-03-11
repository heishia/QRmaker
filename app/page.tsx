import QRGenerator from "@/components/QRGenerator";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100">
      {/* 헤더 */}
      <header className="pt-12 pb-8 text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">QRmaker</h1>
        </div>
        <p className="text-slate-500 text-sm">
          URL을 입력하면 즉시 QR 코드를 생성합니다
        </p>
      </header>

      {/* 메인 콘텐츠 */}
      <section className="pb-16 px-4">
        <QRGenerator />
      </section>

      {/* 푸터 */}
      <footer className="text-center pb-8 text-xs text-slate-400">
        © 2026 QRmaker · 무료 QR 코드 생성기
      </footer>
    </main>
  );
}
