import { ShieldCheck, BadgeCheck, Zap } from "lucide-react";

export default function PricingGuarantee() {
  const items = [
    {
      icon: ShieldCheck,
      title: "100% Aman",
      desc: "Pembayaran aman dan akun langsung aktif setelah pembayaran berhasil.",
    },
    {
      icon: BadgeCheck,
      title: "Tanpa Ribet",
      desc: "Tidak perlu belajar AI, prompt, atau coding. Tinggal isi form lalu Generate.",
    },
    {
      icon: Zap,
      title: "Update Gratis",
      desc: "Semua fitur baru otomatis kamu dapatkan selama masih berlangganan.",
    },
  ];

  return (
    <section className="bg-[#090909] py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <p className="font-bold uppercase tracking-[5px] text-yellow-400">
            KENAPA HARUS RIFE DIGITAL AI?
          </p>

          <h2 className="mt-5 text-5xl font-black text-white">
            Semua Sudah Disiapkan Untuk Pemula
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">
            Kamu tidak perlu jago teknologi.
            Tidak perlu belajar prompt.
            Tidak perlu bingung mulai dari mana.
            Tinggal pilih AI Tool lalu klik Generate.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">

          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-[#111111] p-8"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                  <Icon size={30} />
                </div>

                <h3 className="mt-6 text-2xl font-black text-white">
                  {item.title}
                </h3>

                <p className="mt-4 leading-8 text-gray-400">
                  {item.desc}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}