import type { ReactNode } from "react";
import Sidebar from "./Sidebar";

type DashboardLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export default function DashboardLayout({
  title,
  subtitle,
  children,
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#090909] text-white">

      {/* Sidebar */}

      <Sidebar />

      {/* Main */}

      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Header */}

        <header className="border-b border-white/10 bg-[#0D0D0D]/90 backdrop-blur-xl">

          <div className="flex items-center justify-between px-10 py-8">

            <div>

              <p className="text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
                RIFE DIGITAL AI
              </p>

              <h1 className="mt-3 text-5xl font-black text-white">
                {title}
              </h1>

              <p className="mt-3 max-w-3xl text-lg leading-8 text-gray-400">
                {subtitle}
              </p>

            </div>

            <button className="rounded-2xl bg-yellow-400 px-6 py-4 font-bold text-black transition hover:bg-yellow-300">
              Upgrade
            </button>

          </div>

        </header>

        {/* Content */}

        <main className="flex-1 overflow-y-auto">

          <div className="mx-auto w-full max-w-[1800px] p-10">

            {children}

          </div>

        </main>

      </div>

    </div>
  );
}