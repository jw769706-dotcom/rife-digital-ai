function Features() {
  const features = [
    {
      title: "AI Content Generator",
      description:
        "Buat caption, script, copywriting, dan ide konten hanya dalam hitungan detik.",
      icon: "✍️",
    },
    {
      title: "Digital Product Builder",
      description:
        "Bangun produk digital lebih cepat menggunakan bantuan AI.",
      icon: "📦",
    },
    {
      title: "Marketing Strategy",
      description:
        "Dapatkan strategi pemasaran yang sesuai dengan bisnismu.",
      icon: "📈",
    },
    {
      title: "Affiliate Assistant",
      description:
        "Optimalkan penjualan affiliate dengan rekomendasi AI.",
      icon: "🤝",
    },
    {
      title: "AI Chat",
      description:
        "Tanya apa saja kepada AI untuk membantu bisnismu berkembang.",
      icon: "🤖",
    },
    {
      title: "Analytics",
      description:
        "Lihat perkembangan bisnis melalui dashboard yang mudah dipahami.",
      icon: "📊",
    },
  ];

  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Semua Tools AI
            <span className="text-yellow-500"> Dalam Satu Platform</span>
          </h2>

          <p className="mt-4 text-gray-400">
            Semua yang kamu butuhkan untuk membangun bisnis digital.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 transition hover:border-yellow-500 hover:bg-white/10"
            >
              <div className="text-4xl">{feature.icon}</div>

              <h3 className="mt-6 text-xl font-semibold">
                {feature.title}
              </h3>

              <p className="mt-4 text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;