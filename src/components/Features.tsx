const features = [
  {
    icon: "✍️",
    title: "AI Content Generator",
    desc: "Buat caption, hook, copywriting, dan ide konten dalam hitungan detik.",
  },
  {
    icon: "📦",
    title: "Digital Product Builder",
    desc: "Temukan ide produk digital yang siap dijual lengkap dengan target pasar.",
  },
  {
    icon: "📈",
    title: "Marketing Strategy",
    desc: "Dapatkan strategi promosi organik dan rencana pemasaran yang praktis.",
  },
  {
    icon: "🤝",
    title: "Affiliate Assistant",
    desc: "AI membantu memilih produk affiliate dan membuat konten promosinya.",
  },
  {
    icon: "🤖",
    title: "AI Chat",
    desc: "Diskusikan ide bisnis, validasi produk, dan minta saran kapan saja.",
  },
  {
    icon: "📊",
    title: "Analytics",
    desc: "Pantau perkembangan ide, konten, dan aktivitas dalam satu dashboard.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-white py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,.12),transparent_45%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full border border-yellow-300 bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            Semua Tool yang Kamu Butuhkan
          </span>

          <h2 className="mt-6 text-4xl font-black text-gray-900 md:text-5xl">
            Semua Tools AI{" "}
            <span className="text-yellow-500">Dalam Satu Platform</span>
          </h2>

          <p className="mt-5 text-lg text-gray-500">
            Bangun, promosikan, dan kembangkan bisnis digital lebih cepat
            menggunakan AI.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((item) => (
            <div
              key={item.title}
              className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-300 hover:shadow-2xl"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100 text-3xl transition group-hover:scale-110 group-hover:bg-yellow-400">
                {item.icon}
              </div>

              <h3 className="mt-6 text-2xl font-bold text-gray-900">
                {item.title}
              </h3>

              <p className="mt-4 leading-8 text-gray-500">
                {item.desc}
              </p>

              <div className="mt-8 flex items-center font-semibold text-yellow-600 transition group-hover:translate-x-2">
                Pelajari lebih lanjut →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
