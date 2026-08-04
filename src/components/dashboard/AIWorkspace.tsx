export default function AIWorkspace() {
  return (
    <section className="mt-8">

      <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[#111]">

        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-white/10 px-8 py-6">

          <div>

            <h2 className="text-3xl font-black text-white">
              AI Workspace
            </h2>

            <p className="mt-2 text-gray-400">
              Bangun produk digital dengan bantuan AI.
            </p>

          </div>

          <div className="rounded-full bg-yellow-500/10 px-4 py-2 text-sm font-bold text-yellow-400">
            GPT 5.5
          </div>

        </div>

        {/* BODY */}

        <div className="grid gap-8 p-8 lg:grid-cols-[1.2fr_.8fr]">

          {/* LEFT */}

          <div className="space-y-6">

            <div className="rounded-3xl border border-white/10 bg-[#0d0d0d] p-6">

              <div className="mb-5 flex items-center justify-between">

                <h3 className="text-xl font-bold text-white">
                  AI Prompt
                </h3>

                <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-bold text-yellow-400">
                  Premium
                </span>

              </div>

              <textarea
                rows={10}
                className="w-full resize-none bg-transparent text-white outline-none placeholder:text-gray-500"
                placeholder="Tulis prompt AI di sini..."
              />

            </div>

            <div>

              <p className="mb-3 text-sm font-semibold text-gray-300">
                Quick Prompt
              </p>

              <div className="flex flex-wrap gap-3">

                {[
                  "Ide Produk",
                  "Caption",
                  "Landing Page",
                  "Script Reels",
                  "Affiliate",
                  "Marketing",
                  "Canva",
                  "Copywriting",
                ].map((item) => (

                  <button
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 transition hover:border-yellow-500 hover:text-yellow-400"
                  >
                    {item}
                  </button>

                ))}

              </div>

            </div>

            <div className="flex gap-4">

              <button className="rounded-2xl bg-yellow-500 px-8 py-4 font-bold text-black">
                ⚡ Generate AI
              </button>

              <button className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-white">
                Clear
              </button>

            </div>

          </div>

          {/* RIGHT */}

                    <div className="space-y-6">

            <div className="rounded-3xl border border-green-500/20 bg-green-500/10 p-6">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-green-400">
                    Status AI
                  </p>

                  <h3 className="mt-2 text-2xl font-black text-white">
                    Ready to Generate
                  </h3>

                </div>

                <div className="text-5xl">
                  🤖
                </div>

              </div>

            </div>

            <div className="rounded-3xl border border-yellow-500/20 bg-yellow-500/5 p-6">

              <div className="flex items-center justify-between">

                <h3 className="text-2xl font-black text-white">
                  AI Response
                </h3>

                <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm font-semibold text-green-400">
                  ✓ Generated
                </span>

              </div>

              <div className="mt-6 space-y-4">

                <div className="rounded-2xl bg-[#181818] p-5">
                  <p className="text-sm text-gray-500">
                    📦 Nama Produk
                  </p>

                  <h4 className="mt-2 text-xl font-bold text-white">
                    Digital Planner Guru SD
                  </h4>
                </div>

                <div className="rounded-2xl bg-[#181818] p-5">
                  <p className="text-sm text-gray-500">
                    🎯 Target Pasar
                  </p>

                  <p className="mt-2 text-white">
                    Guru SD • Orang Tua • Sekolah Dasar
                  </p>
                </div>

                <div className="rounded-2xl bg-[#181818] p-5">
                  <p className="text-sm text-gray-500">
                    💰 Harga Jual
                  </p>

                  <p className="mt-2 text-2xl font-black text-yellow-400">
                    Rp79.000
                  </p>
                </div>

                <div className="rounded-2xl bg-[#181818] p-5">
                  <p className="text-sm text-gray-500">
                    📈 Estimasi Profit
                  </p>

                  <p className="mt-2 text-2xl font-black text-green-400">
                    Rp7.900.000 / 100 Penjualan
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}