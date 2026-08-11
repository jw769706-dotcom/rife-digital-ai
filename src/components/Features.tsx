const features = [
  {
    icon: "🚀",
    title: "Bangun Produk Digital dari Nol",
    desc: "Belum pernah membuat produk digital? Tenang. Rife membimbingmu mulai dari mencari ide, menentukan target pasar, membuat produk, menyiapkan konten promosi, sampai menyusun strategi untuk mendapatkan penjualan.",
  },
  {
    icon: "✍️",
    title: "Bikin Konten Tanpa Bingung",
    desc: "Ceritakan produkmu dengan bahasa sederhana. AI akan membantu membuat caption, hook, copywriting, script video, dan berbagai konten promosi yang siap digunakan.",
  },
  {
    icon: "📣",
    title: "Belajar Promosi dari Nol",
    desc: "Nggak tahu cara mempromosikan produk? Dapatkan panduan langkah demi langkah untuk memperkenalkan produkmu melalui konten organik.",
  },
  {
    icon: "💡",
    title: "Selalu Punya Ide untuk Jualan",
    desc: "Kehabisan ide? Rife membantu menemukan ide produk, ide konten, topik promosi, dan strategi yang sesuai dengan target pembelimu.",
  },
  {
    icon: "🤖",
    title: "Tanya AI Kapan Saja",
    desc: "Nggak ngerti istilah atau bingung harus melakukan apa? Tanya dengan bahasa sehari-hari dan AI akan menjelaskannya dengan cara yang mudah dipahami.",
  },
  {
    icon: "💰",
    title: "Fokus Sampai Mendapatkan Penjualan",
    desc: "Bukan cuma membuat produk. Rife membantu mengarahkanmu dari produk → promosi → calon pembeli → sampai strategi mendapatkan penjualan.",
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
        {/* HEADER */}
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex rounded-full border border-yellow-300 bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            🚀 Cocok untuk Pemula &amp; yang Baru Mulai
          </span>

          <h2 className="mt-6 text-4xl font-black leading-tight text-gray-900 md:text-5xl">
            Dari Nggak Tahu Apa-Apa,
            <br />
            <span className="text-yellow-500">
              Sampai Bisa Mulai Jualan
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-500">
            Nggak perlu jago teknologi, marketing, atau bisnis digital.
            Rife Digital AI membimbing kamu langkah demi langkah — mulai dari
            mencari ide, membuat produk, mempromosikannya, sampai belajar
            mendapatkan penjualan.
          </p>
        </div>

        {/* ALUR */}
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
          {[
            ["01", "Cari Ide", "Temukan produk yang cocok untuk dijual."],
            ["02", "Buat Produk", "Dibantu AI sampai produk siap digunakan."],
            ["03", "Promosikan", "Buat konten dan strategi promosi."],
            ["04", "Dapatkan Penjualan", "Belajar mengubah calon pembeli menjadi pembeli."],
          ].map(([number, title, desc]) => (
            <div
              key={number}
              className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-300 hover:shadow-lg"
            >
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 text-sm font-black text-black">
                {number}
              </div>

              <h3 className="mt-4 font-bold text-gray-900">
                {title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* FEATURES */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((item, index) => (
            <div
              key={item.title}
              className={`group relative overflow-hidden rounded-3xl border p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                index === 0
                  ? "border-yellow-300 bg-gradient-to-br from-yellow-50 to-white"
                  : "border-gray-200 bg-white"
              }`}
            >
              {/* Highlight */}
              {index === 0 && (
                <div className="absolute right-5 top-5 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-black">
                  ⭐ Paling Penting
                </div>
              )}

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100 text-3xl transition duration-300 group-hover:scale-110 group-hover:bg-yellow-400">
                {item.icon}
              </div>

              <h3 className="mt-6 text-2xl font-bold text-gray-900">
                {item.title}
              </h3>

              <p className="mt-4 leading-8 text-gray-500">
                {item.desc}
              </p>

              <div className="mt-8 flex items-center font-semibold text-yellow-600 transition group-hover:translate-x-2">
                Cocok untuk pemula →
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM MESSAGE */}
        <div className="mx-auto mt-16 max-w-4xl rounded-3xl border border-yellow-200 bg-yellow-50 p-8 text-center">
          <div className="text-3xl">💡</div>

          <h3 className="mt-4 text-2xl font-black text-gray-900">
            Bahkan Kalau Kamu Masih Gaptek
          </h3>

          <p className="mx-auto mt-3 max-w-2xl leading-7 text-gray-600">
            Kamu cukup ceritakan apa yang ingin kamu jual dengan bahasa
            sehari-hari. Rife akan membantu menjelaskan apa yang harus
            dilakukan dan memberikan langkah berikutnya.
          </p>
        </div>
      </div>
    </section>
  );
}