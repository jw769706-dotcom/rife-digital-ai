import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function PricingCTA() {
  const stats = [
    {
      value: "50+",
      label: "AI Tools",
    },
    {
      value: "∞",
      label: "Generate",
    },
    {
      value: "24/7",
      label: "AI Support",
    },
  ];

  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#090909] py-16 sm:py-24 lg:py-28">
      {/* BACKGROUND */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-150px] h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-yellow-400/[0.07] blur-[130px] sm:h-[600px] sm:w-[600px] sm:blur-[180px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-5 sm:px-6">

        {/* CTA CARD */}

        <div className="relative overflow-hidden rounded-[28px] border border-yellow-400/20 bg-gradient-to-br from-yellow-400/[0.08] via-[#111111] to-[#0b0b0b] px-5 py-9 text-center shadow-[0_30px_100px_rgba(0,0,0,.35)] sm:rounded-[36px] sm:px-10 sm:py-14 lg:px-16 lg:py-16">

          {/* INNER GLOW */}

          <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-72 -translate-x-1/2 rounded-full bg-yellow-400/10 blur-[80px]" />

          <div className="relative">

            {/* ICON */}

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-black shadow-lg shadow-yellow-400/10 sm:h-16 sm:w-16 sm:rounded-2xl">
              <Sparkles
                size={22}
                strokeWidth={2.5}
                className="sm:h-7 sm:w-7"
              />
            </div>

            {/* EYEBROW */}

            <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.2em] text-yellow-400 sm:mt-6 sm:text-xs">
              Mulai Membangun dengan AI
            </p>

            {/* HEADING */}

            <h2 className="mx-auto mt-4 max-w-3xl text-[30px] font-black leading-[1.05] tracking-[-0.04em] text-white sm:mt-5 sm:text-4xl md:text-5xl lg:text-6xl">
              Siap Membangun
              <br />

              <span className="text-yellow-400">
                Bisnis Digital?
              </span>
            </h2>

            {/* DESCRIPTION */}

            <p className="mx-auto mt-5 max-w-2xl text-[12px] leading-6 text-gray-500 sm:mt-6 sm:text-base sm:leading-8">
              Tidak perlu jago AI, tidak perlu jago menulis, dan tidak perlu
              belajar prompt. Cukup pilih kebutuhanmu, isi informasi
              sederhana, lalu biarkan Rife membantu mengerjakannya.
            </p>

            {/* STEPS */}

            <div className="mx-auto mt-7 flex max-w-xl flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[9px] font-bold uppercase tracking-[0.12em] text-gray-600 sm:mt-8 sm:gap-x-6 sm:text-[10px]">
              <span>✓ Pilih Tools</span>
              <span>✓ Isi Form</span>
              <span>✓ Generate</span>
            </div>

            {/* BUTTONS */}

            <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">

              <Link
                to="/login"
                className="group inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-2xl bg-yellow-400 px-7 py-3.5 text-sm font-black text-black shadow-lg shadow-yellow-400/10 transition duration-300 hover:-translate-y-0.5 hover:bg-yellow-300 hover:shadow-xl hover:shadow-yellow-400/20 sm:min-h-[56px] sm:px-8 sm:text-base"
              >
                🚀 Mulai Sekarang

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/pricing"
                className="inline-flex min-h-[52px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-7 py-3.5 text-sm font-bold text-white transition duration-300 hover:border-white/20 hover:bg-white/[0.07] sm:min-h-[56px] sm:px-8 sm:text-base"
              >
                Lihat Paket
              </Link>
            </div>

            {/* STATS */}

            <div className="mx-auto mt-9 grid max-w-2xl grid-cols-3 overflow-hidden rounded-2xl border border-white/[0.07] bg-black/20 sm:mt-12">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`flex min-h-[76px] flex-col items-center justify-center px-2 py-4 sm:min-h-[90px] ${
                    index !== stats.length - 1
                      ? "border-r border-white/[0.07]"
                      : ""
                  }`}
                >
                  <p className="text-lg font-black tracking-tight text-yellow-400 sm:text-2xl">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.14em] text-gray-600 sm:text-[10px]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* SMALL NOTE */}

            <p className="mt-6 text-[9px] leading-5 text-gray-700 sm:text-xs">
              Bangun lebih cepat. Kerjakan lebih banyak. Fokus pada bisnismu.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}