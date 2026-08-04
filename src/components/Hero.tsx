export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#090909]">
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-yellow-500/10 blur-[180px]" />
        <div className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <span className="inline-flex rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm font-semibold text-yellow-400">
              🚀 AI Platform untuk Bisnis Digital Indonesia
            </span>

            <h1 className="mt-8 text-5xl font-black leading-tight text-white md:text-7xl">
              Bangun Produk Digital
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                Lebih Cepat
              </span>
              <br />
              dengan AI
            </h1>

            <p className="mt-8 max-w-2xl text-xl leading-9 text-gray-400">
              Buat produk digital, copywriting, caption, ide konten,
              landing page, dan strategi marketing dalam satu dashboard AI.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button className="rounded-2xl bg-yellow-500 px-8 py-5 font-bold text-black transition hover:scale-105">
                Mulai Trial Gratis 3 Hari
              </button>

              <button className="rounded-2xl border border-white/10 bg-white/5 px-8 py-5 font-semibold text-white">
                ▶ Lihat Demo
              </button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-5">
              {[
                ["50+", "AI Tools"],
                ["10x", "Lebih Cepat"],
                ["24/7", "AI Assistant"],
              ].map(([v, t]) => (
                <div
                  key={t}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <h3 className="text-3xl font-black text-yellow-400">{v}</h3>
                  <p className="mt-2 text-sm text-gray-400">{t}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-[36px] bg-yellow-500/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#111] shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>

                <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-yellow-400">
                  Rife Digital AI
                </span>
              </div>

              <div className="grid lg:grid-cols-[220px_1fr]">
                <aside className="border-r border-white/10 bg-[#0d0d0d] p-5">
                  {[
                    "Dashboard",
                    "AI Writer",
                    "AI Product",
                    "AI Marketing",
                    "History",
                    "Subscription",
                  ].map((m, i) => (
                    <div
                      key={m}
                      className={`mb-2 rounded-xl px-4 py-3 ${
                        i === 0
                          ? "bg-yellow-500 font-bold text-black"
                          : "text-gray-400"
                      }`}
                    >
                      {m}
                    </div>
                  ))}
                </aside>

                <main className="space-y-5 p-6">
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                    <p className="text-sm text-yellow-400">🤖 AI Assistant</p>
                    <h2 className="mt-2 text-2xl font-black text-white">
                      Apa yang ingin kamu buat?
                    </h2>

                    <div className="mt-5 rounded-xl bg-[#090909] p-4 text-gray-400">
                      Buatkan ide produk digital yang laku dijual untuk pemula...
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      "Caption Instagram",
                      "Copywriting",
                      "Script Reels",
                      "Ide Produk",
                    ].map((card) => (
                      <div
                        key={card}
                        className="rounded-2xl border border-white/10 bg-white/5 p-5"
                      >
                        <h3 className="font-bold text-white">{card}</h3>
                        <p className="mt-2 text-sm text-gray-400">
                          Dibuat otomatis oleh AI.
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white">Hasil AI</h3>
                      <span className="text-green-400">✓ Selesai</span>
                    </div>

                    <div className="mt-4 space-y-3">
                      <div className="rounded-xl bg-[#090909] p-4 text-white">
                        Digital Planner Premium
                      </div>
                      <div className="rounded-xl bg-[#090909] p-4 text-white">
                        Target: Mahasiswa & Freelancer
                      </div>
                      <div className="rounded-xl bg-[#090909] p-4 font-bold text-yellow-400">
                        Harga: Rp79.000
                      </div>
                    </div>
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