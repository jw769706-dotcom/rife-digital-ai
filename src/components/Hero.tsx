import { Link } from "react-router-dom";

export default function Hero() {
  const benefits = [
    {
      title: "Gak Perlu Jago Teknologi",
      text: "AI menjelaskan semuanya dengan bahasa sederhana.",
    },
    {
      title: "Mulai dari Nol",
      text: "Dibimbing langkah demi langkah sampai paham.",
    },
    {
      title: "Tinggal Tanya AI",
      text: "Bingung kapan pun? Langsung tanyakan ke AI.",
    },
  ];

  const stats = [
    ["50+", "AI Tools"],
    ["24/7", "AI Siap Bantu"],
    ["0", "Coding"],
  ];

  return (
    <section className="relative overflow-hidden bg-[#090909] text-white">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-180px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-yellow-500/10 blur-[120px] sm:h-[600px] sm:w-[600px] sm:blur-[160px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* HERO CONTENT */}
      <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-32 sm:px-6 sm:pb-20 sm:pt-36 lg:px-8 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">

          {/* LEFT */}
          <div className="min-w-0">

            {/* BADGE */}
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/25 bg-yellow-400/[0.06] px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-yellow-400 sm:px-4 sm:text-xs">
              <span>🚀</span>
              <span>AI Workspace untuk Pemula</span>
            </div>

            {/* TITLE */}
            <h1 className="mt-6 max-w-[620px] text-[38px] font-black leading-[1.03] tracking-[-0.04em] sm:mt-8 sm:text-5xl md:text-6xl lg:text-7xl">
              Mulai Bisnis Digital
              <br />

              <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                dari Nol.
              </span>

              <br />

              Biar AI yang Bantu.
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-6 max-w-xl text-[14px] leading-7 text-gray-400 sm:mt-7 sm:text-lg sm:leading-8">
              Bingung mau mulai dari mana? Rife Digital AI membantu kamu
              menemukan ide produk, membuat konten, dan membangun strategi
              marketing — tanpa harus jago teknologi.
            </p>

            {/* CTA */}
            <div className="mt-7 grid gap-3 sm:mt-9 sm:flex sm:gap-3">
              <Link
                to="/pricing"
                className="
                  flex min-h-[56px] items-center justify-center
                  rounded-2xl bg-yellow-400 px-6
                  text-sm font-black text-black
                  shadow-[0_10px_35px_rgba(234,179,8,0.18)]
                  transition
                  hover:bg-yellow-300
                  sm:px-8 sm:text-base
                "
              >
                🚀 Mulai Bangun Bisnis
              </Link>

              <Link
                to="/pricing"
                className="
                  flex min-h-[56px] items-center justify-center
                  rounded-2xl border border-white/10
                  bg-white/[0.03] px-6
                  text-sm font-bold text-white
                  transition
                  hover:border-yellow-400/30
                  hover:bg-white/[0.06]
                  sm:px-8 sm:text-base
                "
              >
                ▶ Lihat Cara Kerja
              </Link>
            </div>

            {/* STATS */}
            <div className="mt-8 grid grid-cols-3 gap-2 sm:mt-10 sm:max-w-xl sm:gap-3">
              {stats.map(([number, label]) => (
                <div
                  key={label}
                  className="
                    rounded-2xl
                    border border-white/[0.07]
                    bg-white/[0.025]
                    px-2 py-3.5
                    text-center
                    sm:px-3 sm:py-4
                  "
                >
                  <p className="text-sm font-black text-yellow-400 sm:text-base">
                    {number}
                  </p>

                  <p className="mt-1 text-[9px] leading-4 text-gray-500 sm:text-xs">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* BENEFITS */}
            <div className="mt-8 border-t border-white/[0.07] pt-7 sm:mt-10 sm:pt-8">
              <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-gray-600">
                Kenapa Rife?
              </p>

              <div className="mt-5 space-y-4">
                {benefits.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-yellow-400/10 text-[10px] text-yellow-400">
                      ✓
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-[13px] font-bold text-white sm:text-sm">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-[11px] leading-5 text-gray-500 sm:text-xs">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* DESKTOP PREVIEW */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 rounded-[40px] bg-yellow-500/15 blur-[80px]" />

            <div className="relative mx-auto max-w-[620px] overflow-hidden rounded-[30px] border border-white/10 bg-[#111111] shadow-2xl">

              {/* TOP BAR */}
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">
                    AI Workspace
                  </span>

                  <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-bold text-yellow-400">
                    Rife Digital AI
                  </span>
                </div>
              </div>

              {/* PREVIEW */}
              <div className="p-7">

                {/* AI ASSISTANT */}
                <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/[0.05] p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400 text-lg">
                      ✨
                    </div>

                    <div>
                      <p className="text-sm font-bold text-yellow-400">
                        AI Assistant
                      </p>

                      <p className="mt-0.5 text-xs text-gray-500">
                        Siap membantu kamu
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl bg-[#090909] p-4">
                    <p className="text-xs leading-6 text-gray-400">
                      "Saya pemula dan ingin menjual produk digital.
                      Tolong bantu saya mulai dari nol."
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[10px] text-gray-600">
                      AI sedang memahami kebutuhanmu...
                    </span>

                    <span className="text-xs text-green-400">
                      ● Online
                    </span>
                  </div>
                </div>

                {/* TOOLS */}
                <div className="mt-6">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs font-bold text-white">
                      Yang bisa AI bantu
                    </p>

                    <span className="text-[10px] text-yellow-400">
                      50+ tools
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      ["💡", "Ide Produk"],
                      ["✍️", "Copywriting"],
                      ["🎬", "Konten"],
                      ["📈", "Marketing"],
                    ].map(([icon, title]) => (
                      <div
                        key={title}
                        className="rounded-xl border border-white/10 bg-white/[0.025] p-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5">
                            {icon}
                          </div>

                          <p className="text-xs font-bold text-white">
                            {title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RESULT */}
                <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">
                        Rekomendasi AI
                      </p>

                      <p className="mt-1 text-[10px] text-gray-500">
                        Berdasarkan kebutuhanmu
                      </p>
                    </div>

                    <span className="rounded-full bg-green-500/10 px-2.5 py-1 text-[10px] font-bold text-green-400">
                      ✓ Selesai
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-3 rounded-xl bg-[#090909] p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10">
                      📚
                    </div>

                    <div>
                      <p className="text-sm font-bold text-white">
                        Digital Planner Pemula
                      </p>

                      <p className="mt-1 text-[10px] text-gray-500">
                        Cocok untuk mahasiswa & freelancer
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}