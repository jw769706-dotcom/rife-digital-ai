import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Lock, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getPlan } from "../lib/subscriptions";
import DashboardLayout from "./layout/DashboardLayout";

type Plan = "FREE" | "BASIC" | "PRO";

type Props = {
  children: ReactNode;
  required: Plan;
};

export default function SubscriptionGuard({
  children,
  required,
}: Props) {
  const navigate = useNavigate();

  const [plan, setPlan] = useState<Plan>("FREE");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlan();
  }, []);

  async function loadPlan() {
    const userPlan = await getPlan();

    setPlan(userPlan);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-[#080808] text-white">
        <p className="text-gray-400">Memuat...</p>
      </div>
    );
  }

  const allowed =
    required === "FREE"
      ? true
      : required === "BASIC"
      ? plan === "BASIC" || plan === "PRO"
      : plan === "PRO";

  /*
   * USER SUDAH MEMILIKI AKSES
   */
  if (allowed) {
    return <>{children}</>;
  }

  /*
   * USER BELUM MEMILIKI AKSES
   *
   * Tetap gunakan DashboardLayout supaya:
   * - hamburger tetap muncul di HP
   * - topbar tetap muncul
   * - sidebar tetap bisa dibuka
   * - halaman tetap full dark
   */
  return (
    <DashboardLayout>
      <div className="min-h-[calc(100vh-80px)] w-full bg-[#080808] px-4 py-6 text-white sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-center">
          <div className="w-full rounded-3xl border border-yellow-400/20 bg-[#111111] p-6 text-center shadow-2xl sm:p-8 lg:p-10">

            {/* LOCK ICON */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400 text-black shadow-lg shadow-yellow-400/20 sm:h-20 sm:w-20">
              <Lock size={32} strokeWidth={2.5} />
            </div>

            {/* TITLE */}
            <h2 className="mt-6 text-2xl font-black text-white sm:text-3xl">
              🔒 Fitur Premium
            </h2>

            {/* DESCRIPTION */}
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-300 sm:text-base">
              Fitur ini hanya tersedia untuk pengguna{" "}
              <span className="font-bold text-yellow-400">
                paket {required}
              </span>
              .
            </p>

            {/* BENEFITS */}
            <div className="mt-7 rounded-2xl border border-yellow-400/20 bg-yellow-400/[0.07] p-5 text-left sm:p-6">

              <div className="flex items-center justify-center gap-2 text-center">
                <Crown
                  size={22}
                  className="shrink-0 text-yellow-400"
                />

                <h3 className="text-lg font-bold text-yellow-400 sm:text-xl">
                  Yang akan kamu dapatkan
                </h3>
              </div>

              <div className="mt-5 space-y-3 text-sm text-gray-300 sm:text-base">
                <p>✅ Generate AI tanpa batas</p>
                <p>✅ AI Writer Premium</p>
                <p>✅ AI Produk Digital</p>
                <p>✅ AI Marketing</p>
                <p>✅ AI Landing Page</p>
                <p>✅ AI Content Creator</p>
                <p>✅ Semua hasil tersimpan otomatis</p>
                <p>✅ Semua update AI terbaru</p>
              </div>
            </div>

            {/* UPGRADE BUTTON */}
            <button
              type="button"
              onClick={() => navigate("/pricing")}
              className="mt-7 w-full rounded-2xl bg-yellow-400 px-5 py-4 text-base font-black text-black transition hover:bg-yellow-300 active:scale-[0.99] sm:text-lg"
            >
              🚀 Lihat Paket Premium
            </button>

            {/* FOOTER TEXT */}
            <p className="mx-auto mt-5 max-w-lg text-xs leading-6 text-gray-500 sm:text-sm">
              Upgrade hanya membutuhkan beberapa menit dan semua fitur
              langsung terbuka setelah pembayaran berhasil.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}