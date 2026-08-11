import {
  ShieldCheck,
  MousePointerClick,
  GraduationCap,
} from "lucide-react";

export default function PricingGuarantee() {
  const items = [
    {
      icon: MousePointerClick,
      number: "01",
      title: "Tinggal Klik, AI yang Kerjakan",
      desc: "Tidak perlu paham istilah rumit atau belajar prompt. Pilih kebutuhanmu, isi informasi sederhana, lalu klik Generate.",
    },
    {
      icon: GraduationCap,
      number: "02",
      title: "Dibimbing dari Nol",
      desc: "Mulai dari mencari ide, membuat produk digital, menyiapkan konten promosi, sampai memahami langkah berikutnya.",
    },
    {
      icon: ShieldCheck,
      number: "03",
      title: "Lebih Percaya Diri",
      desc: "Semua dibuat sederhana agar kamu bisa mengikuti proses langkah demi langkah tanpa merasa harus jago teknologi.",
    },
  ];

  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#090909] py-16 sm:py-24 lg:py-28">
      {/* BACKGROUND GLOW */}

      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-yellow-400/[0.04] blur-[120px]" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* ========================================= */}
        {/* HEADER */}
        {/* ========================================= */}

        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-yellow-400/20 bg-yellow-400/[0.05] px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-yellow-400 sm:px-4 sm:text-xs">
            ✨ Dibuat untuk Pemula
          </span>

          <h2 className="mt-5 text-[30px] font-black leading-[1.06] tracking-[-0.03em] text-white sm:mt-7 sm:text-4xl md:text-6xl">
            Nggak Jago Teknologi?
            <br />

            <span className="text-yellow-400">
              Justru Kamu yang Cocok.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[13px] leading-6 text-gray-500 sm:mt-6 sm:text-base sm:leading-8">
            Tidak perlu paham coding, tidak perlu jago AI, dan tidak perlu
            bingung harus mulai dari mana. Rife membantu kamu membangun bisnis
            digital langkah demi langkah.
          </p>
        </div>

        {/* ========================================= */}
        {/* BENEFITS */}
        {/* ========================================= */}

        <div className="mx-auto mt-10 max-w-5xl sm:mt-14">
          <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
            {items.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.number}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101010] p-5 transition duration-300 hover:border-yellow-400/20 hover:bg-[#131313] sm:rounded-3xl sm:p-7"
                >
                  {/* NUMBER */}

                  <span className="absolute right-5 top-4 text-4xl font-black tracking-[-0.05em] text-white/[0.035] sm:right-6 sm:top-5 sm:text-5xl">
                    {item.number}
                  </span>

                  {/* ICON */}

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400 transition duration-300 group-hover:bg-yellow-400 group-hover:text-black sm:h-12 sm:w-12">
                    <Icon
                      size={20}
                      strokeWidth={2.2}
                    />
                  </div>

                  {/* TITLE */}

                  <h3 className="mt-5 max-w-[90%] text-[16px] font-black leading-snug tracking-tight text-white sm:text-lg">
                    {item.title}
                  </h3>

                  {/* DESCRIPTION */}

                  <p className="mt-3 text-[11px] leading-5 text-gray-600 sm:text-sm sm:leading-6">
                    {item.desc}
                  </p>

                  {/* FOOTER */}

                  <div className="mt-5 flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-yellow-400" />

                    <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-gray-600 sm:text-[10px]">
                      Cocok untuk pemula
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================= */}
        {/* BOTTOM MESSAGE */}
        {/* ========================================= */}

        <div className="mx-auto mt-10 max-w-4xl sm:mt-14">
          <div className="relative overflow-hidden rounded-2xl border border-yellow-400/15 bg-gradient-to-br from-yellow-400/[0.07] via-[#111111] to-[#0d0d0d] px-5 py-6 text-center sm:rounded-3xl sm:px-10 sm:py-8">
            {/* GLOW */}

            <div className="pointer-events-none absolute left-1/2 top-0 h-28 w-60 -translate-x-1/2 rounded-full bg-yellow-400/10 blur-[70px]" />

            <div className="relative">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400/10 text-lg sm:h-11 sm:w-11">
                💛
              </div>

              <p className="mt-4 text-sm font-bold leading-6 text-white sm:text-lg">
                "Saya nggak ngerti AI dan nggak tahu harus mulai dari mana."
              </p>

              <p className="mx-auto mt-3 max-w-2xl text-[11px] leading-6 text-gray-600 sm:text-sm sm:leading-7">
                Justru itu alasan Rife Digital AI dibuat.
                <span className="font-semibold text-yellow-400">
                  {" "}
                  Kamu cukup ceritakan apa yang ingin kamu lakukan,
                </span>{" "}
                lalu biarkan AI membantu menyusun langkahnya.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}