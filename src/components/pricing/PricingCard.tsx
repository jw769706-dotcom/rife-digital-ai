import { useState } from "react";
import {
  Check,
  X,
  Crown,
  Copy,
  MessageCircle,
  X as CloseIcon,
} from "lucide-react";

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

    // HARGA RESMI RIFE DIGITAL AI
    const price = selectedPlan === "BASIC" ? 49000 : 99000;

    const message =
      `Kak saya upgrade ${planName} di Rife Digital AI\n\n` +
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
      {/* =============================== */}
      {/* PRICING CARDS */}
      {/* =============================== */}

      <section className="bg-[#090909] px-5 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:gap-6 lg:grid-cols-3 lg:gap-7">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`
                  relative flex flex-col overflow-hidden rounded-[24px]
                  border p-5 transition duration-300
                  sm:rounded-[28px] sm:p-7
                  lg:p-8
                  ${
                    plan.featured
                      ? `
                        border-yellow-400/30
                        bg-gradient-to-b from-[#191919] via-[#111111] to-[#0d0d0d]
                        shadow-[0_20px_70px_rgba(250,204,21,.10)]
                      `
                      : `
                        border-white/[0.08]
                        bg-[#101010]
                        hover:border-white/15
                      `
                  }
                `}
              >
                {/* POPULAR BADGE */}

                {plan.featured && (
                  <div className="absolute right-4 top-4 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.14em] text-yellow-400 sm:right-6 sm:top-6 sm:text-[9px]">
                    ⭐ Paling Populer
                  </div>
                )}

                {/* HEADER */}

                <div className="flex items-center gap-3">
                  <div
                    className={`
                      flex h-12 w-12 shrink-0 items-center justify-center
                      rounded-2xl
                      sm:h-14 sm:w-14
                      ${
                        plan.featured
                          ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/10"
                          : "bg-white/[0.06] text-gray-300"
                      }
                    `}
                  >
                    <Crown
                      size={22}
                      strokeWidth={2.3}
                      className={
                        plan.featured ? "text-black" : "text-yellow-400"
                      }
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-xl font-black tracking-tight text-white sm:text-2xl">
                      {plan.name}
                    </h3>

                    <p className="mt-0.5 text-xs leading-5 text-gray-500 sm:text-sm">
                      {plan.subtitle}
                    </p>
                  </div>
                </div>

                {/* PRICE */}

                <div className="mt-7">
                  <h2 className="text-4xl font-black tracking-[-0.03em] text-yellow-400 sm:text-5xl">
                    {plan.id === "BASIC"
                      ? "Rp49K"
                      : plan.id === "PRO"
                      ? "Rp99K"
                      : plan.price}
                  </h2>

                  {plan.monthly && (
                    <p className="mt-1.5 text-xs text-gray-500 sm:text-sm">
                      {plan.monthly}
                    </p>
                  )}
                </div>

                {/* DIVIDER */}

                <div className="my-6 h-px bg-white/[0.07]" />

                {/* FEATURES */}

                <div className="space-y-3">
                  {plan.features.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2.5"
                    >
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-400/10">
                        <Check
                          size={12}
                          strokeWidth={3}
                          className="text-green-400"
                        />
                      </div>

                      <span className="text-xs leading-5 text-gray-300 sm:text-sm">
                        {item}
                      </span>
                    </div>
                  ))}

                  {plan.disabled.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2.5 opacity-35"
                    >
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/5">
                        <X
                          size={12}
                          strokeWidth={3}
                          className="text-gray-500"
                        />
                      </div>

                      <span className="text-xs leading-5 text-gray-500 line-through sm:text-sm">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* TARGET USER */}

                {plan.featured && (
                  <div className="mt-6 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 sm:mt-7 sm:p-5">
                    <h4 className="mb-3 text-sm font-bold text-white">
                      ❤️ Cocok Untuk
                    </h4>

                    <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-[11px] text-gray-500 sm:text-xs">
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

                <div className="mt-auto pt-7">
                  {plan.value === "" ? (
                    <button
                      type="button"
                      className="w-full rounded-2xl border border-white/10 py-3.5 text-sm font-bold text-white transition hover:bg-white/[0.06] sm:py-4"
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
                      className={`
                        w-full rounded-2xl py-3.5 text-sm font-black
                        transition-all duration-300
                        disabled:cursor-not-allowed disabled:opacity-70
                        sm:py-4 sm:text-base
                        ${
                          plan.featured
                            ? "bg-yellow-400 text-black hover:bg-yellow-300 hover:shadow-lg hover:shadow-yellow-400/10"
                            : "bg-white/[0.06] text-white hover:bg-white/10"
                        }
                      `}
                    >
                      {loading === plan.value
                        ? "⏳ Memproses..."
                        : plan.button}
                    </button>
                  )}
                </div>

                {/* PAYMENT NOTE */}

                {plan.featured && (
                  <div className="mt-4 rounded-2xl border border-yellow-400/10 bg-yellow-400/[0.03] px-4 py-3 text-center">
                    <p className="text-[10px] font-medium text-gray-500 sm:text-xs">
                      💛 Pembayaran melalui transfer SeaBank
                    </p>

                    <p className="mt-1 text-[9px] leading-4 text-gray-600 sm:text-[10px]">
                      Setelah transfer, kirim bukti pembayaran melalui WhatsApp.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =============================== */}
      {/* PAYMENT MODAL */}
      {/* =============================== */}

      {selectedPlan && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm sm:items-center">
          <div className="relative my-4 w-full max-w-lg rounded-[24px] border border-yellow-400/15 bg-[#111111] p-5 shadow-2xl sm:my-8 sm:rounded-3xl sm:p-6">

            {/* CLOSE */}

            <button
              type="button"
              onClick={() => setSelectedPlan(null)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-white/10 hover:text-white sm:right-5 sm:top-5"
              aria-label="Tutup"
            >
              <CloseIcon size={20} />
            </button>

            {/* TITLE */}

            <div className="pr-10">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-yellow-400 sm:text-xs">
                Upgrade Rife Digital AI
              </p>

              <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                Paket {selectedPlan === "BASIC" ? "Basic" : "Pro"}
              </h2>

              <p className="mt-2 text-xs leading-5 text-gray-500 sm:text-sm sm:leading-6">
                Selesaikan pembayaran melalui transfer SeaBank.
              </p>
            </div>

            {/* PRICE */}

            <div className="mt-5 rounded-2xl border border-yellow-400/15 bg-yellow-400/[0.04] p-5 text-center">
              <p className="text-xs text-gray-500">
                Total pembayaran
              </p>

              <p className="mt-1 text-3xl font-black text-yellow-400 sm:text-4xl">
                Rp
                {(
                  selectedPlan === "BASIC" ? 49000 : 99000
                ).toLocaleString("id-ID")}
              </p>

              <p className="mt-1 text-xs text-gray-600">
                /bulan
              </p>
            </div>

            {/* BANK INFO */}

            <div className="mt-5 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 sm:mt-6 sm:p-5">
              <p className="text-xs font-bold text-gray-400">
                Transfer ke rekening
              </p>

              <div className="mt-4">
                <p className="text-[10px] text-gray-600">
                  Bank
                </p>

                <p className="mt-1 text-sm font-bold text-white">
                  {SEABANK_NAME}
                </p>
              </div>

              <div className="mt-4">
                <p className="text-[10px] text-gray-600">
                  Nomor Rekening
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <p className="min-w-0 flex-1 break-all text-base font-black tracking-wide text-yellow-400 sm:text-xl">
                    {SEABANK_ACCOUNT_NUMBER}
                  </p>

                  <button
                    type="button"
                    onClick={copyAccountNumber}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 text-gray-400 transition hover:bg-white/10 hover:text-white"
                    title="Salin nomor rekening"
                  >
                    <Copy size={17} />
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-[10px] text-gray-600">
                  Atas Nama
                </p>

                <p className="mt-1 text-xs font-bold leading-5 text-white sm:text-sm">
                  {SEABANK_ACCOUNT_NAME}
                </p>
              </div>
            </div>

            {/* INSTRUCTION */}

            <div className="mt-5 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 sm:mt-6 sm:p-5">
              <p className="text-sm font-bold text-white">
                📌 Setelah transfer
              </p>

              <ol className="mt-3 space-y-2 text-xs leading-5 text-gray-500 sm:text-sm sm:leading-6">
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
              className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-green-500 py-3.5 text-sm font-black text-white transition hover:bg-green-400 sm:mt-6 sm:py-4 sm:text-base"
            >
              <MessageCircle size={20} />
              Saya Sudah Transfer — WhatsApp
            </button>

            {/* BACK */}

            <button
              type="button"
              onClick={() => setSelectedPlan(null)}
              className="mt-2.5 w-full rounded-2xl border border-white/10 py-3 text-sm font-bold text-gray-500 transition hover:bg-white/5 hover:text-white"
            >
              Kembali
            </button>

            <p className="mt-4 text-center text-[9px] leading-4 text-gray-700 sm:text-xs">
              Paket akan diaktifkan setelah pembayaran diverifikasi.
            </p>
          </div>
        </div>
      )}
    </>
  );
}