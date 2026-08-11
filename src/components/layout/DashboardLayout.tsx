import type { ReactNode } from "react";
import { useState } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export default function DashboardLayout({
  children,
  title = "Dashboard",
  subtitle = "Selamat datang kembali 👋",
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#070707] text-white">
      {/* =========================
          BACKGROUND
      ========================== */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Gold glow */}
        <div className="absolute left-[45%] top-[-300px] h-[600px] w-[600px] rounded-full bg-yellow-400/[0.035] blur-[160px]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.35) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      {/* =========================
          MOBILE OVERLAY
      ========================== */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Tutup menu"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/75 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* =========================
          SIDEBAR
      ========================== */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          w-[270px]
          transform
          transition-transform
          duration-300
          ease-out
          lg:w-[280px]
          lg:translate-x-0
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <Sidebar />
      </aside>

      {/* =========================
          MAIN AREA
      ========================== */}
      <div className="min-h-screen lg:pl-[280px]">
        {/* TOPBAR */}
        <Topbar
          title={title}
          subtitle={subtitle}
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* CONTENT AREA */}
        <main className="relative w-full">
          <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 xl:px-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}