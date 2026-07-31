function AiDemo() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Lihat Cara Kerja
            <span className="text-yellow-500">
              {" "}AI Kami
            </span>
          </h2>

          <p className="mt-5 text-gray-400">
            Cukup masukkan kebutuhanmu, AI akan membantu dalam hitungan detik.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">

          <div className="rounded-xl bg-black p-6">

            <div className="text-gray-500">
              Prompt
            </div>

            <div className="mt-3 rounded-xl border border-white/10 bg-neutral-900 p-5">
              Buatkan ide produk digital untuk guru SD
            </div>

            <div className="mt-8 text-gray-500">
              AI Response
            </div>

            <div className="mt-3 rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-5 leading-8 text-gray-200">

              Berikut beberapa ide produk digital:

              <br /><br />

              • Template RPP

              <br />

              • Worksheet Canva

              <br />

              • Media Pembelajaran Interaktif

              <br />

              • Ebook Aktivitas Anak

              <br />

              • Flashcard Printable

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default AiDemo;