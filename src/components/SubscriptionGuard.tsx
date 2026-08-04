import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import {
  getPlan,
  upgradeToBasic,
} from "../lib/subscriptions";

type Props = {
  children: ReactNode;
  required: "FREE" | "BASIC" | "PRO";
};

export default function SubscriptionGuard({
  children,
  required,
}: Props) {
  const [plan, setPlan] = useState<"FREE" | "BASIC" | "PRO">("FREE");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlan();
  }, []);

  async function loadPlan() {
    const userPlan = await getPlan();
    setPlan(userPlan as "FREE" | "BASIC" | "PRO");
    setLoading(false);
  }

  async function handleUpgrade() {
    await upgradeToBasic();

    alert("Paket berhasil diupgrade ke BASIC");

    await loadPlan();

    window.location.reload();
  }

  if (loading) {
    return (
      <div className="p-10 text-center text-white">
        Loading...
      </div>
    );
  }

  if (required === "FREE") {
    return <>{children}</>;
  }

  if (required === "BASIC") {
    if (plan === "BASIC" || plan === "PRO") {
      return <>{children}</>;
    }
  }

  if (required === "PRO") {
    if (plan === "PRO") {
      return <>{children}</>;
    }
  }

  return (
    <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-10 text-center">
      <h2 className="text-3xl font-bold text-white">
        Upgrade Dibutuhkan
      </h2>

      <p className="mt-4 text-gray-300">
        Fitur ini hanya tersedia untuk paket{" "}
        <span className="font-bold text-yellow-400">
          {required}
        </span>
      </p>

      <button
        onClick={handleUpgrade}
        className="mt-8 rounded-2xl bg-yellow-400 px-8 py-4 font-bold text-black"
      >
        Upgrade Sekarang
      </button>
    </div>
  );
}