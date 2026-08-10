import { useState } from "react";
import { Check, X, Crown, Copy, MessageCircle, X as CloseIcon } from "lucide-react";
import { plans } from "./pricingData";
import { supabase } from "../../lib/supabase";

export default function PricingCard() {
  const [loading, setLoading] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<"BASIC" | "PRO" | null>(
    null
  );

  const SEABANK_NAME = "SeaBank";
  const SEABANK_ACCOUNT_NUMBER = "901871520642";
  const SEABANK_ACCOUNT_NAME = "Muhammad Rifqi Putra Aulia Rahman";

  const WHATSAPP_NUMBER = "6282335952469";

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

      setSelectedPlan(plan);
    } catch (err: any) {
      alert(err?.message || "Terjadi kesalahan.");
    } finally {
      setLoading("");
    }
  }

  async function handleWhatsApp() {
    if (!selectedPlan) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const planName = selectedPlan === "BASIC" ? "Basic" : "Pro";
    const price = selectedPlan === "BASIC" ? 49000 : 99000;

    const message =
      `Kak saya upgrade ${planName} di Rife AI\n\n` +
      `Paket: ${planName}\n` +
      `Harga: Rp${price.toLocaleString("id-ID")}/bulan\n` +
      `Email: ${user?.email || "-"}\n\n` +
      `Saya sudah transfer pembayaran melalui SeaBank. ` +
      `Saya kirim bukti transfer di chat ini.`;

    const whatsappUrl =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.location.href = whatsappUrl;
  }

  function copyAccountNumber() {
    navigator.clipboard.writeText(SEABANK_ACCOUNT_NUMBER);

    alert("Nomor rekening berhasil disalin.");
  }

  return (
    <>
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
            {/* HEADER */}
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

            {/* PRICE */}
            <div className="mt-8">
              <h2 className="text-5xl font-black tracking-tight text-yellow-400">
                {plan.price}
              </h2>

              {plan.monthly && (
                <p className="mt-2 text-gray-400">
                  {plan.monthly}
                </p>
              )}
            </div>

            {/* FEATURES */}
            <div className="mt-8 space-y-4">
              {plan.features.map((item) => (
                <div key={item} className="flex gap-3">
                  <Check
                    size={18}
                    className="mt-1 shrink-0 text-green-400"
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
                    className="mt-1 shrink-0 text-red-400"
                  />

                  <span className="text-gray-500 line-through">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* TARGET USER */}
            {plan.featured && (
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
                <h4 className="mb-3 font-bold text-white">
                  ❤️ Cocok Untuk
                </h4>

                <div className="grid grid-cols-2 gap-2 text-sm text-gray-400">
                  <span>✓ Pengangguran</span>
                  <span>✓ Karyawan</span>
                  <span>✓ Mahasiswa</span>
                  <span>✓ Ibu Rumah Tangga</span>
                  <span>✓ UMKM</span>
                  <span>✓ Affiliate</span>
                  <span>✓ Content Creator</span>
                  <span>✓ Pebisnis Digital</span>
                </div>
              </div>
            )}

            {/* BUTTON */}
            {plan.value === "" ? (
              <button
                type="button"
                className="mt-10 w-full rounded-2xl border border-white/10 py-4 font-bold text-white transition hover:bg-white/10"
              >
                {plan.button}
              </button>
            ) : (
              <button
                type="button"
                onClick={() =>
                  handleUpgrade(plan.value as "BASIC" | "PRO")
                }
                disabled={loading === plan.value}
                className={`mt-10 w-full rounded-2xl py-5 text-lg font-black transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70 ${
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

            {/* PAYMENT NOTE */}
            {plan.featured && (
              <div className="mt-6 rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-4 text-center">
                <p className="text-sm text-gray-400">
                  💛 Pembayaran melalui transfer SeaBank
                </p>

                <p className="mt-2 text-xs text-gray-500">
                  Setelah transfer, kirim bukti pembayaran melalui WhatsApp.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* PAYMENT MODAL */}
      {selectedPlan && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl border border-yellow-400/20 bg-[#111111] p-6 shadow-2xl">
            {/* CLOSE */}
            <button
              type="button"
              onClick={() => setSelectedPlan(null)}
              className="absolute right-5 top-5 rounded-full p-2 text-gray-400 transition hover:bg-white/10 hover:text-white"
            >
              <CloseIcon size={22} />
            </button>

            {/* TITLE */}
            <div className="pr-10">
              <p className="text-sm font-bold uppercase tracking-wider text-yellow-400">
                Upgrade Rife Digital AI
              </p>

              <h2 className="mt-2 text-3xl font-black text-white">
                Paket {selectedPlan === "BASIC" ? "Basic" : "Pro"}
              </h2>

              <p className="mt-2 text-gray-400">
                Selesaikan pembayaran melalui transfer SeaBank.
              </p>
            </div>

            {/* PRICE */}
            <div className="mt-6 rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-5 text-center">
              <p className="text-sm text-gray-400">
                Total pembayaran
              </p>

              <p className="mt-1 text-4xl font-black text-yellow-400">
                Rp
                {(
                  selectedPlan === "BASIC" ? 49000 : 99000
                ).toLocaleString("id-ID")}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                /bulan
              </p>
            </div>

            {/* BANK INFO */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-bold text-gray-400">
                Transfer ke rekening
              </p>

              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  Bank
                </p>

                <p className="font-bold text-white">
                  {SEABANK_NAME}
                </p>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  Nomor Rekening
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <p className="flex-1 break-all text-xl font-black tracking-wide text-yellow-400">
                    {SEABANK_ACCOUNT_NUMBER}
                  </p>

                  <button
                    type="button"
                    onClick={copyAccountNumber}
                    className="rounded-xl border border-white/10 p-3 text-gray-300 transition hover:bg-white/10 hover:text-white"
                    title="Salin nomor rekening"
                  >
                    <Copy size={18} />
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  Atas Nama
                </p>

                <p className="font-bold text-white">
                  {SEABANK_ACCOUNT_NAME}
                </p>
              </div>
            </div>

            {/* INSTRUCTION */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="font-bold text-white">
                📌 Setelah transfer
              </p>

              <ol className="mt-3 space-y-2 text-sm text-gray-400">
                <li>1. Simpan screenshot bukti transfer.</li>
                <li>2. Klik tombol WhatsApp di bawah.</li>
                <li>3. Pesan upgrade akan otomatis terisi.</li>
                <li>4. Kirim pesan beserta bukti transfer.</li>
              </ol>
            </div>

            {/* WHATSAPP */}
            <button
              type="button"
              onClick={handleWhatsApp}
              className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-green-500 py-4 font-black text-white transition hover:bg-green-400 hover:scale-[1.01]"
            >
              <MessageCircle size={22} />
              Saya Sudah Transfer — WhatsApp
            </button>

            <button
              type="button"
              onClick={() => setSelectedPlan(null)}
              className="mt-3 w-full rounded-2xl border border-white/10 py-3 font-bold text-gray-400 transition hover:bg-white/5 hover:text-white"
            >
              Kembali
            </button>

            <p className="mt-5 text-center text-xs text-gray-600">
              Paket akan diaktifkan setelah pembayaran diverifikasi.
            </p>
          </div>
        </div>
      )}
    </>
  );
}