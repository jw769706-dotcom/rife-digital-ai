export default function AIWriterChat() {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#111] overflow-hidden">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-white/10 px-8 py-6">

        <div>
          <h2 className="text-3xl font-bold text-white">
            AI Writer
          </h2>

          <p className="mt-2 text-gray-400">
            Chat dengan AI untuk membuat konten berkualitas.
          </p>
        </div>

        <button className="rounded-xl bg-yellow-500 px-5 py-3 font-semibold text-black hover:bg-yellow-400">
          + New Chat
        </button>

      </div>

      {/* Chat */}

      <div className="space-y-8 p-8">

        {/* AI */}

        <div className="flex gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500 font-bold text-black">
            AI
          </div>

          <div className="max-w-3xl rounded-3xl bg-[#181818] p-6">

            <h3 className="font-bold text-white">
              Halo Rifqi 👋
            </h3>

            <p className="mt-4 leading-8 text-gray-300">
              Selamat datang di AI Writer Rife Digital AI.

              Saya siap membantu membuat:

              • Caption Instagram

              • Copywriting

              • Landing Page

              • Email Marketing

              • Script Reels

              • Ide Produk Digital

              • Artikel SEO

              Tinggal tulis kebutuhanmu di bawah.
            </p>

          </div>

        </div>

        {/* User */}

        <div className="flex justify-end">

          <div className="max-w-2xl rounded-3xl bg-yellow-500 p-6 text-black">

            Buatkan caption Instagram untuk menjual Digital Planner Guru SD dengan gaya santai dan CTA kuat.

          </div>

        </div>

        {/* AI */}

        <div className="flex gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500 font-bold text-black">
            AI
          </div>

          <div className="max-w-3xl rounded-3xl bg-[#181818] p-6">

            <h3 className="font-bold text-white">
              Caption Instagram
            </h3>

            <p className="mt-4 leading-8 text-gray-300">
              Guru SD capek bikin administrasi setiap hari?

              Saatnya pakai Digital Planner yang bikin pekerjaan lebih cepat,
              lebih rapi, dan lebih profesional.

              ✔ Template siap pakai

              ✔ Mudah diedit

              ✔ Hemat waktu

              Klik link bio sekarang sebelum promonya habis.
            </p>

          </div>

        </div>

      </div>

      {/* Input */}

      <div className="border-t border-white/10 p-8">

        <div className="flex gap-4">

          <input
            placeholder="Tulis pesan ke AI..."
            className="flex-1 rounded-2xl border border-white/10 bg-[#090909] px-6 py-5 text-white outline-none"
          />

          <button className="rounded-2xl bg-yellow-500 px-8 font-bold text-black hover:bg-yellow-400">
            Kirim
          </button>

        </div>

      </div>

    </div>
  );
}