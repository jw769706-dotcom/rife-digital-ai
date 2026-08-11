import { Sparkles } from "lucide-react";

export default function ProductHeader() {
  return (
    <div className="mx-auto w-full max-w-[1600px] px-6 py-10 lg:px-8 xl:px-10">
      <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-300">
        <Sparkles size={16} />
        AI PRODUCT
      </div>

      <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl">
        Bangun Produk Digital
        <br />
        dengan Bantuan AI
      </h1>

      <p className="mt-5 max-w-3xl text-base leading-7 text-gray-400 sm:text-lg sm:leading-8">
        Dari ide produk, validasi target pasar, strategi launching,
        copywriting, hingga estimasi profit.
        Semua dibuat oleh AI dalam hitungan detik.
      </p>
    </div>
  );
}