import { useState } from "react";

import { generateText } from "../../../services/ai";
import writerPrompt from "../../../prompts/writerPrompt";

import GeneratorButton from "../../generator/GeneratorButton";
import GeneratorResult from "../../generator/GeneratorResult";

export default function CopywritingForm() {
  const [product, setProduct] = useState("");
  const [target, setTarget] = useState("");
  const [platform, setPlatform] = useState("Instagram");

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
Buat copywriting yang menjual.

Nama Produk:
${product}

Target Market:
${target}

Platform:
${platform}

Gunakan format:

Headline

Pain Point

Solusi

Benefit

Call To Action
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
        Copywriting Generator
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
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="rounded-2xl border border-white/10 bg-[#1B1B1B] px-5 py-4 text-white md:col-span-2"
        >
          <option>Instagram</option>
          <option>Facebook</option>
          <option>TikTok</option>
          <option>Landing Page</option>
        </select>

      </div>

      <GeneratorButton
        loading={loading}
        text="Generate Copywriting"
        onClick={handleGenerate}
      />

      <GeneratorResult result={result} />

    </div>
  );
}