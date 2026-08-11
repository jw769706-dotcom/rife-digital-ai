import { useState } from "react";
import { DollarSign, Package, Target, Wand2 } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { generateText } from "../../services/ai";
import {
  createHistoryItem,
  saveHistory,
} from "../../lib/history";
import type { ProductAIResult } from "../../pages/AIProduct";

type ProductFormProps = {
  onResult: (result: ProductAIResult) => void;
};

export default function ProductForm({
  onResult,
}: ProductFormProps) {
  const [category, setCategory] = useState("Ebook");
  const [targetMarket, setTargetMarket] = useState("");
  const [skills, setSkills] = useState("");
  const [price, setPrice] = useState("Rp29.000");
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

      const numericPrice = Number(
        price.replace(/\D/g, "")
      );

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
        console.error(
          "Gagal menyimpan project:",
          saveError
        );

        throw saveError;
      }

      /*
       * ==========================================
       * SIMPAN KE HISTORY
       * ==========================================
       */

      const historyPrompt = `
Buatkan konsep produk digital sekaligus panduan lengkap.

Kategori Produk: ${category}
Target Pasar: ${targetMarket}
Skill yang Dimiliki: ${skills}
Harga yang Diinginkan: ${price}
`;

      const historyResult = JSON.stringify(
        parsed,
        null,
        2
      );

      saveHistory(
        createHistoryItem(
          "AI Product",
          historyPrompt,
          historyResult
        )
      );

      console.log(
        "History AI Product berhasil disimpan."
      );

      console.log(
        "Project berhasil disimpan:",
        parsed
      );

      onResult(parsed);
    } catch (error) {
      console.error(
        "GENERATE PRODUCT ERROR:",
        error
      );

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
    <div>
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

        {/* Kategori Produk */}
        <div>
          <label className="mb-2 block text-sm text-gray-400">
            Kategori Produk
          </label>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="w-full rounded-2xl border border-white/10 bg-[#202020] p-4 text-white outline-none"
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

        {/* Target Pasar */}
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
              value={targetMarket}
              onChange={(e) =>
                setTargetMarket(e.target.value)
              }
              placeholder="Contoh: Guru SD"
              className="w-full rounded-2xl border border-white/10 bg-[#202020] py-4 pl-12 pr-4 text-white outline-none placeholder:text-gray-600"
            />
          </div>
        </div>

        {/* Skill */}
        <div>
          <label className="mb-2 block text-sm text-gray-400">
            Skill yang Dimiliki
          </label>

          <input
            value={skills}
            onChange={(e) =>
              setSkills(e.target.value)
            }
            placeholder="Contoh: Canva, Excel, Notion"
            className="w-full rounded-2xl border border-white/10 bg-[#202020] p-4 text-white outline-none placeholder:text-gray-600"
          />
        </div>

        {/* Harga */}
        <div>
          <label className="mb-2 block text-sm text-gray-400">
            Harga Jual
          </label>

          <div className="relative">
            <DollarSign
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <select
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
              className="w-full rounded-2xl border border-white/10 bg-[#202020] py-4 pl-12 pr-4 text-white outline-none"
            >
              <option>Rp29.000</option>
              <option>Rp49.000</option>
              <option>Rp79.000</option>
              <option>Rp99.000</option>
              <option>Rp149.000</option>
              <option>Rp199.000</option>
            </select>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-yellow-400 py-4 text-lg font-bold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
        >
          <Wand2 size={20} />

          {loading
            ? "⏳ AI Sedang Membuat..."
            : "Generate Produk AI"}
        </button>
      </div>
    </div>
  );
}