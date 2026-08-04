import { DollarSign, Package, Target, Wand2 } from "lucide-react";

export default function ProductForm() {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#151515] p-8">

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 text-black">
          <Package size={24} />
        </div>

        <div>

          <h2 className="text-2xl font-bold text-white">
            Generate Produk
          </h2>

          <p className="text-sm text-gray-500">
            Lengkapi informasi produk yang ingin dibuat.
          </p>

        </div>

      </div>

      <div className="mt-8 space-y-6">

        <div>

          <label className="mb-2 block text-sm text-gray-400">
            Kategori Produk
          </label>

          <select className="w-full rounded-2xl border border-white/10 bg-[#202020] p-4 text-white outline-none">

            <option>Ebook</option>

            <option>Template Canva</option>

            <option>Notion Template</option>

            <option>Spreadsheet</option>

            <option>Prompt AI</option>

            <option>Mini Course</option>

            <option>Membership</option>

          </select>

        </div>

        <div>

          <label className="mb-2 block text-sm text-gray-400">
            Target Pasar
          </label>

          <div className="relative">

            <Target
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              placeholder="Contoh: Guru SD"
              className="w-full rounded-2xl border border-white/10 bg-[#202020] py-4 pl-12 pr-4 text-white outline-none"
            />

          </div>

        </div>

        <div>

          <label className="mb-2 block text-sm text-gray-400">
            Skill yang Dimiliki
          </label>

          <input
            placeholder="Contoh: Canva, Excel, Notion"
            className="w-full rounded-2xl border border-white/10 bg-[#202020] p-4 text-white outline-none"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm text-gray-400">
            Harga Jual
          </label>

          <div className="relative">

            <DollarSign
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <select className="w-full rounded-2xl border border-white/10 bg-[#202020] py-4 pl-12 pr-4 text-white outline-none">

              <option>Rp29.000</option>

              <option>Rp49.000</option>

              <option>Rp79.000</option>

              <option>Rp99.000</option>

              <option>Rp149.000</option>

              <option>Rp199.000</option>

            </select>

          </div>

        </div>

        <button className="flex w-full items-center justify-center gap-3 rounded-2xl bg-yellow-400 py-4 text-lg font-bold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-yellow-300">

          <Wand2 size={20} />

          Generate Produk AI

        </button>

      </div>

    </div>
  );
}