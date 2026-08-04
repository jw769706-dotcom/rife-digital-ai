import { Sparkles } from "lucide-react";

export default function ProductHeader() {
  return (
    <div className="border-b border-white/10 bg-[#0D0D0D]">

      <div className="mx-auto max-w-7xl px-10 py-10">

        <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-300">

          <Sparkles size={16} />

          AI PRODUCT

        </div>

        <h1 className="mt-6 text-5xl font-black leading-tight">

          Bangun Produk Digital

          <br />

          dengan Bantuan AI

        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-400">

          Dari ide produk, validasi target pasar, strategi launching,
          copywriting, hingga estimasi profit.
          Semua dibuat oleh AI dalam hitungan detik.

        </p>

      </div>

    </div>
  );
}