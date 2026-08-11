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

  // Tutorial
  const [tutorial, setTutorial] = useState("");
  const [tutorialLoading, setTutorialLoading] = useState(false);

  // Tanya AI
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  async function handleGenerate() {
    if (!product || !target) {
      alert("Lengkapi data.");
      return;
    }

    setLoading(true);
    setResult("");
    setTutorial("");
    setAnswer("");

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

Buat copywriting yang:
- menarik perhatian sejak awal
- menggunakan bahasa Indonesia yang natural
- mudah dipahami pemula
- fokus pada manfaat
- tidak terlalu berlebihan
- cocok untuk platform yang dipilih
- memiliki CTA yang jelas
`,
      });

      setResult(ai);
    } catch {
      setResult("Terjadi kesalahan saat membuat copywriting.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGenerateTutorial() {
    if (!result) return;

    setTutorialLoading(true);
    setTutorial("");

    try {
      const ai = await generateText({
        systemPrompt: `
Kamu adalah mentor copywriting profesional di Rife Digital AI.

Tugas kamu adalah menjelaskan kepada pemula bagaimana cara menggunakan
dan menerapkan copywriting yang sudah dibuat.

Gunakan bahasa Indonesia yang:
- sederhana
- jelas
- praktis
- tidak terlalu teknis
- mudah dipahami pemula

Jangan hanya menjelaskan teori.

Berikan tutorial yang bisa langsung dipraktikkan.
`,
        userPrompt: `
Saya baru saja membuat copywriting dengan data berikut.

Nama Produk:
${product}

Target Market:
${target}

Platform:
${platform}

HASIL COPYWRITING:
${result}

Buat TUTORIAL LENGKAP dari nol.

Tutorial wajib menjelaskan:

1. Apa tujuan copywriting ini
2. Siapa target yang dituju
3. Cara menggunakan headline
4. Cara menggunakan pain point
5. Cara menyampaikan solusi
6. Cara menyampaikan benefit
7. Cara menggunakan CTA
8. Cara memposting copywriting ini di ${platform}
9. Kesalahan yang harus dihindari
10. Contoh cara menerapkannya
11. Tips agar copywriting lebih menarik
12. Apa yang harus dilakukan setelah diposting

Buat langkah-langkah secara berurutan dan praktis.
Anggap pengguna benar-benar pemula.
`,
      });

      setTutorial(ai);
    } catch {
      setTutorial(
        "Terjadi kesalahan saat membuat tutorial. Silakan coba lagi."
      );
    } finally {
      setTutorialLoading(false);
    }
  }

  async function handleAskAI() {
    if (!question.trim()) {
      return;
    }

    if (!result) {
      setAnswer("Generate copywriting terlebih dahulu sebelum bertanya kepada AI.");
      return;
    }

    setChatLoading(true);
    setAnswer("");

    try {
      const ai = await generateText({
        systemPrompt: `
Kamu adalah mentor AI pribadi di dalam Rife Digital AI.

Kamu sedang membantu pengguna memahami dan menggunakan
copywriting yang sudah dibuat.

Pengguna kemungkinan adalah pemula.

Gunakan bahasa Indonesia yang:
- sederhana
- ramah
- jelas
- praktis
- tidak menggurui
- tidak menggunakan istilah teknis tanpa penjelasan

Jika pengguna bertanya "bagaimana caranya", berikan langkah
demi langkah.

Jika pengguna mengatakan tidak mengerti, jelaskan dengan
bahasa yang lebih sederhana.

Jangan hanya memberikan teori.
Berikan tindakan yang bisa langsung dilakukan.

Jangan menjamin bahwa copywriting pasti menghasilkan penjualan.
`,
        userPrompt: `
DATA COPYWRITING

Nama Produk:
${product}

Target Market:
${target}

Platform:
${platform}

HASIL COPYWRITING:
${result}

PERTANYAAN PENGGUNA:
${question}

Jawab pertanyaan pengguna berdasarkan konteks copywriting
tersebut.

Jika pertanyaannya membutuhkan tutorial, berikan langkah
yang jelas dan berurutan.
`,
      });

      setAnswer(ai);
    } catch {
      setAnswer(
        "Maaf, AI sedang mengalami kendala. Silakan coba tanyakan lagi."
      );
    } finally {
      setChatLoading(false);
    }
  }

  function handleQuestionKeyDown(
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      if (!chatLoading) {
        handleAskAI();
      }
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-[#111111] p-8">

      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-black text-white">
          Copywriting Generator
        </h2>

        <p className="mt-2 text-gray-400">
          Buat copywriting yang menarik dan siap digunakan untuk promosi.
        </p>
      </div>

      {/* FORM */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">

        <input
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          placeholder="Nama Produk"
          className="rounded-2xl border border-white/10 bg-[#1B1B1B] px-5 py-4 text-white outline-none placeholder:text-gray-500 focus:border-yellow-400"
        />

        <input
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="Target Market"
          className="rounded-2xl border border-white/10 bg-[#1B1B1B] px-5 py-4 text-white outline-none placeholder:text-gray-500 focus:border-yellow-400"
        />

        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="rounded-2xl border border-white/10 bg-[#1B1B1B] px-5 py-4 text-white outline-none md:col-span-2 focus:border-yellow-400"
        >
          <option>Instagram</option>
          <option>Facebook</option>
          <option>TikTok</option>
          <option>Landing Page</option>
        </select>

      </div>

      {/* GENERATE */}
      <GeneratorButton
        loading={loading}
        text="Generate Copywriting"
        onClick={handleGenerate}
      />

      {/* HASIL AI */}
      {result && (
        <div className="mt-8">

          <GeneratorResult result={result} />

          {/* TUTORIAL */}
          <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-[#0D0D0D]">

            <div className="border-b border-white/10 px-6 py-5">
              <div className="flex items-center justify-between gap-4">

                <div>
                  <h3 className="text-xl font-bold text-white">
                    📚 Tutorial Lengkap
                  </h3>

                  <p className="mt-1 text-sm text-gray-400">
                    Pelajari cara menggunakan copywriting ini dari nol.
                  </p>
                </div>

                {!tutorial && (
                  <button
                    type="button"
                    onClick={handleGenerateTutorial}
                    disabled={tutorialLoading}
                    className="rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {tutorialLoading
                      ? "Membuat Tutorial..."
                      : "Buat Tutorial"}
                  </button>
                )}

              </div>
            </div>

            <div className="p-6">

              {!tutorial && !tutorialLoading && (
                <div className="rounded-2xl border border-white/5 bg-[#151515] p-5">
                  <p className="text-sm leading-7 text-gray-400">
                    Klik <span className="font-semibold text-white">
                      "Buat Tutorial"
                    </span>{" "}
                    untuk mendapatkan panduan lengkap menggunakan
                    copywriting ini.
                  </p>
                </div>
              )}

              {tutorialLoading && (
                <div className="rounded-2xl border border-white/5 bg-[#151515] p-8 text-center">

                  <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-white/10 border-t-yellow-400" />

                  <p className="mt-4 text-sm text-gray-400">
                    Rife AI sedang membuat tutorial lengkap...
                  </p>

                </div>
              )}

              {tutorial && !tutorialLoading && (
                <div className="whitespace-pre-wrap rounded-2xl border border-white/5 bg-[#151515] p-6 text-sm leading-8 text-gray-300">
                  {tutorial}
                </div>
              )}

            </div>
          </div>

          {/* TANYA AI */}
          <div className="mt-6 overflow-hidden rounded-3xl border border-yellow-500/20 bg-[#0D0D0D]">

            <div className="border-b border-white/10 px-6 py-5">

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">🤖</span>

                  <h3 className="text-xl font-bold text-white">
                    Tanya AI
                  </h3>

                  <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-yellow-400">
                    Mentor
                  </span>
                </div>

                <p className="mt-2 text-sm text-gray-400">
                  Bingung cara menggunakan copywriting ini?
                  Tanyakan langsung kepada Rife AI.
                </p>
              </div>

            </div>

            <div className="p-6">

              {/* QUESTION */}
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={handleQuestionKeyDown}
                rows={4}
                placeholder="Contoh: Bagaimana cara membuat CTA ini lebih menarik?"
                className="w-full resize-none rounded-2xl border border-white/10 bg-[#151515] px-5 py-4 text-white outline-none placeholder:text-gray-500 focus:border-yellow-400"
              />

              <div className="mt-4 flex items-center justify-between gap-4">

                <p className="text-xs text-gray-500">
                  Tekan Enter untuk bertanya
                </p>

                <button
                  type="button"
                  onClick={handleAskAI}
                  disabled={chatLoading || !question.trim()}
                  className="rounded-xl bg-yellow-400 px-6 py-3 text-sm font-bold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {chatLoading ? "AI Menjawab..." : "Tanya AI"}
                </button>

              </div>

              {/* ANSWER */}
              {chatLoading && (
                <div className="mt-6 rounded-2xl border border-white/5 bg-[#151515] p-6">

                  <div className="flex items-center gap-3">

                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/10 border-t-yellow-400" />

                    <p className="text-sm text-gray-400">
                      Rife AI sedang menyiapkan jawaban...
                    </p>

                  </div>

                </div>
              )}

              {answer && !chatLoading && (
                <div className="mt-6 rounded-2xl border border-yellow-500/10 bg-[#151515] p-6">

                  <div className="mb-4 flex items-center gap-2">
                    <span>🤖</span>

                    <p className="text-sm font-bold text-yellow-400">
                      Jawaban Rife AI
                    </p>
                  </div>

                  <div className="whitespace-pre-wrap text-sm leading-8 text-gray-300">
                    {answer}
                  </div>

                </div>
              )}

            </div>
          </div>

        </div>
      )}

    </div>
  );
}