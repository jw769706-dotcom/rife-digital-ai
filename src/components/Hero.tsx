function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-40 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-yellow-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-400">
          🚀 AI Platform untuk Bisnis Digital
        </span>

        <h1 className="mt-8 text-5xl font-extrabold leading-tight md:text-7xl">
          Bangun Bisnis Digital
          <br />
          <span className="text-yellow-500">
            Lebih Cepat Dengan AI
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-400">
          Rife Digital AI membantu kamu membuat produk digital,
          menghasilkan ide konten, copywriting, hingga strategi
          pemasaran hanya dalam hitungan detik.
        </p>

        <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
          <button className="rounded-xl bg-yellow-500 px-8 py-4 font-semibold text-black transition hover:scale-105 hover:bg-yellow-400">
            Mulai Gratis
          </button>

          <button className="rounded-xl border border-white/10 px-8 py-4 text-white transition hover:border-yellow-500 hover:text-yellow-400">
            Lihat Demo
          </button>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-500">
          <span>⚡ AI Content</span>
          <span>🎨 Produk Digital</span>
          <span>📈 Marketing</span>
          <span>🤖 AI Assistant</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;