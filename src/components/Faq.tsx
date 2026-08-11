import { useState } from "react";

const faqs = [
  {
    question: "Saya belum pernah pakai AI, apakah bisa?",
    answer:
      "Bisa banget. Rife Digital AI memang dibuat untuk pemula. Kamu tidak perlu mengerti coding atau istilah AI yang rumit. Cukup tuliskan apa yang ingin kamu buat, lalu AI akan membantu langkah demi langkah.",
  },
  {
    question: "Apakah saya harus jago desain atau coding?",
    answer:
      "Tidak perlu. Rife Digital AI membantu kamu membuat ide produk, konten, caption, copywriting, dan kebutuhan bisnis digital lainnya tanpa harus jago coding atau desain.",
  },
  {
    question: "Apakah hasil AI boleh dijual?",
    answer:
      "Bisa digunakan sebagai bahan untuk produk dan konten kamu. Namun, tetap pastikan hasil akhirnya kamu periksa, sesuaikan, dan gunakan sesuai aturan platform atau layanan yang kamu gunakan.",
  },
  {
    question: "Apa saja yang bisa saya buat?",
    answer:
      "Kamu bisa membuat ide produk digital, caption, copywriting, script Reels, strategi marketing, landing page, dan berbagai kebutuhan bisnis digital lainnya.",
  },
  {
    question: "Apakah bisa digunakan lewat HP?",
    answer:
      "Bisa. Rife Digital AI dirancang sebagai platform berbasis web sehingga dapat digunakan melalui browser di HP maupun komputer.",
  },
  {
    question: "Bagaimana kalau saya masih bingung?",
    answer:
      "Tenang. Kamu tidak harus langsung mengerti semuanya. Mulai dari satu kebutuhan terlebih dahulu. Rife Digital AI akan membantu memberikan arahan supaya kamu tahu langkah berikutnya.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="bg-[#090909] py-24"
    >
      <div className="mx-auto max-w-4xl px-6">
        {/* HEADER */}
        <div className="text-center">
          <p className="font-bold uppercase tracking-[5px] text-yellow-400">
            PERTANYAAN YANG SERING DITANYAKAN
          </p>

          <h2 className="mt-5 text-4xl font-black text-white md:text-5xl">
            Masih Bingung?{" "}
            <span className="text-yellow-400">Tenang, Kami Bantu.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-400">
            Pertanyaan yang paling sering ditanyakan oleh orang yang baru
            mulai membangun bisnis digital dengan AI.
          </p>
        </div>

        {/* FAQ */}
        <div className="mt-12 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-yellow-400/40 bg-[#15130b]"
                    : "border-white/10 bg-[#111111] hover:border-yellow-400/20"
                }`}
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                >
                  <span className="font-bold text-white">
                    {faq.question}
                  </span>

                  <span
                    className={`shrink-0 text-xl font-bold text-yellow-400 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-white/5 px-6 pb-6 pt-4">
                    <p className="leading-7 text-gray-400">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}