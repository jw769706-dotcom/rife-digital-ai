import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Saya belum pernah pakai AI, apakah bisa?",
    answer:
      "Bisa banget. Rife Digital AI dibuat khusus untuk pemula. Kamu cukup isi beberapa kolom, lalu klik Generate. AI akan mengerjakan sisanya.",
  },
  {
    question: "Apakah saya harus jago desain atau coding?",
    answer:
      "Tidak perlu. Kamu tidak perlu bisa coding, desain, ataupun membuat prompt. Semua sudah disiapkan agar mudah digunakan.",
  },
  {
    question: "Apakah hasil AI boleh dijual?",
    answer:
      "Tentu. Kamu boleh menggunakan hasil AI untuk kebutuhan bisnis, promosi, media sosial, produk digital, ataupun klienmu sendiri.",
  },
  {
    question: "Apa saja yang bisa saya buat?",
    answer:
      "Caption Instagram, copywriting, landing page, ide konten, ebook, produk digital, template Canva, digital planner, script Reels, email marketing, dan masih banyak lagi.",
  },
  {
    question: "Kalau saya upgrade BASIC, apakah langsung aktif?",
    answer:
      "Ya. Setelah pembayaran berhasil diverifikasi, akunmu akan otomatis berubah menjadi BASIC dan semua fitur Premium langsung terbuka.",
  },
  {
    question: "Apakah ada batas penggunaan AI?",
    answer:
      "Paket Gratis hanya bisa generate 5 kali per hari. Paket BASIC dan PRO dapat membuat konten AI tanpa batas.",
  },
];

export default function PricingFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-[#090909] py-24">
      <div className="mx-auto max-w-5xl px-6">

        <div className="text-center">

          <p className="font-bold uppercase tracking-[5px] text-yellow-400">
            PERTANYAAN YANG SERING DITANYAKAN
          </p>

          <h2 className="mt-5 text-5xl font-black text-white">
            Masih Ragu Untuk Upgrade?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            Hampir semua pengguna kami awalnya juga belum pernah memakai AI.
            Berikut beberapa pertanyaan yang paling sering ditanyakan.
          </p>

        </div>

        <div className="mt-16 space-y-5">

          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="overflow-hidden rounded-3xl border border-white/10 bg-[#111111]"
            >
              <button
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
                className="flex w-full items-center justify-between px-8 py-7 text-left"
              >
                <span className="text-xl font-bold text-white">
                  {faq.question}
                </span>

                <ChevronDown
                  className={`transition ${
                    open === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open === index && (
                <div className="border-t border-white/10 px-8 py-7 text-gray-400 leading-8">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}