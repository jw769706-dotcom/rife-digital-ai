import { useState } from "react";
import { generateText } from "../../services/ai";

type Tutorial = {
  title: string;
  steps: string[];
};

type ActionPlan = {
  day: string;
  task: string;
};

type AIResult = {
  productName: string;
  targetMarket: string;
  price: string;
  estimatedProfit: string;
  result: string;
  tutorial: Tutorial[];
  actionPlan: ActionPlan[];
};

type ChatMessage = {
  role: "user" | "ai";
  message: string;
};

const quickPrompts = [
  "Ide Produk",
  "Caption",
  "Landing Page",
  "Script Reels",
  "Affiliate",
  "Marketing",
  "Canva",
  "Copywriting",
];

export default function AIWorkspace() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<AIResult | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatLoading, setChatLoading] = useState(false);

  function handleQuickPrompt(item: string) {
    const prompts: Record<string, string> = {
      "Ide Produk":
        "Buatkan 1 ide produk digital yang cocok dijual untuk pemula.",

      Caption:
        "Buatkan caption Instagram untuk menjual produk digital.",

      "Landing Page":
        "Buatkan konsep landing page untuk menjual produk digital.",

      "Script Reels":
        "Buatkan script Reels untuk mempromosikan produk digital.",

      Affiliate:
        "Buatkan strategi affiliate marketing untuk produk digital.",

      Marketing:
        "Buatkan strategi marketing untuk menjual produk digital.",

      Canva:
        "Buatkan ide produk digital yang bisa dibuat menggunakan Canva.",

      Copywriting:
        "Buatkan copywriting penjualan untuk produk digital.",
    };

    setPrompt(prompts[item] || "");
    setError("");
  }

  function handleClear() {
    setPrompt("");
    setResult(null);
    setError("");

    setChatInput("");
    setChatMessages([]);
  }

  async function handleGenerate() {
    if (!prompt.trim()) {
      setError("Tulis prompt terlebih dahulu.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);
      setChatMessages([]);

      const systemPrompt = `
Kamu adalah Rife AI, asisten AI profesional untuk membantu
pengguna membangun bisnis digital dari nol.

Pengguna bisa menjadi pemula, jadi gunakan bahasa Indonesia
yang sederhana, jelas, praktis, dan mudah dipahami.

TUGAS:
Jawab permintaan pengguna dan hasilkan SATU rekomendasi utama.

Jangan membuat 5 atau 10 produk kecuali pengguna memang
secara khusus meminta banyak rekomendasi.

Selain hasil utama, berikan tutorial lengkap dan action plan
7 hari agar pengguna benar-benar bisa menjalankan hasilnya.

SANGAT PENTING:
Jawaban HARUS berupa JSON VALID.

Jangan gunakan Markdown.
Jangan gunakan backtick.
Jangan tambahkan penjelasan sebelum atau sesudah JSON.

Gunakan format PERSIS seperti ini:

{
  "productName": "Nama produk",
  "targetMarket": "Target pasar",
  "price": "Rp50.000",
  "estimatedProfit": "Rp5.000.000 dari 100 penjualan",
  "result": "Penjelasan lengkap mengenai hasil yang dibuat.",
  "tutorial": [
    {
      "title": "Langkah 1 - Menentukan produk",
      "steps": [
        "Langkah pertama yang harus dilakukan.",
        "Langkah kedua yang harus dilakukan.",
        "Langkah ketiga yang harus dilakukan."
      ]
    }
  ],
  "actionPlan": [
    {
      "day": "Hari 1",
      "task": "Tugas yang harus dilakukan hari pertama."
    },
    {
      "day": "Hari 2",
      "task": "Tugas yang harus dilakukan hari kedua."
    },
    {
      "day": "Hari 3",
      "task": "Tugas yang harus dilakukan hari ketiga."
    },
    {
      "day": "Hari 4",
      "task": "Tugas yang harus dilakukan hari keempat."
    },
    {
      "day": "Hari 5",
      "task": "Tugas yang harus dilakukan hari kelima."
    },
    {
      "day": "Hari 6",
      "task": "Tugas yang harus dilakukan hari keenam."
    },
    {
      "day": "Hari 7",
      "task": "Tugas yang harus dilakukan hari ketujuh."
    }
  ]
}

ATURAN:

1. productName harus singkat dan jelas.
2. targetMarket harus menjelaskan siapa pembelinya.
3. price harus berupa rekomendasi harga yang masuk akal.
4. estimatedProfit adalah PERKIRAAN, bukan jaminan.
5. result menjelaskan hasil utama secara praktis.
6. tutorial harus berisi beberapa bagian yang relevan.
7. Setiap tutorial harus memiliki beberapa langkah praktis.
8. Action Plan harus tepat 7 hari.
9. Action Plan harus realistis untuk pemula.
10. Jangan memberikan janji keuntungan pasti.
11. Jangan memasukkan field tambahan selain yang diminta.
12. Jangan mengulang label JSON di dalam value.
13. Semua isi harus relevan dengan permintaan pengguna.
`;

      const userPrompt = `
Permintaan pengguna:

${prompt}

Buat SATU hasil terbaik berdasarkan permintaan tersebut.

Pastikan tutorial dan action plan benar-benar sesuai dengan
hasil yang kamu rekomendasikan.
`;

      const response = await generateText({
        systemPrompt,
        userPrompt,
      });

      let cleanResponse = response.trim();

      cleanResponse = cleanResponse
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();

      const firstBrace = cleanResponse.indexOf("{");
      const lastBrace = cleanResponse.lastIndexOf("}");

      if (firstBrace === -1 || lastBrace === -1) {
        throw new Error("AI tidak mengembalikan JSON.");
      }

      cleanResponse = cleanResponse.slice(
        firstBrace,
        lastBrace + 1
      );

      const parsed = JSON.parse(cleanResponse) as AIResult;

      if (
        !parsed.productName ||
        !parsed.targetMarket ||
        !parsed.price ||
        !parsed.estimatedProfit ||
        !parsed.result ||
        !Array.isArray(parsed.tutorial) ||
        !Array.isArray(parsed.actionPlan)
      ) {
        throw new Error("Format hasil AI tidak lengkap.");
      }

      setResult(parsed);
    } catch (err) {
      console.error("GENERATE AI ERROR:", err);

      setError(
        "Format jawaban AI tidak sesuai. Silakan coba Generate AI lagi."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleAskAI() {
    const question = chatInput.trim();

    if (!question || !result || chatLoading) {
      return;
    }

    const userMessage: ChatMessage = {
      role: "user",
      message: question,
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");
    setChatLoading(true);

    try {
      const context = `
HASIL PROJECT PENGGUNA:

Nama Produk:
${result.productName}

Target Pasar:
${result.targetMarket}

Harga:
${result.price}

Estimasi Profit:
${result.estimatedProfit}

Penjelasan:
${result.result}

Tutorial:
${result.tutorial
  .map(
    (item, index) =>
      `${index + 1}. ${item.title}\n${item.steps
        .map((step, stepIndex) => `- ${stepIndex + 1}. ${step}`)
        .join("\n")}`
  )
  .join("\n\n")}

Action Plan:
${result.actionPlan
  .map((item) => `${item.day}: ${item.task}`)
  .join("\n")}
`;

      const systemPrompt = `
Kamu adalah Tanya AI milik Rife Digital AI.

Kamu membantu pengguna memahami dan menjalankan project
yang baru saja dibuat oleh Rife AI.

Jawablah berdasarkan project pengguna yang diberikan di bawah.

${context}

ATURAN:
- Gunakan bahasa Indonesia.
- Jawab dengan jelas dan praktis.
- Anggap pengguna sebagai pemula.
- Jangan mengarang informasi yang bertentangan dengan project.
- Jika pertanyaan tidak berhubungan langsung dengan project,
  tetap bantu jika masih berkaitan dengan bisnis digital.
- Jika pengguna meminta langkah, berikan langkah yang mudah diikuti.
- Jangan memberikan janji keuntungan pasti.
- Jangan terlalu panjang kecuali pengguna meminta penjelasan detail.
`;

      const response = await generateText({
        systemPrompt,
        userPrompt: question,
      });

      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          message: response.trim(),
        },
      ]);
    } catch (err) {
      console.error("TANYA AI ERROR:", err);

      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          message:
            "Maaf, Tanya AI sedang mengalami masalah. Coba tanyakan lagi.",
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  }

  function handleChatKeyDown(
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleAskAI();
    }
  }

    return (
    <section className="mt-6 w-full">
      <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0d0d0d] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">

        {/* WORKSPACE HEADER */}
        <div className="border-b border-white/[0.08] px-5 py-5 sm:px-7 sm:py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-yellow-400 text-sm font-black text-black shadow-lg shadow-yellow-400/10">
                  ✦
                </span>

                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-yellow-400">
                  AI Workspace
                </span>
              </div>

              <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">
                Bangun sesuatu dengan Rife AI.
              </h2>

              <p className="mt-1.5 max-w-2xl text-sm leading-6 text-gray-500">
                Ceritakan apa yang ingin kamu buat. Rife akan membantu menyusun
                hasil, langkah, dan strategi yang bisa langsung kamu jalankan.
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-full border border-yellow-400/15 bg-yellow-400/[0.06] px-3.5 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
              <span className="text-xs font-semibold text-yellow-400">
                Rife AI
              </span>
            </div>

          </div>
        </div>


        {/* BODY */}
        <div className="p-5 sm:p-7">

          {/* PROMPT */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#101010] p-4 sm:p-5">

            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-500">
                  What do you want to build?
                </p>

                <p className="mt-1 text-xs text-gray-600">
                  Tulis dengan bahasa sehari-hari. Tidak perlu prompt rumit.
                </p>
              </div>

              <span className="hidden rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold text-gray-500 sm:inline-flex">
                AI
              </span>
            </div>


            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={loading}
              rows={7}
              className="w-full resize-none rounded-xl border border-white/[0.06] bg-[#0a0a0a] px-4 py-4 text-sm leading-7 text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-400/30 focus:ring-1 focus:ring-yellow-400/10 disabled:opacity-50 sm:text-[15px]"
              placeholder="Contoh: Saya ingin membuat produk digital untuk guru SD, tapi belum tahu produk apa yang cocok dan bagaimana cara menjualnya."
            />


            {/* QUICK PROMPT */}
            <div className="mt-4">

              <div className="mb-2.5 flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-600">
                  Quick Start
                </p>

                <p className="text-[10px] text-gray-600">
                  Pilih untuk mengisi prompt
                </p>
              </div>


              <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

                {quickPrompts.map((item) => (
                  <button
                    key={item}
                    type="button"
                    disabled={loading}
                    onClick={() => handleQuickPrompt(item)}
                    className="shrink-0 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-gray-400 transition hover:border-yellow-400/25 hover:bg-yellow-400/[0.05] hover:text-yellow-400 disabled:opacity-50"
                  >
                    {item}
                  </button>
                ))}

              </div>
            </div>


            {/* ERROR */}
            {error && (
              <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}


            {/* ACTION */}
            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">

              <button
                type="button"
                onClick={handleGenerate}
                disabled={loading}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-yellow-400 px-6 py-3.5 text-sm font-black text-black shadow-[0_8px_30px_rgba(250,204,21,0.12)] transition hover:bg-yellow-300 hover:shadow-[0_10px_35px_rgba(250,204,21,0.18)] disabled:cursor-wait disabled:opacity-50"
              >
                {loading
                  ? "⏳ Rife sedang bekerja..."
                  : "✦ Generate dengan Rife AI"}
              </button>


              <button
                type="button"
                onClick={handleClear}
                disabled={loading}
                className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-gray-300 transition hover:border-white/15 hover:bg-white/[0.05] disabled:opacity-50"
              >
                Bersihkan
              </button>

            </div>

          </div>


          {/* STATUS */}
          <div className="mt-5 flex items-center justify-between rounded-xl border border-white/[0.06] bg-[#101010] px-4 py-3">

            <div className="flex items-center gap-3">

              <span
                className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                  loading
                    ? "bg-yellow-400/10 text-yellow-400"
                    : result
                    ? "bg-green-400/10 text-green-400"
                    : "bg-white/[0.05] text-gray-500"
                }`}
              >
                {loading ? "⏳" : result ? "✓" : "✦"}
              </span>


              <div>
                <p className="text-xs font-semibold text-white">
                  {loading
                    ? "Rife sedang memproses permintaanmu"
                    : result
                    ? "Hasil berhasil dibuat"
                    : "Workspace siap digunakan"}
                </p>

                <p className="mt-0.5 text-[11px] text-gray-600">
                  {loading
                    ? "Tunggu sebentar..."
                    : result
                    ? "Kamu bisa membaca hasil dan melanjutkan ke langkah berikutnya."
                    : "Mulai dari prompt atau Quick Start di atas."}
                </p>
              </div>

            </div>


            <span
              className={`hidden rounded-full px-2.5 py-1 text-[10px] font-bold sm:inline-flex ${
                loading
                  ? "bg-yellow-400/10 text-yellow-400"
                  : result
                  ? "bg-green-400/10 text-green-400"
                  : "bg-white/[0.04] text-gray-500"
              }`}
            >
              {loading
                ? "GENERATING"
                : result
                ? "READY"
                : "IDLE"}
            </span>

          </div>


          {/* RESULT HEADER */}
          <div className="mt-8">

            <div className="mb-4 flex items-end justify-between gap-4">

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-yellow-400">
                  AI Result
                </p>

                <h3 className="mt-1 text-xl font-black tracking-tight text-white sm:text-2xl">
                  Hasil dari Rife AI
                </h3>
              </div>


              {result && !loading && (
                <span className="rounded-full border border-green-400/15 bg-green-400/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-green-400">
                  ✓ Generated
                </span>
              )}

            </div>


            {/* EMPTY */}
            {!result && !loading && (
              <div className="rounded-2xl border border-dashed border-white/[0.08] bg-[#101010] px-6 py-12 text-center">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400/[0.06] text-xl text-yellow-400">
                  ✦
                </div>

                <p className="mt-4 font-semibold text-gray-300">
                  Belum ada hasil
                </p>

                <p className="mx-auto mt-1.5 max-w-md text-sm leading-6 text-gray-600">
                  Tulis kebutuhanmu di atas lalu klik Generate. Hasil AI akan
                  muncul di area ini.
                </p>

              </div>
            )}


            {/* LOADING */}
            {loading && (
              <div className="rounded-2xl border border-yellow-400/10 bg-yellow-400/[0.03] px-6 py-14 text-center">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-yellow-400/15 bg-yellow-400/[0.06]">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/10 border-t-yellow-400" />
                </div>

                <p className="mt-4 font-semibold text-white">
                  Rife sedang membuat hasil...
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  Menganalisis kebutuhan dan menyusun rekomendasi terbaik.
                </p>

              </div>
            )}


            {/* RESULT */}
            {result && !loading && (
              <div className="space-y-4">

                {/* SUMMARY */}
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                  <div className="rounded-2xl border border-white/[0.07] bg-[#101010] p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-600">
                      Produk
                    </p>

                    <p className="mt-2 line-clamp-2 text-sm font-bold leading-6 text-white">
                      {result.productName}
                    </p>
                  </div>


                  <div className="rounded-2xl border border-white/[0.07] bg-[#101010] p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-600">
                      Target Pasar
                    </p>

                    <p className="mt-2 line-clamp-2 text-sm font-semibold leading-6 text-gray-300">
                      {result.targetMarket}
                    </p>
                  </div>


                  <div className="rounded-2xl border border-yellow-400/10 bg-yellow-400/[0.03] p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-600">
                      Harga
                    </p>

                    <p className="mt-2 text-lg font-black text-yellow-400">
                      {result.price}
                    </p>
                  </div>


                  <div className="rounded-2xl border border-green-400/10 bg-green-400/[0.03] p-4">

                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-600">
                      Estimasi Profit
                    </p>

                    <p className="mt-2 text-sm font-black leading-6 text-green-400">
                      {result.estimatedProfit}
                    </p>

                    <p className="mt-1 text-[10px] text-gray-600">
                      Perkiraan AI, bukan jaminan.
                    </p>

                  </div>

                </div>


                {/* MAIN RESULT */}
                <div className="rounded-2xl border border-white/[0.07] bg-[#101010] p-5 sm:p-6">

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-400/[0.08] text-yellow-400">
                      ✦
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-600">
                        Recommendation
                      </p>

                      <h4 className="mt-0.5 text-lg font-black text-white">
                        Hasil utama
                      </h4>
                    </div>

                  </div>


                  <p className="mt-5 whitespace-pre-wrap text-sm leading-7 text-gray-300">
                    {result.result}
                  </p>

                </div>


                {/* TUTORIAL */}
                <div className="rounded-2xl border border-white/[0.07] bg-[#101010] p-5 sm:p-6">

                  <div className="mb-5 flex items-start gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-yellow-400/[0.08] text-yellow-400">
                      01
                    </div>

                    <div>
                      <h3 className="text-lg font-black text-white">
                        Tutorial Lengkap
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-gray-600">
                        Ikuti langkah berikut dari awal sampai siap dijalankan.
                      </p>
                    </div>

                  </div>


                  <div className="space-y-3">

                    {result.tutorial.map((tutorial, index) => (
                      <div
                        key={index}
                        className="rounded-xl border border-white/[0.06] bg-[#0b0b0b] p-4 sm:p-5"
                      >

                        <div className="flex items-start gap-3">

                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-yellow-400 text-[10px] font-black text-black">
                            {index + 1}
                          </div>


                          <div className="min-w-0 flex-1">

                            <h4 className="text-sm font-bold leading-6 text-white">
                              {tutorial.title}
                            </h4>


                            <div className="mt-3 space-y-2.5">

                              {tutorial.steps.map((step, stepIndex) => (
                                <div
                                  key={stepIndex}
                                  className="flex gap-2.5"
                                >

                                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/[0.05] text-[10px] text-gray-500">
                                    {stepIndex + 1}
                                  </span>

                                  <p className="text-sm leading-6 text-gray-400">
                                    {step}
                                  </p>

                                </div>
                              ))}

                            </div>

                          </div>

                        </div>

                      </div>
                    ))}

                  </div>

                </div>


                {/* ACTION PLAN */}
                <div className="rounded-2xl border border-white/[0.07] bg-[#101010] p-5 sm:p-6">

                  <div className="mb-5 flex items-start gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-400/[0.08] text-blue-400">
                      02
                    </div>

                    <div>
                      <h3 className="text-lg font-black text-white">
                        Action Plan 7 Hari
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-gray-600">
                        Rencana sederhana agar kamu tahu harus melakukan apa.
                      </p>
                    </div>

                  </div>


                  <div className="space-y-2.5">

                    {result.actionPlan.map((plan, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-[#0b0b0b] p-3.5 sm:p-4"
                      >

                        <span className="shrink-0 rounded-lg bg-blue-400/[0.08] px-2.5 py-1.5 text-[10px] font-bold text-blue-400">
                          {plan.day}
                        </span>

                        <p className="text-sm leading-6 text-gray-400">
                          {plan.task}
                        </p>

                      </div>
                    ))}

                  </div>

                </div>


                {/* TANYA RIFE AI */}
                <div className="rounded-2xl border border-yellow-400/10 bg-gradient-to-br from-yellow-400/[0.04] to-[#101010] p-5 sm:p-6">

                  <div className="mb-5 flex items-start gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-yellow-400/[0.08] text-yellow-400">
                      ✦
                    </div>

                    <div>
                      <h3 className="text-lg font-black text-white">
                        Tanya Rife AI
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-gray-600">
                        Tanyakan apa pun tentang project yang baru dibuat.
                      </p>
                    </div>

                  </div>


                  {/* QUICK QUESTIONS */}
                  <div className="mb-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

                    {[
                      "Saya harus mulai dari mana?",
                      "Jelaskan langkah pertama.",
                      "Bagaimana cara menjualnya?",
                      "Bagaimana cara mendapatkan pembeli?",
                    ].map((question) => (

                      <button
                        key={question}
                        type="button"
                        disabled={chatLoading}
                        onClick={() => setChatInput(question)}
                        className="shrink-0 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-[11px] text-gray-500 transition hover:border-yellow-400/20 hover:text-yellow-400 disabled:opacity-50"
                      >
                        {question}
                      </button>

                    ))}

                  </div>


                  {/* CHAT */}
                  {chatMessages.length > 0 && (
                    <div className="mb-4 max-h-[420px] space-y-3 overflow-y-auto pr-1">

                      {chatMessages.map((message, index) => (

                        <div
                          key={index}
                          className={`flex ${
                            message.role === "user"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >

                          <div
                            className={`max-w-[92%] rounded-2xl px-4 py-3 ${
                              message.role === "user"
                                ? "bg-yellow-400 text-black"
                                : "border border-white/[0.06] bg-[#171717] text-gray-300"
                            }`}
                          >

                            <p className="whitespace-pre-wrap text-sm leading-6">
                              {message.message}
                            </p>

                          </div>

                        </div>

                      ))}


                      {chatLoading && (
                        <div className="flex justify-start">

                          <div className="rounded-2xl border border-white/[0.06] bg-[#171717] px-4 py-3">

                            <div className="flex gap-1">

                              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-yellow-400" />

                              <span
                                className="h-1.5 w-1.5 animate-bounce rounded-full bg-yellow-400"
                                style={{ animationDelay: "150ms" }}
                              />

                              <span
                                className="h-1.5 w-1.5 animate-bounce rounded-full bg-yellow-400"
                                style={{ animationDelay: "300ms" }}
                              />

                            </div>

                          </div>

                        </div>
                      )}

                    </div>
                  )}


                  {/* CHAT INPUT */}
                  <div className="rounded-xl border border-white/[0.07] bg-[#0a0a0a] p-2.5">

                    <textarea
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={handleChatKeyDown}
                      disabled={chatLoading}
                      rows={3}
                      placeholder="Contoh: Saya pemula, langkah pertama yang harus saya lakukan apa?"
                      className="w-full resize-none bg-transparent px-2 py-1 text-sm leading-6 text-white outline-none placeholder:text-gray-600 disabled:opacity-50"
                    />


                    <div className="mt-2 flex items-center justify-between gap-3">

                      <p className="hidden px-2 text-[10px] text-gray-700 sm:block">
                        Enter untuk mengirim • Shift + Enter untuk baris baru
                      </p>

                      <button
                        type="button"
                        onClick={handleAskAI}
                        disabled={chatLoading || !chatInput.trim()}
                        className="ml-auto rounded-lg bg-yellow-400 px-4 py-2.5 text-xs font-black text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {chatLoading ? "Berpikir..." : "Tanya AI →"}
                      </button>

                    </div>

                  </div>

                </div>

              </div>
            )}

                    </div>
        </div>
      </div>
    </section>
  );
}