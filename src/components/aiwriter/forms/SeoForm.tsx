import { useState } from "react";

import { generateText } from "../../../services/ai";
import writerPrompt from "../../../prompts/writerPrompt";

import GeneratorButton from "../../generator/GeneratorButton";
import GeneratorResult from "../../generator/GeneratorResult";

export default function SeoForm() {
  const [keyword, setKeyword] = useState("");
  const [target, setTarget] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  async function handleGenerate() {
    if (!keyword || !target) {
      alert("Lengkapi data.");
      return;
    }

    setLoading(true);

    try {
      const ai = await generateText({
        systemPrompt: writerPrompt,
        userPrompt: `
Buat artikel SEO.

Keyword:
${keyword}

Target Pembaca:
${target}

Gunakan format:

Judul SEO

Meta Description

Pendahuluan

Isi Artikel

Kesimpulan

FAQ
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
        Artikel SEO Generator
      </h2>

      <div className="mt-8 grid gap-6">

        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Keyword"
          className="rounded-2xl border border-white/10 bg-[#1B1B1B] px-5 py-4 text-white outline-none"
        />

        <input
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="Target Pembaca"
          className="rounded-2xl border border-white/10 bg-[#1B1B1B] px-5 py-4 text-white outline-none"
        />

      </div>

      <GeneratorButton
        loading={loading}
        text="Generate Artikel SEO"
        onClick={handleGenerate}
      />

      <GeneratorResult result={result} />

    </div>
  );
}