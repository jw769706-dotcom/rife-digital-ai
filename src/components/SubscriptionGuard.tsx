import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Lock, Crown } from "lucide-react";
import { getPlan } from "../lib/subscriptions";

type Plan = "FREE" | "BASIC" | "PRO";

type Props = {
  children: ReactNode;
  required: Plan;
};

export default function SubscriptionGuard({
  children,
  required,
}: Props) {
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

  function handleUpgrade() {
    window.location.href = "/pricing";
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
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

  if (allowed) {
    return <>{children}</>;
  }

  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-yellow-400/20 bg-[#111111] p-10 text-center shadow-xl">

      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-yellow-400 text-black">
        <Lock size={36} />
      </div>

      <h2 className="mt-6 text-3xl font-black text-white">
        🔒 Fitur Premium
      </h2>

      <p className="mt-4 text-lg leading-8 text-gray-300">
        Fitur ini hanya tersedia untuk pengguna
        <span className="font-bold text-yellow-400">
          {" "}paket {required}
        </span>.
      </p>

      <div className="mt-8 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-6">

        <h3 className="flex items-center justify-center gap-2 text-xl font-bold text-yellow-400">
          <Crown size={22} />
          Yang akan kamu dapatkan
        </h3>

        <div className="mt-5 space-y-3 text-left text-gray-300">

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

      <button
        onClick={handleUpgrade}
        className="mt-8 w-full rounded-2xl bg-yellow-400 py-4 text-lg font-black text-black transition hover:bg-yellow-300"
      >
        🚀 Lihat Paket Premium
      </button>

      <p className="mt-5 text-sm text-gray-500">
        Upgrade hanya membutuhkan beberapa menit dan semua fitur langsung terbuka setelah pembayaran berhasil.
      </p>

    </div>
  );
}