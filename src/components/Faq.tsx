import { useState } from "react";
import { ChevronDown } from "lucide-react";

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
      className="relative overflow-hidden border-t border-white/[0.06] bg-[#090909] py-16 sm:py-24 lg:py-28"
    >
      {/* BACKGROUND GLOW */}

      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-yellow-400/[0.04] blur-[120px]" />

      <div className="relative mx-auto max-w-4xl px-5 sm:px-6">

        {/* HEADER */}

        <div className="text-center">
          <span className="inline-flex items-center rounded-full border border-yellow-400/20 bg-yellow-400/[0.05] px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-yellow-400 sm:px-4 sm:text-xs">
            Pertanyaan Umum
          </span>

          <h2 className="mt-5 text-[30px] font-black leading-[1.08] tracking-[-0.03em] text-white sm:mt-7 sm:text-4xl md:text-5xl">
            Masih Bingung?
            <br />

            <span className="text-yellow-400">
              Tenang, Kami Bantu.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[12px] leading-6 text-gray-500 sm:mt-6 sm:text-base sm:leading-8">
            Jawaban dari pertanyaan yang paling sering ditanyakan sebelum
            mulai menggunakan Rife Digital AI.
          </p>
        </div>

        {/* FAQ LIST */}

        <div className="mt-9 space-y-2.5 sm:mt-12 sm:space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={`
                  overflow-hidden rounded-2xl border transition-all duration-300
                  sm:rounded-3xl
                  ${
                    isOpen
                      ? "border-yellow-400/20 bg-yellow-400/[0.035]"
                      : "border-white/[0.08] bg-[#101010] hover:border-white/[0.14]"
                  }
                `}
              >
                {/* QUESTION */}

                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:gap-6 sm:px-6 sm:py-5"
                >
                  <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                    {/* NUMBER */}

                    <span
                      className={`
                        flex h-7 w-7 shrink-0 items-center justify-center
                        rounded-lg text-[8px] font-black
                        transition-colors duration-300
                        sm:h-8 sm:w-8 sm:rounded-xl sm:text-[9px]
                        ${
                          isOpen
                            ? "bg-yellow-400 text-black"
                            : "bg-white/[0.05] text-gray-600"
                        }
                      `}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* QUESTION */}

                    <span
                      className={`
                        text-[12px] font-bold leading-5 transition-colors
                        sm:text-sm sm:leading-6
                        ${
                          isOpen
                            ? "text-white"
                            : "text-gray-300"
                        }
                      `}
                    >
                      {faq.question}
                    </span>
                  </div>

                  {/* ICON */}

                  <span
                    className={`
                      flex h-8 w-8 shrink-0 items-center justify-center
                      rounded-full border transition-all duration-300
                      sm:h-9 sm:w-9
                      ${
                        isOpen
                          ? "border-yellow-400/20 bg-yellow-400 text-black"
                          : "border-white/[0.08] bg-white/[0.025] text-gray-500"
                      }
                    `}
                  >
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </button>

                {/* ANSWER */}

                <div
                  className={`
                    grid transition-all duration-300 ease-out
                    ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }
                  `}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-white/[0.06] px-4 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
                      <div className="pl-10 sm:pl-12">
                        <p className="text-[11px] leading-6 text-gray-500 sm:text-sm sm:leading-7">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM NOTE */}

        <div className="mt-8 text-center sm:mt-10">
          <p className="text-[10px] leading-5 text-gray-700 sm:text-xs">
            Masih punya pertanyaan?
            <span className="ml-1 text-gray-500">
              Kamu bisa mulai dari satu kebutuhan terlebih dahulu.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}