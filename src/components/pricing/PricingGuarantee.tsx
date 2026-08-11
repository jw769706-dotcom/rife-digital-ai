import { ShieldCheck, MousePointerClick, GraduationCap } from "lucide-react";

export default function PricingGuarantee() {
  const items = [
    {
      icon: MousePointerClick,
      title: "Tinggal Klik, AI yang Kerjakan",
      desc: "Belum pernah pakai AI? Tenang. Kamu tidak perlu paham istilah rumit atau belajar membuat prompt. Pilih kebutuhanmu, isi beberapa informasi sederhana, lalu klik Generate.",
    },
    {
      icon: GraduationCap,
      title: "Dibimbing dari Nol Sampai Jualan",
      desc: "Bukan cuma membantu membuat produk. Rife Digital AI membantu kamu menemukan ide, membuat produk digital, menyiapkan konten promosi, sampai mengarahkan langkah agar produkmu bisa mulai dijual.",
    },
    {
      icon: ShieldCheck,
      title: "Mulai dengan Lebih Percaya Diri",
      desc: "Tidak perlu takut salah atau bingung harus mulai dari mana. Semua dibuat sederhana agar pemula bisa mengikuti langkah demi langkah dan fokus membangun bisnis digital.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#090909] py-28">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-yellow-500/10 blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-5 py-2 text-sm font-bold text-yellow-400">
            ✨ DIBUAT KHUSUS UNTUK PEMULA
          </div>

          <h2 className="mt-7 text-4xl font-black leading-tight text-white md:text-6xl">
            Nggak Jago Teknologi?
            <br />
            <span className="text-yellow-400">
              Justru Kamu yang Cocok.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400 md:text-xl">
            Tidak perlu paham coding, tidak perlu jago AI, dan tidak perlu
            bingung harus mulai dari mana. Rife Digital AI membantu kamu
            membangun bisnis digital langkah demi langkah.
          </p>
        </div>

        {/* CARDS */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#111111] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400/40 hover:bg-[#151515] hover:shadow-[0_20px_60px_rgba(234,179,8,.10)]"
              >
                {/* Number */}
                <div className="absolute right-6 top-6 text-5xl font-black text-white/[0.03]">
                  0{index + 1}
                </div>

                {/* Icon */}
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-black shadow-lg shadow-yellow-500/10 transition-transform duration-300 group-hover:scale-110">
                  <Icon size={30} strokeWidth={2.5} />
                </div>

                <h3 className="mt-7 text-2xl font-black leading-tight text-white">
                  {item.title}
                </h3>

                <p className="mt-4 leading-8 text-gray-400">
                  {item.desc}
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-bold text-yellow-400">
                  <span>✓</span>
                  <span>Cocok untuk pemula</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM MESSAGE */}
        <div className="mx-auto mt-14 max-w-4xl rounded-3xl border border-yellow-500/20 bg-yellow-500/[0.06] p-7 text-center">
          <p className="text-lg font-bold text-white md:text-xl">
            "Saya nggak ngerti AI dan nggak tahu harus mulai dari mana."
          </p>

          <p className="mt-3 text-gray-400">
            Justru itu alasan Rife Digital AI dibuat.
            <span className="font-semibold text-yellow-400">
              {" "}
              Kamu cukup ceritakan apa yang ingin kamu lakukan,
            </span>{" "}
            lalu biarkan AI membantu menyusun langkahnya.
          </p>
        </div>
      </div>
    </section>
  );
}