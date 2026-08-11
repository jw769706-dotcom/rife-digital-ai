import { Link } from "react-router-dom";

export default function Hero() {
  const tools = [
    {
      icon: "💡",
      title: "Ide Produk",
      text: "Temukan produk yang cocok",
    },
    {
      icon: "✍️",
      title: "Copywriting",
      text: "Buat kata-kata yang menjual",
    },
    {
      icon: "🎬",
      title: "Konten",
      text: "Buat konten siap posting",
    },
    {
      icon: "📈",
      title: "Marketing",
      text: "Susun strategi pemasaran",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#090909]">
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-yellow-500/10 blur-[180px]" />

        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* ================= LEFT ================= */}
          <div>
            <span className="inline-flex rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm font-semibold text-yellow-400">
              🚀 AI Workspace untuk Pemula
            </span>

            <h1 className="mt-8 text-5xl font-black leading-tight text-white md:text-7xl">
              Mulai Bisnis Digital
              <br />

              <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                dari Nol.
              </span>

              <br />

              Biar AI yang Bantu.
            </h1>

            <p className="mt-8 max-w-2xl text-xl leading-9 text-gray-400">
              Bingung mau mulai dari mana? Rife Digital AI membantu kamu
              menemukan ide produk, membuat konten, menyusun copywriting,
              hingga merancang strategi marketing — tanpa harus jago teknologi.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/pricing"
                className="rounded-2xl bg-yellow-500 px-8 py-5 text-center font-bold text-black transition hover:scale-105 hover:bg-yellow-400"
              >
                🚀 Mulai Bangun Bisnis Saya
              </Link>

              <Link
                to="/pricing"
                className="rounded-2xl border border-white/10 bg-white/5 px-8 py-5 text-center font-semibold text-white transition hover:bg-white/10"
              >
                ▶ Lihat Cara Kerjanya
              </Link>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
  {[
    [
      "Gak Perlu Jago Teknologi",
      "AI menjelaskan semuanya dengan bahasa sederhana",
    ],
    [
      "Mulai dari Nol",
      "Dibimbing langkah demi langkah sampai paham",
    ],
    [
      "Tinggal Tanya AI",
      "Bingung kapan pun? Langsung tanyakan ke AI",
    ],
  ].map(([title, description]) => (
    <div
      key={title}
      className="rounded-2xl border border-white/10 bg-white/5 p-5"
    >
      <h3 className="text-lg font-black leading-tight text-yellow-400">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-400">
        {description}
      </p>
    </div>
  ))}
</div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="relative">
            {/* GLOW */}
            <div className="absolute inset-0 rounded-[40px] bg-yellow-500/20 blur-[70px]" />

            <div className="relative mx-auto max-w-[620px] overflow-hidden rounded-[30px] border border-white/10 bg-[#111111] shadow-2xl">
              {/* TOP BAR */}
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden text-xs text-gray-500 sm:block">
                    AI Workspace
                  </span>

                  <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-bold text-yellow-400">
                    Rife Digital AI
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-[155px_1fr]">
                {/* MINI SIDEBAR */}
                <aside className="hidden border-r border-white/10 bg-[#0d0d0d] p-4 md:block">
                  <div className="mb-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">
                      Workspace
                    </p>

                    <p className="mt-1 text-sm font-bold text-white">
                      Rife Digital
                    </p>
                  </div>

                  {[
                    ["⌂", "Dashboard"],
                    ["✍", "Writer"],
                    ["▣", "Product"],
                    ["📣", "Marketing"],
                    ["◷", "History"],
                  ].map(([icon, name], index) => (
                    <div
                      key={name}
                      className={`mb-2 flex items-center gap-3 rounded-xl px-3 py-3 text-xs ${
                        index === 0
                          ? "bg-yellow-500 font-bold text-black"
                          : "text-gray-500"
                      }`}
                    >
                      <span>{icon}</span>
                      {name}
                    </div>
                  ))}
                </aside>

                {/* MAIN PREVIEW */}
                <main className="p-5 sm:p-6">
                  {/* HEADER */}
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[11px] font-medium text-gray-500">
                        GOOD MORNING 👋
                      </p>

                      <h2 className="mt-1 text-xl font-black text-white">
                        Mau mulai dari mana?
                      </h2>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                      🤖
                    </div>
                  </div>

                  {/* AI INPUT */}
                  <div className="mt-5 rounded-2xl border border-yellow-500/20 bg-yellow-500/[0.06] p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-yellow-500 text-sm">
                        ✨
                      </div>

                      <div>
                        <p className="text-xs font-bold text-yellow-400">
                          AI Assistant
                        </p>

                        <p className="text-[10px] text-gray-500">
                          Siap membantu kamu
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-xl bg-[#090909] px-4 py-3 text-xs leading-5 text-gray-400">
                      "Saya pemula dan ingin menjual produk digital.
                      Tolong bantu saya mulai dari nol."
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-[10px] text-gray-600">
                        AI sedang memahami kebutuhanmu...
                      </span>

                      <span className="text-xs text-green-400">
                        ● Online
                      </span>
                    </div>
                  </div>

                  {/* AI TOOLS */}
                  <div className="mt-5">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-xs font-bold text-white">
                        Yang bisa AI bantu
                      </p>

                      <span className="text-[10px] text-gray-600">
                        50+ tools
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {tools.map((tool) => (
                        <div
                          key={tool.title}
                          className="group rounded-xl border border-white/10 bg-white/[0.03] p-3 transition hover:border-yellow-500/30 hover:bg-yellow-500/[0.04]"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-base">
                              {tool.icon}
                            </div>

                            <div className="min-w-0">
                              <p className="text-xs font-bold text-white">
                                {tool.title}
                              </p>

                              <p className="mt-1 text-[10px] leading-4 text-gray-500">
                                {tool.text}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* RESULT */}
                  <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
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

                    <div className="mt-4 rounded-xl bg-[#090909] p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10 text-lg">
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

                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <div className="rounded-lg bg-white/[0.04] p-2.5">
                          <p className="text-[9px] text-gray-600">
                            Harga
                          </p>

                          <p className="mt-1 text-xs font-bold text-yellow-400">
                            Rp49K–79K
                          </p>
                        </div>

                        <div className="rounded-lg bg-white/[0.04] p-2.5">
                          <p className="text-[9px] text-gray-600">
                            Strategi
                          </p>

                          <p className="mt-1 text-xs font-bold text-white">
                            Konten Organik
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* BOTTOM STATUS */}
                  <div className="mt-4 flex items-center justify-between rounded-xl border border-white/5 bg-black/30 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-400" />

                      <span className="text-[10px] text-gray-500">
                        Semua sistem berjalan normal
                      </span>
                    </div>

                    <span className="text-[10px] font-semibold text-yellow-400">
                      Rife AI
                    </span>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}