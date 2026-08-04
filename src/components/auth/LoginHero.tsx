import DashboardPreview from "./DashboardPreview";

export default function LoginHero() {
  return (
    <div className="hidden lg:flex flex-col justify-center">

      {/* Badge */}
      <div>
        <span className="inline-flex rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm font-semibold text-yellow-400">
          🚀 AI Platform untuk Bisnis Digital Indonesia
        </span>
      </div>

      {/* Title */}
      <h1 className="mt-8 text-6xl font-black leading-tight text-white">

        Bangun Produk
        <br />

        <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
          Digital Lebih Cepat
        </span>

        <br />

        dengan AI

      </h1>

      {/* Description */}
      <p className="mt-8 max-w-xl text-xl leading-9 text-gray-400">
        Rife Digital AI membantu kamu membuat produk digital,
        copywriting, landing page, caption,
        strategi marketing, hingga ide bisnis
        hanya dalam hitungan detik.
      </p>

      {/* Feature */}
      <div className="mt-10 grid grid-cols-2 gap-4">

        {[
          "50+ AI Tools",
          "AI Writer",
          "AI Marketing",
          "24/7 AI Assistant",
        ].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
          >
            <p className="font-semibold text-white">
              ✓ {item}
            </p>
          </div>
        ))}

      </div>

      {/* Dashboard */}
      <DashboardPreview />

    </div>
  );
}