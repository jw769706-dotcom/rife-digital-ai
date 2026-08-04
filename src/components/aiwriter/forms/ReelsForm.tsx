import { useState } from "react";

import { generateText } from "../../../services/ai";
import writerPrompt from "../../../prompts/writerPrompt";

import GeneratorButton from "../../generator/GeneratorButton";
import GeneratorResult from "../../generator/GeneratorResult";

export default function ReelsForm() {
  const [product, setProduct] = useState("");
  const [target, setTarget] = useState("");
  const [duration, setDuration] = useState("30 Detik");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  async function handleGenerate() {
    if (!product || !target) {
      alert("Lengkapi data.");
      return;
    }

    setLoading(true);

    try {
      const ai = await generateText({
        systemPrompt: writerPrompt,
        userPrompt: `
Buat Script Reels Instagram.

Produk:
${product}

Target Market:
${target}

Durasi:
${duration}

Gunakan format:

Hook

Scene 1

Scene 2

Scene 3

Call To Action

Tambahkan arahan visual di setiap scene.
`,
      });

      setResult(ai);
    } catch {
      setResult("Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-[#111111] p-8">

      <h2 className="text-3xl font-black text-white">
        Script Reels Generator
      </h2>

      <div className="mt-8 grid gap-6 md:grid-cols-2">

        <input
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          placeholder="Nama Produk"
          className="rounded-2xl border border-white/10 bg-[#1B1B1B] px-5 py-4 text-white outline-none"
        />

        <input
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="Target Market"
          className="rounded-2xl border border-white/10 bg-[#1B1B1B] px-5 py-4 text-white outline-none"
        />

        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="rounded-2xl border border-white/10 bg-[#1B1B1B] px-5 py-4 text-white md:col-span-2"
        >
          <option>30 Detik</option>
          <option>60 Detik</option>
          <option>90 Detik</option>
        </select>

      </div>

      <GeneratorButton
        loading={loading}
        text="Generate Script Reels"
        onClick={handleGenerate}
      />

      <GeneratorResult result={result} />

    </div>
  );
}