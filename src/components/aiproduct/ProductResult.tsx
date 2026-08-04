export default function ProductResult() {
  return (
    <div className="rounded-3xl border border-yellow-400/20 bg-[#151515] p-8">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-black text-white">
            Hasil AI
          </h2>

          <p className="mt-2 text-gray-500">
            Output lengkap yang dihasilkan AI
          </p>

        </div>

        <div className="rounded-full bg-green-500/20 px-5 py-2 text-sm font-bold text-green-400">
          Generated
        </div>

      </div>

      <div className="mt-10 space-y-6">

        <div className="rounded-2xl border border-white/10 bg-[#1B1B1B] p-6">

          <p className="text-sm text-gray-500">
            Nama Produk
          </p>

          <h2 className="mt-3 text-4xl font-black text-yellow-400">
            Digital Planner Guru SD
          </h2>

        </div>

        <div className="grid gap-6 lg:grid-cols-2">

          <div className="rounded-2xl border border-white/10 bg-[#1B1B1B] p-6">

            <p className="text-sm text-gray-500">
              Target Pasar
            </p>

            <div className="mt-3 space-y-2 text-gray-300">

              <p>• Guru SD</p>

              <p>• Orang Tua</p>

              <p>• Sekolah Dasar</p>

            </div>

          </div>

          <div className="rounded-2xl border border-white/10 bg-[#1B1B1B] p-6">

            <p className="text-sm text-gray-500">
              Harga Rekomendasi
            </p>

            <h2 className="mt-3 text-3xl font-black text-green-400">
              Rp79.000
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Berdasarkan analisis AI
            </p>

          </div>

        </div>

        <div className="rounded-2xl border border-white/10 bg-[#1B1B1B] p-6">

          <p className="text-sm text-gray-500">
            Value Proposition
          </p>

          <p className="mt-4 leading-8 text-gray-300">

            Membantu guru menyusun administrasi pembelajaran
            dengan cepat menggunakan template siap pakai,
            sehingga pekerjaan menjadi lebih efisien,
            profesional, dan menghemat waktu setiap hari.

          </p>

        </div>

        <div className="rounded-2xl border border-white/10 bg-[#1B1B1B] p-6">

          <p className="text-sm text-gray-500">
            Strategi Launching
          </p>

          <div className="mt-4 space-y-3 text-gray-300">

            <p>✅ Upload 3 Reels setiap hari</p>

            <p>✅ Buat Carousel edukasi</p>

            <p>✅ Affiliate + Komunitas Facebook</p>

            <p>✅ Bonus template gratis</p>

          </div>

        </div>

        <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-6">

          <p className="text-sm text-green-300">
            Estimasi Profit
          </p>

          <h2 className="mt-3 text-5xl font-black text-green-400">
            Rp7.900.000
          </h2>

          <p className="mt-3 text-gray-300">
            Perkiraan jika terjual 100 produk.
          </p>

        </div>

        <div className="grid gap-4 lg:grid-cols-2">

          <button className="rounded-2xl bg-yellow-400 py-4 text-lg font-bold text-black transition hover:bg-yellow-300">
            Copy Semua
          </button>

          <button className="rounded-2xl border border-white/10 bg-[#202020] py-4 font-semibold text-white transition hover:border-yellow-400">
            Export PDF
          </button>

        </div>

      </div>

    </div>
  );
}