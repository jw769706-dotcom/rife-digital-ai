export default function PricingHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#090909]">

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

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-28 text-center">

        <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-5 py-2 text-sm font-semibold text-yellow-400">

          🚀 Bangun Bisnis Digital Lebih Mudah dengan AI

        </span>

        <h1 className="mt-8 max-w-5xl text-5xl font-black leading-tight text-white md:text-7xl">

          Pilih Paket
          <br />

          <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">

            yang Sesuai
            <br />
            dengan Perjalanan Bisnismu

          </span>

        </h1>

        <p className="mt-8 max-w-3xl text-xl leading-9 text-gray-400">

          Mulai GRATIS terlebih dahulu.

          <br />

          Upgrade ketika kamu siap membuat produk digital,
          membuat konten lebih cepat,
          dan membangun bisnis digital menggunakan AI.

        </p>

        <div className="mt-16 grid w-full max-w-5xl gap-6 md:grid-cols-4">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-7">

            <h2 className="text-4xl font-black text-yellow-400">

              50+

            </h2>

            <p className="mt-3 text-gray-400">

              AI Tools

            </p>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-7">

            <h2 className="text-4xl font-black text-yellow-400">

              ∞

            </h2>

            <p className="mt-3 text-gray-400">

              Generate Tanpa Batas

            </p>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-7">

            <h2 className="text-4xl font-black text-yellow-400">

              24/7

            </h2>

            <p className="mt-3 text-gray-400">

              AI Siap Membantu

            </p>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-7">

            <h2 className="text-4xl font-black text-yellow-400">

              🇮🇩

            </h2>

            <p className="mt-3 text-gray-400">

              Dibuat Untuk Indonesia

            </p>

          </div>

        </div>

        <div className="mt-16 rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-transparent p-8">

          <h3 className="text-3xl font-black text-white">

            💛 Kurang dari Harga 2 Gelas Kopi

          </h3>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-300">

            Dengan paket <span className="font-bold text-yellow-400">BASIC</span>,
            kamu bisa membuat konten AI,
            mencari ide produk digital,
            membuat ebook,
            template Canva,
            copywriting,
            landing page,
            dan berbagai kebutuhan bisnis digital lainnya
            hanya dengan <span className="font-bold text-yellow-400">Rp49.000/bulan.</span>

          </p>

        </div>

      </div>

    </section>
  );
}