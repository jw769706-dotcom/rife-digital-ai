import type { ReactNode } from "react";

import Sidebar from "./Sidebar";

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export default function DashboardLayout({
  title,
  subtitle,
  children,
}: Props) {
  return (
    <div className="flex min-h-screen bg-[#090909] text-white">
      {/* SIDEBAR UTAMA */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="min-w-0 flex-1">
        {/* HEADER */}
        <header className="border-b border-white/10 bg-[#090909]">
          <div className="flex items-center justify-between px-8 py-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-yellow-400">
                RIFE DIGITAL AI
              </p>

              <h1 className="mt-1 text-3xl font-black text-white">
                {title}
              </h1>

              {subtitle && (
                <p className="mt-2 max-w-3xl text-sm text-gray-500">
                  {subtitle}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden rounded-xl border border-white/10 bg-[#111111] px-4 py-2 text-xs text-gray-400 md:block">
                AI Workspace
              </div>

              <button
                onClick={() => {
                  window.location.href = "/pricing";
                }}
                className="rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-yellow-300"
              >
                Upgrade
              </button>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="p-8">
          <div className="mx-auto w-full max-w-[1400px]">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}