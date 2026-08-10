import { useState } from "react";
import { Check, X, Crown } from "lucide-react";
import { plans } from "./pricingData";
import { createPayment } from "../../services/payment";
import { supabase } from "../../lib/supabase";

export default function PricingCard() {
  const [loading, setLoading] = useState("");

  async function handleUpgrade(plan: "BASIC" | "PRO") {
    try {
      setLoading(plan);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Silakan login terlebih dahulu.");
        return;
      }

      const payment = await createPayment(
  plan,
  user.id,
  user.email!
);

      window.location.href = payment.redirect_url;
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading("");
    }
  }

  return (
    <section className="bg-[#090909] py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid gap-8 lg:grid-cols-3">

          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-[32px] border p-8 transition duration-300 hover:-translate-y-2 ${
                plan.featured
                  ? "border-yellow-400 bg-gradient-to-b from-[#1b1b1b] to-[#101010] shadow-[0_0_60px_rgba(250,204,21,.18)]"
                  : "border-white/10 bg-[#111111]"
              }`}
            >

              {plan.featured && (
  <div className="absolute -top-5 left-1/2 -translate-x-1/2">
    <span className="rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 px-6 py-2 text-sm font-black text-black shadow-xl">
      🔥 Paket Favorit
    </span>
  </div>
)}

              <div className="flex items-center gap-3">

                <div
  className={`flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg ${
    plan.featured
      ? "bg-gradient-to-br from-yellow-300 to-yellow-500 text-black"
      : "bg-white/10 text-white"
  }`}
>
                  <Crown size={28} strokeWidth={2.5} />
                </div>

                <div>
                  <h3 className="text-2xl font-black text-white">
                    {plan.name}
                  </h3>

                  <p className="text-sm text-gray-400">
                    {plan.subtitle}
                  </p>
                </div>

              </div>

              <div className="mt-8">

                <h2 className="text-6xl font-black tracking-tight text-yellow-400">
                  {plan.price}
                </h2>

                {plan.monthly && (
                  <p className="mt-2 text-gray-400">
                    {plan.monthly}
                  </p>
                )}

              </div>

              <div className="mt-8 space-y-4">

                {plan.features.map((item) => (
                  <div key={item} className="flex gap-3">
                    <Check
                      size={18}
                      className="mt-1 text-green-400"
                    />
                    <span className="text-gray-300">
                      {item}
                    </span>
                  </div>
                ))}

                {plan.disabled.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 opacity-40"
                  >
                    <X
                      size={18}
                      className="mt-1 text-red-400"
                    />
                    <span className="line-through text-gray-500">
                      {item}
                    </span>
                  </div>
                ))}

              </div>

              {plan.featured && (
                <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
  <h4 className="font-bold text-white">
    ❤️ Cocok Untuk
  </h4>

  <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-300">
    <div>✔ Pengangguran</div>
    <div>✔ Karyawan</div>
    <div>✔ Mahasiswa</div>
    <div>✔ Ibu Rumah Tangga</div>
    <div>✔ UMKM</div>
    <div>✔ Affiliate</div>
    <div>✔ Content Creator</div>
    <div>✔ Pebisnis Digital</div>
  </div>
</div>
              )}

              {plan.value === "" ? (
                <button className="mt-10 w-full rounded-2xl border border-white/10 py-4 font-bold text-white hover:bg-white/10">
                  {plan.button}
                </button>
              ) : (
                <button
                  onClick={() =>
                    handleUpgrade(plan.value as "BASIC" | "PRO")
                  }
                  className={`mt-10 w-full rounded-2xl py-5 text-lg font-black transition-all duration-300 hover:scale-[1.02] ${
                    plan.featured
                      ? "bg-yellow-400 text-black hover:bg-yellow-300"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {loading === plan.value
                    ? "⏳ Memproses..."
                    : plan.button}
                </button>
              )}

              {plan.featured && (
                <div className="mt-6 rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-4 text-center">
  <p className="text-sm text-gray-300">
    💛 Kurang dari
    <span className="font-black text-yellow-400">
      {" "}harga 2 gelas kopi{" "}
    </span>
    setiap bulan.
  </p>

  <p className="mt-2 text-xs leading-6 text-gray-500">
    Tapi bisa membantumu membuat ebook,
    template Canva, produk digital,
    landing page, copywriting,
    dan konten setiap hari.
  </p>
</div>
              )}

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}