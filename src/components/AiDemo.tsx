export default function AIDemo() {
  return (
    <section className="relative overflow-hidden bg-[#090909] py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,.15),transparent_45%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-sm font-semibold text-yellow-400">
            Demo AI
          </span>

          <h2 className="mt-6 text-4xl font-black text-white md:text-5xl">
            Lihat Cara Kerja <span className="text-yellow-400">AI Kami</span>
          </h2>

          <p className="mt-5 text-lg text-gray-400">
            Masukkan kebutuhanmu, lalu AI akan membuat ide bisnis, strategi,
            hingga konten dalam hitungan detik.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-[#111] shadow-[0_30px_80px_rgba(0,0,0,.45)]">

          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>

            <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-yellow-400">
              AI Workspace
            </span>
          </div>

          <div className="space-y-8 p-8">

            <div>
              <label className="mb-3 block text-sm font-semibold text-gray-300">
                Prompt
              </label>

              <div className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-5 text-gray-300">
                Buatkan ide produk digital untuk guru SD lengkap dengan target
                pasar, harga jual, strategi promosi organik, caption Instagram,
                dan CTA.
              </div>
            </div>

            <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white">
                  🤖 AI Sedang Bekerja...
                </h3>

                <span className="text-yellow-400 text-sm">
                  98%
                </span>
              </div>

              <div className="mt-4 h-2 rounded-full bg-white/10">
                <div className="h-2 w-[98%] rounded-full bg-yellow-400"></div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-6">

              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  ✨ Hasil AI
                </h3>

                <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm font-semibold text-green-400">
                  Selesai
                </span>
              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-2">

                <div className="rounded-xl bg-[#151515] p-5">
                  <p className="text-sm text-gray-500">Produk</p>
                  <p className="mt-2 font-bold text-white">
                    Digital Planner Guru SD
                  </p>
                </div>

                <div className="rounded-xl bg-[#151515] p-5">
                  <p className="text-sm text-gray-500">Target Pasar</p>
                  <p className="mt-2 font-bold text-white">
                    Guru, Orang Tua, Sekolah
                  </p>
                </div>

                <div className="rounded-xl bg-[#151515] p-5">
                  <p className="text-sm text-gray-500">Harga Jual</p>
                  <p className="mt-2 font-bold text-yellow-400">
                    Rp79.000
                  </p>
                </div>

                <div className="rounded-xl bg-[#151515] p-5">
                  <p className="text-sm text-gray-500">Estimasi Profit</p>
                  <p className="mt-2 font-bold text-green-400">
                    Rp7.900.000 / 100 penjualan
                  </p>
                </div>

              </div>

              <button className="mt-8 rounded-xl bg-yellow-500 px-8 py-4 font-bold text-black transition hover:bg-yellow-400">
                Generate Lagi
              </button>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
