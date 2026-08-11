import { Link } from "react-router-dom";

export default function AIDemo() {
  return (
    <section className="relative overflow-hidden bg-[#090909] py-28">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,.15),transparent_45%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-sm font-semibold text-yellow-400">
            🤖 Lihat Rife Membantu dari Nol
          </span>

          <h2 className="mt-6 text-4xl font-black leading-tight text-white md:text-5xl">
            Bingung Mulai Bisnis Digital
            <br />
            <span className="text-yellow-400">dari Mana?</span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-400">
            Cukup ceritakan apa yang ingin kamu jual. Rife akan membantu
            menyusun ide, membuat produk, menyiapkan promosi, dan memberikan
            langkah berikutnya dengan bahasa yang mudah dipahami.
          </p>
        </div>

        {/* STEP INDICATOR */}
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
          {[
            ["01", "Ceritakan", "Ceritakan keinginanmu"],
            ["02", "AI Membantu", "Rife menyusun strategi"],
            ["03", "Siap Dipakai", "Produk & konten siap"],
            ["04", "Mulai Jualan", "Ikuti langkah berikutnya"],
          ].map(([number, title, desc]) => (
            <div
              key={number}
              className="rounded-2xl border border-white/10 bg-[#111111] p-5 text-center"
            >
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-sm font-black text-black">
                {number}
              </div>

              <h3 className="mt-4 font-bold text-white">{title}</h3>

              <p className="mt-2 text-xs leading-5 text-gray-500">
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* AI WORKSPACE */}
        <div className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-[#111111] shadow-[0_30px_100px_rgba(0,0,0,.5)]">
          {/* Browser Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>

            <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-yellow-400">
              Rife Digital AI
            </span>
          </div>

          <div className="space-y-8 p-6 md:p-8">
            {/* USER PROMPT */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-400 text-sm">
                  👤
                </span>

                <div>
                  <p className="text-sm font-bold text-white">Kamu</p>

                  <p className="text-xs text-gray-500">
                    Cukup ceritakan dengan bahasa biasa
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-5 leading-7 text-gray-300">
                Saya ingin jualan produk digital untuk guru SD, tapi saya belum
                tahu harus membuat produk apa, cara membuatnya, dan bagaimana
                cara promosinya.
              </div>
            </div>

            {/* AI PROCESS */}
            <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white">
                    🤖 Rife Sedang Membantu...
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Menganalisis kebutuhanmu
                  </p>
                </div>

                <span className="text-sm font-bold text-yellow-400">
                  98%
                </span>
              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[98%] rounded-full bg-yellow-400" />
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {[
                  "✓ Mencari ide produk",
                  "✓ Menentukan target",
                  "✓ Menyusun strategi",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/5 bg-[#111111] px-4 py-3 text-sm text-gray-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* RESULT */}
            <div className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    ✨ Rekomendasi Rife
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Langkah yang bisa langsung kamu ikuti
                  </p>
                </div>

                <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm font-semibold text-green-400">
                  ✓ Selesai
                </span>
              </div>

              {/* RESULT CARDS */}
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-[#151515] p-5">
                  <p className="text-sm text-gray-500">💡 Ide Produk</p>

                  <p className="mt-2 font-bold text-white">
                    Digital Planner Guru SD
                  </p>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Template perencanaan pembelajaran yang praktis dan mudah
                    digunakan.
                  </p>
                </div>

                <div className="rounded-2xl bg-[#151515] p-5">
                  <p className="text-sm text-gray-500">
                    🎯 Target Pembeli
                  </p>

                  <p className="mt-2 font-bold text-white">
                    Guru SD & Orang Tua
                  </p>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Orang yang membutuhkan solusi mengatur kegiatan belajar
                    dengan lebih praktis.
                  </p>
                </div>

                <div className="rounded-2xl bg-[#151515] p-5">
                  <p className="text-sm text-gray-500">
                    📣 Strategi Promosi
                  </p>

                  <p className="mt-2 font-bold text-white">
                    Konten Organik
                  </p>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Rife membantu membuat hook, caption, script video, dan CTA
                    untuk promosi.
                  </p>
                </div>

                <div className="rounded-2xl bg-[#151515] p-5">
                  <p className="text-sm text-gray-500">
                    💰 Rekomendasi Harga
                  </p>

                  <p className="mt-2 font-bold text-yellow-400">
                    Rp49.000 – Rp79.000
                  </p>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Sesuaikan dengan isi dan nilai produk yang kamu buat.
                  </p>
                </div>
              </div>

              {/* NEXT STEP */}
              <div className="mt-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5">
                <p className="text-sm font-bold text-yellow-400">
                  🚀 Langkah Berikutnya
                </p>

                <p className="mt-2 leading-7 text-gray-300">
                  Buat produk → Upload ke platform jualan → Buat konten
                  promosi → Posting secara konsisten → Arahkan calon pembeli
                  ke produkmu.
                </p>
              </div>

              {/* CTA */}
              <Link
                to="/login"
                className="mt-6 inline-flex items-center rounded-xl bg-yellow-500 px-8 py-4 font-bold text-black transition hover:scale-105 hover:bg-yellow-400"
              >
                Coba Buat dengan Rife →
              </Link>
            </div>
          </div>
        </div>

        {/* BOTTOM MESSAGE */}
        <div className="mx-auto mt-12 max-w-3xl text-center">
          <p className="text-lg font-semibold text-white">
            Tidak perlu jago teknologi. Tidak perlu tahu istilah rumit.
          </p>

          <p className="mt-3 leading-7 text-gray-500">
            Kamu cukup ceritakan apa yang ingin kamu lakukan. Rife membantu
            menjelaskan apa yang harus dilakukan selanjutnya.
          </p>
        </div>
      </div>
    </section>
  );
}