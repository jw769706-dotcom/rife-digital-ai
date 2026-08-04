import { useState } from "react";

function Faq() {
  const faqs = [
    {
      question: "Apakah saya harus bisa coding?",
      answer:
        "Tidak. Rife Digital AI dirancang khusus untuk pemula. Kamu cukup menjelaskan kebutuhanmu, lalu AI akan membantumu membuat produk digital, konten promosi, dan strategi bisnis tanpa harus menguasai coding.",
    },
    {
      question: "Apakah saya harus punya pengalaman bisnis digital?",
      answer:
        "Tidak perlu. Platform ini dibuat untuk siapa saja, termasuk yang baru ingin memulai bisnis digital dari nol.",
    },
    {
      question: "Apakah saya bisa menghasilkan uang menggunakan Rife Digital AI?",
      answer:
        "Bisa. Rife Digital AI membantu menemukan ide produk digital, membuat copywriting, konten promosi, dan strategi pemasaran. Hasil yang diperoleh tetap bergantung pada konsistensi dan usaha masing-masing pengguna.",
    },
    {
      question: "Apakah bisa digunakan di HP?",
      answer:
        "Bisa. Rife Digital AI dapat diakses melalui browser di smartphone, tablet, maupun laptop tanpa perlu menginstal aplikasi.",
    },
    {
      question: "Bagaimana jika saya ingin upgrade paket?",
      answer:
        "Kamu bisa upgrade kapan saja dari Starter ke Growth atau Elite tanpa kehilangan data maupun riwayat penggunaan akun.",
    },
    {
      question: "Bagaimana jika saya mengalami kendala?",
      answer:
        "Tim support siap membantu setiap pengguna. Paket Growth dan Elite juga mendapatkan layanan prioritas agar setiap kendala dapat ditangani lebih cepat.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-[#0B0B0B]">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white">
            Pertanyaan yang
            <span className="text-yellow-500"> Sering Ditanyakan</span>
          </h2>

          <p className="mt-4 text-gray-400">
            Masih ada yang ingin ditanyakan? Berikut beberapa pertanyaan yang
            paling sering diajukan oleh calon pengguna Rife Digital AI.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span className="text-lg font-semibold text-white">
                  {faq.question}
                </span>

                <span className="text-2xl text-yellow-500">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <div className="border-t border-white/10 px-6 py-5 text-gray-400 leading-7">
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

export default Faq;