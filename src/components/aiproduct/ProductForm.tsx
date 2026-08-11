import { useState } from "react";
import { DollarSign, Package, Target, Wand2, Sparkles, Lightbulb } from "lucide-react";

import { supabase } from "../../lib/supabase";
import { generateText } from "../../services/ai";
import { createHistoryItem, saveHistory } from "../../lib/history";
import type { ProductAIResult } from "../../pages/AIProduct";

type ProductFormProps = {
  onResult: (result: ProductAIResult) => void;
};

export default function ProductForm({ onResult }: ProductFormProps) {
  const [category, setCategory] = useState("Ebook");
  const [targetMarket, setTargetMarket] = useState("");
  const [skills, setSkills] = useState("");
  const [price, setPrice] = useState("Rp49.000");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!targetMarket.trim()) {
      alert("Silakan isi Target Pasar terlebih dahulu.");
      return;
    }

    if (!skills.trim()) {
      alert("Silakan isi Skill yang Dimiliki terlebih dahulu.");
      return;
    }

    try {
      setLoading(true);

      const systemPrompt = `
Kamu adalah AI Product Strategist sekaligus mentor digital untuk Rife Digital AI.

Target pengguna Rife Digital AI adalah PEMULA yang mungkin:
- belum pernah membuat produk digital
- belum memahami teknologi
- belum tahu cara menggunakan Canva atau tools digital
- belum tahu cara menjual produk digital
- membutuhkan instruksi yang sangat jelas dan sederhana

Karena itu, jangan hanya memberikan jawaban singkat.
Bimbing pengguna seperti mentor pribadi dari NOL.

Gunakan bahasa Indonesia yang sederhana, jelas, praktis, dan mudah dipahami.
Hindari istilah teknis yang tidak dijelaskan.
Jika menggunakan istilah teknis, jelaskan artinya dengan bahasa sederhana.

Kembalikan jawaban HANYA dalam JSON valid.
Jangan gunakan markdown.
Jangan gunakan code block.

Format JSON WAJIB seperti berikut:

{
  "productName": "Nama produk yang menarik",
  "targetMarket": [
    "Target 1",
    "Target 2",
    "Target 3"
  ],
  "recommendedPrice": "Rp79.000",
  "valueProposition": "Penjelasan manfaat utama produk dengan bahasa sederhana",
  "launchStrategy": [
    "Strategi launching 1 yang jelas dan praktis",
    "Strategi launching 2 yang jelas dan praktis",
    "Strategi launching 3 yang jelas dan praktis",
    "Strategi launching 4 yang jelas dan praktis"
  ],
  "estimatedProfit": "Rp7.900.000",
  "tutorial": [
    {
      "title": "Langkah 1 - Menentukan isi produk",
      "steps": [
        "Penjelasan langkah pertama secara sangat jelas",
        "Apa yang harus diklik atau dilakukan",
        "Apa yang harus diisi",
        "Tips untuk pemula"
      ]
    },
    {
      "title": "Langkah 2 - Membuat produk",
      "steps": [
        "Penjelasan langkah kedua",
        "Cara melakukannya dari awal",
        "Apa yang harus diperhatikan"
      ]
    },
    {
      "title": "Langkah 3 - Menyelesaikan produk",
      "steps": [
        "Cara menyelesaikan produk",
        "Cara mengecek hasil",
        "Cara menyimpan produk"
      ]
    },
    {
      "title": "Langkah 4 - Mulai menjual",
      "steps": [
        "Cara mulai menjual",
        "Cara menentukan tempat menjual",
        "Cara membuat penawaran sederhana"
      ]
    }
  ],
  "actionPlan": [
    {
      "day": "Hari 1",
      "task": "Tugas yang harus dilakukan hari pertama secara jelas"
    },
    {
      "day": "Hari 2",
      "task": "Tugas yang harus dilakukan hari kedua secara jelas"
    },
    {
      "day": "Hari 3",
      "task": "Tugas yang harus dilakukan hari ketiga secara jelas"
    },
    {
      "day": "Hari 4",
      "task": "Tugas yang harus dilakukan hari keempat secara jelas"
    },
    {
      "day": "Hari 5",
      "task": "Tugas yang harus dilakukan hari kelima secara jelas"
    },
    {
      "day": "Hari 6",
      "task": "Tugas yang harus dilakukan hari keenam secara jelas"
    },
    {
      "day": "Hari 7",
      "task": "Tugas yang harus dilakukan hari ketujuh secara jelas"
    }
  ]
}

ATURAN PENTING:

1. Semua field WAJIB ada.
2. tutorial harus memiliki minimal 4 bagian.
3. Setiap bagian tutorial harus memiliki beberapa langkah yang benar-benar bisa dilakukan pemula.
4. Jangan hanya mengatakan "buat produk", tetapi jelaskan CARANYA.
5. Jangan hanya mengatakan "promosikan di Instagram", tetapi jelaskan bagaimana cara membuat dan mengunggah kontennya.
6. Action plan harus realistis untuk pemula.
7. Jangan memberikan tutorial yang terlalu umum.
8. Sesuaikan tutorial dengan kategori produk, target pasar, dan skill pengguna.
9. Jika pengguna menggunakan Canva, jelaskan langkah Canva secara sederhana.
10. Jika pengguna menggunakan Excel, jelaskan langkah Excel secara sederhana.
11. Jika pengguna menggunakan Notion, jelaskan langkah Notion secara sederhana.
12. Jangan menganggap pengguna sudah menguasai tools tersebut.
13. Gunakan contoh konkret jika memungkinkan.
14. Jangan membuat klaim bahwa pengguna pasti mendapatkan keuntungan.
15. Estimasi profit hanya berupa simulasi berdasarkan 100 penjualan.
`;

      const userPrompt = `
Buatkan konsep produk digital sekaligus panduan lengkap untuk pemula.

DATA PENGGUNA:

Kategori Produk:
${category}

Target Pasar:
${targetMarket}

Skill yang Dimiliki:
${skills}

Harga yang Diinginkan:
${price}

TUGAS:

Buat produk yang:
- sesuai dengan target pasar
- sesuai dengan skill pengguna
- realistis untuk dibuat pemula
- memiliki manfaat yang jelas
- memiliki peluang untuk dijual
- memiliki positioning yang jelas
- memiliki strategi launching organik
- memberikan estimasi profit berdasarkan 100 penjualan

Yang paling penting:

Buat TUTORIAL LENGKAP dari NOL.

Anggap pengguna benar-benar pemula dan belum tahu harus mulai dari mana.

Tutorial harus menjawab:
- harus mulai dari mana
- apa yang harus disiapkan
- tools apa yang digunakan
- langkah demi langkah membuat produk
- cara menyelesaikan produk
- cara menyimpan produk
- cara menentukan harga
- cara mulai menjual
- cara membuat promosi
- apa yang harus dilakukan jika belum ada pembeli

Buat juga ACTION PLAN 7 HARI yang sangat praktis.

Setiap hari harus memiliki tugas yang jelas dan bisa langsung dikerjakan.
`;

      const response = await generateText({
        systemPrompt,
        userPrompt,
      });

      let cleaned = response.trim();

      if (cleaned.startsWith("```json")) {
        cleaned = cleaned
          .replace(/^```json\s*/, "")
          .replace(/\s*```$/, "")
          .trim();
      } else if (cleaned.startsWith("```")) {
        cleaned = cleaned
          .replace(/^```\s*/, "")
          .replace(/\s*```$/, "")
          .trim();
      }

      const parsed = JSON.parse(cleaned) as ProductAIResult;

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("User belum login.");
      }

      const numericPrice = Number(price.replace(/\D/g, ""));

      const { error: saveError } = await supabase
        .from("ai_projects")
        .insert({
          user_id: user.id,
          title: parsed.productName,
          category,
          target_market: targetMarket,
          skills,
          price: numericPrice,
          result: parsed,
        });

      if (saveError) {
        console.error("Gagal menyimpan project:", saveError);
        throw saveError;
      }

      const historyPrompt = `
Buatkan konsep produk digital sekaligus panduan lengkap.

Kategori Produk: ${category}
Target Pasar: ${targetMarket}
Skill yang Dimiliki: ${skills}
Harga yang Diinginkan: ${price}
`;

      const historyResult = JSON.stringify(parsed, null, 2);

      saveHistory(
        createHistoryItem("AI Product", historyPrompt, historyResult)
      );

      console.log("History AI Product berhasil disimpan.");
      console.log("Project berhasil disimpan:", parsed);

      onResult(parsed);
    } catch (error) {
      console.error("GENERATE PRODUCT ERROR:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Gagal membuat produk. Silakan coba lagi."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full min-w-0">
      {/* FORM HEADER */}
      <div className="flex min-w-0 items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-400 text-black shadow-lg shadow-yellow-400/10 sm:h-14 sm:w-14">
          <Package size={24} strokeWidth={2.5} />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-black text-white sm:text-2xl">
              Kita buat produkmu
            </h2>

            <span className="rounded-full bg-yellow-400/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-yellow-400">
              Pemula Friendly
            </span>
          </div>

          <p className="mt-1.5 max-w-2xl text-xs leading-5 text-gray-500 sm:text-sm">
            Kamu nggak perlu tahu istilah AI. Cukup jawab beberapa pertanyaan
            sederhana, lalu Rife yang membantu menyusun konsepnya.
          </p>
        </div>
      </div>

      {/* BEGINNER TIP */}
      <div className="mt-6 flex min-w-0 items-start gap-3 rounded-2xl border border-yellow-400/15 bg-yellow-400/[0.05] p-4">
        <Lightbulb className="mt-0.5 shrink-0 text-yellow-400" size={18} />

        <div className="min-w-0">
          <p className="text-xs font-bold text-white sm:text-sm">
            Nggak tahu mau bikin apa?
          </p>

          <p className="mt-1 text-[11px] leading-5 text-gray-500 sm:text-xs">
            Tenang. Pilih kategori yang menurutmu paling cocok dan ceritakan
            target pembelinya. Rife akan membantu menemukan arah produknya.
          </p>
        </div>
      </div>

      <div className="mt-7 space-y-5 sm:mt-8 sm:space-y-6">
        {/* CATEGORY */}
        <div>
          <label
            htmlFor="product-category"
            className="mb-2.5 flex items-center gap-2 text-sm font-bold text-white"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/5 text-[10px] text-yellow-400">
              01
            </span>
            Kamu ingin membuat apa?
          </label>

          <p className="mb-3 text-xs leading-5 text-gray-500">
            Pilih jenis produk yang paling mendekati keinginanmu.
          </p>

          <select
            id="product-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full min-w-0 rounded-2xl border border-white/10 bg-[#181818] px-4 py-4 text-sm font-medium text-white outline-none transition focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/10"
          >
            <option>Ebook</option>
            <option>Template Canva</option>
            <option>Notion Template</option>
            <option>Spreadsheet</option>
            <option>Prompt AI</option>
            <option>Mini Course</option>
            <option>Membership</option>
          </select>
        </div>

        {/* TARGET MARKET */}
        <div>
          <label
            htmlFor="target-market"
            className="mb-2.5 flex items-center gap-2 text-sm font-bold text-white"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/5 text-[10px] text-yellow-400">
              02
            </span>
            Siapa yang ingin kamu bantu?
          </label>

          <p className="mb-3 text-xs leading-5 text-gray-500">
            Tulis calon pembelinya dengan bahasa biasa. Contoh: guru SD,
            mahasiswa, ibu rumah tangga, atau karyawan.
          </p>

          <div className="relative">
            <Target
              size={18}
              className="pointer-events-none absolute left-4 top-4 text-gray-600"
            />

            <input
              id="target-market"
              value={targetMarket}
              onChange={(e) => setTargetMarket(e.target.value)}
              placeholder="Contoh: Guru SD yang ingin membuat materi belajar"
              className="w-full min-w-0 rounded-2xl border border-white/10 bg-[#181818] py-4 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/10"
            />
          </div>
        </div>

        {/* SKILLS */}
        <div>
          <label
            htmlFor="product-skills"
            className="mb-2.5 flex items-center gap-2 text-sm font-bold text-white"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/5 text-[10px] text-yellow-400">
              03
            </span>
            Kamu bisa apa?
          </label>

          <p className="mb-3 text-xs leading-5 text-gray-500">
            Sebutkan kemampuan atau aplikasi yang pernah kamu gunakan. Kalau
            masih pemula, kamu juga boleh menulis <b className="text-gray-400">"belum tahu"</b>.
          </p>

          <input
            id="product-skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="Contoh: Canva, Excel, menulis / belum tahu"
            className="w-full min-w-0 rounded-2xl border border-white/10 bg-[#181818] p-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/10"
          />
        </div>

        {/* PRICE */}
        <div>
          <label
            htmlFor="product-price"
            className="mb-2.5 flex items-center gap-2 text-sm font-bold text-white"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/5 text-[10px] text-yellow-400">
              04
            </span>
            Kira-kira mau dijual berapa?
          </label>

          <p className="mb-3 text-xs leading-5 text-gray-500">
            Belum yakin harganya? Pilih perkiraan saja. Rife tetap akan
            memberikan rekomendasi harga berdasarkan produknya.
          </p>

          <div className="relative">
            <DollarSign
              size={18}
              className="pointer-events-none absolute left-4 top-4 text-gray-600"
            />

            <select
              id="product-price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full min-w-0 rounded-2xl border border-white/10 bg-[#181818] py-4 pl-12 pr-4 text-sm font-medium text-white outline-none transition focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/10"
            >
              <option>Rp49.000</option>
              <option>Rp79.000</option>
              <option>Rp99.000</option>
              <option>Rp149.000</option>
              <option>Rp199.000</option>
            </select>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-4 sm:p-5">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-yellow-400" />

            <p className="text-xs font-black uppercase tracking-[0.15em] text-yellow-400">
              Rife siap membantu
            </p>
          </div>

          <p className="mt-2 text-sm leading-6 text-gray-400">
            Dari jawabanmu, Rife akan menyusun{" "}
            <span className="font-semibold text-gray-200">
              ide produk, target pembeli, harga, strategi promosi, tutorial,
              dan action plan 7 hari
            </span>{" "}
            yang bisa kamu ikuti.
          </p>
        </div>

        {/* GENERATE */}
        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading}
          className="flex w-full min-w-0 items-center justify-center gap-3 rounded-2xl bg-yellow-400 px-5 py-4 text-sm font-black text-black shadow-xl shadow-yellow-400/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-300 hover:shadow-yellow-400/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:py-4.5 sm:text-base"
        >
          <Wand2 size={20} strokeWidth={2.5} />

          {loading ? "⏳ Rife Sedang Menyusun..." : "🚀 Bantu Saya Membuat Produk"}
        </button>

        <p className="text-center text-[10px] leading-5 text-gray-600 sm:text-xs">
          Rife tidak menjamin keuntungan. Hasil yang diberikan adalah panduan
          dan rekomendasi yang perlu kamu sesuaikan dengan kondisi nyata.
        </p>
      </div>
    </div>
  );
}