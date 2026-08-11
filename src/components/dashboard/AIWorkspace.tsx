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
    <section className="mt-8">
      <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[#111]">

        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-white/10 px-8 py-6">

          <div>
            <h2 className="text-3xl font-black text-white">
              AI Workspace
            </h2>

            <p className="mt-2 text-gray-400">
              Bangun produk digital dengan bantuan AI.
            </p>
          </div>

          <div className="rounded-full bg-yellow-500/10 px-4 py-2 text-sm font-bold text-yellow-400">
            Rife AI
          </div>

        </div>

        {/* BODY */}
        <div className="grid gap-8 p-8 lg:grid-cols-[1.2fr_.8fr]">

          {/* LEFT */}
          <div className="space-y-6">

            {/* PROMPT */}
            <div className="rounded-3xl border border-white/10 bg-[#0d0d0d] p-6">

              <div className="mb-5 flex items-center justify-between">

                <h3 className="text-xl font-bold text-white">
                  AI Prompt
                </h3>

                <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-bold text-yellow-400">
                  Premium
                </span>

              </div>

              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={loading}
                rows={10}
                className="w-full resize-none bg-transparent text-white outline-none placeholder:text-gray-500 disabled:opacity-50"
                placeholder="Tulis prompt AI di sini..."
              />

            </div>

            {/* QUICK PROMPT */}
            <div>

              <p className="mb-3 text-sm font-semibold text-gray-300">
                Quick Prompt
              </p>

              <div className="flex flex-wrap gap-3">

                {quickPrompts.map((item) => (
                  <button
                    key={item}
                    type="button"
                    disabled={loading}
                    onClick={() => handleQuickPrompt(item)}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 transition hover:border-yellow-500 hover:text-yellow-400 disabled:opacity-50"
                  >
                    {item}
                  </button>
                ))}

              </div>

            </div>

            {/* ERROR */}
            {error && (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* BUTTON */}
            <div className="flex gap-4">

              <button
                type="button"
                onClick={handleGenerate}
                disabled={loading}
                className="rounded-2xl bg-yellow-500 px-8 py-4 font-bold text-black transition hover:bg-yellow-400 disabled:cursor-wait disabled:opacity-50"
              >
                {loading
                  ? "⏳ AI Sedang Berpikir..."
                  : "⚡ Generate AI"}
              </button>

              <button
                type="button"
                onClick={handleClear}
                disabled={loading}
                className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-white transition hover:border-white/30 disabled:opacity-50"
              >
                Clear
              </button>

            </div>

          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* STATUS */}
            <div
              className={`rounded-3xl border p-6 ${
                loading
                  ? "border-yellow-500/20 bg-yellow-500/10"
                  : "border-green-500/20 bg-green-500/10"
              }`}
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-green-400">
                    Status AI
                  </p>

                  <h3 className="mt-2 text-2xl font-black text-white">
                    {loading
                      ? "Generating..."
                      : result
                      ? "Generated"
                      : "Ready to Generate"}
                  </h3>

                </div>

                <div className="text-5xl">
                  {loading ? "⏳" : "🤖"}
                </div>

              </div>

            </div>

            {/* RESPONSE */}
            <div className="rounded-3xl border border-yellow-500/20 bg-yellow-500/5 p-6">

              <div className="flex items-center justify-between">

                <h3 className="text-2xl font-black text-white">
                  AI Response
                </h3>

                {result && !loading && (
                  <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm font-semibold text-green-400">
                    ✓ Generated
                  </span>
                )}

              </div>

              {/* EMPTY */}
              {!result && !loading && (
                <div className="mt-6 rounded-2xl bg-[#181818] p-6">

                  <p className="text-gray-500">
                    Hasil AI akan muncul di sini setelah kamu
                    menekan tombol Generate AI.
                  </p>

                </div>
              )}

              {/* LOADING */}
              {loading && (
                <div className="mt-6 rounded-2xl bg-[#181818] p-8 text-center">

                  <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-white/10 border-t-yellow-400" />

                  <p className="mt-4 text-sm text-gray-500">
                    Rife AI sedang membuat hasil...
                  </p>

                </div>
              )}

              {/* RESULT */}
              {result && !loading && (
                <div className="mt-6 space-y-4">

                  {/* NAMA PRODUK */}
                  <div className="rounded-2xl bg-[#181818] p-5">

                    <p className="text-sm text-gray-500">
                      📦 Nama Produk
                    </p>

                    <h4 className="mt-2 text-xl font-bold text-white">
                      {result.productName}
                    </h4>

                  </div>

                  {/* TARGET */}
                  <div className="rounded-2xl bg-[#181818] p-5">

                    <p className="text-sm text-gray-500">
                      🎯 Target Pasar
                    </p>

                    <p className="mt-2 leading-7 text-white">
                      {result.targetMarket}
                    </p>

                  </div>

                  {/* PRICE */}
                  <div className="rounded-2xl bg-[#181818] p-5">

                    <p className="text-sm text-gray-500">
                      💰 Harga Jual
                    </p>

                    <p className="mt-2 text-2xl font-black text-yellow-400">
                      {result.price}
                    </p>

                  </div>

                  {/* PROFIT */}
                  <div className="rounded-2xl bg-[#181818] p-5">

                    <p className="text-sm text-gray-500">
                      📈 Estimasi Profit
                    </p>

                    <p className="mt-2 text-2xl font-black text-green-400">
                      {result.estimatedProfit}
                    </p>

                    <p className="mt-2 text-xs text-gray-500">
                      Perkiraan AI, bukan jaminan hasil.
                    </p>

                  </div>

                  {/* HASIL */}
                  <div className="rounded-2xl bg-[#181818] p-5">

                    <p className="text-sm text-gray-500">
                      📝 Hasil AI
                    </p>

                    <p className="mt-4 whitespace-pre-wrap leading-7 text-gray-300">
                      {result.result}
                    </p>

                  </div>

                  {/* TUTORIAL */}
                  <div className="rounded-3xl border border-yellow-500/20 bg-[#151515] p-6">

                    <div className="mb-6 flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500 text-xl">
                        📚
                      </div>

                      <div>

                        <h3 className="text-xl font-black text-white">
                          Tutorial Lengkap
                        </h3>

                        <p className="text-sm text-gray-500">
                          Ikuti langkah berikut dari awal sampai siap dijual.
                        </p>

                      </div>

                    </div>

                    <div className="space-y-5">

                      {result.tutorial.map((tutorial, index) => (
                        <div
                          key={index}
                          className="rounded-2xl border border-white/10 bg-[#181818] p-5"
                        >

                          <div className="flex items-start gap-4">

                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-yellow-500 text-sm font-black text-black">
                              {index + 1}
                            </div>

                            <div className="min-w-0 flex-1">

                              <h4 className="text-lg font-bold text-white">
                                {tutorial.title}
                              </h4>

                              <div className="mt-4 space-y-3">

                                {tutorial.steps.map(
                                  (step, stepIndex) => (
                                    <div
                                      key={stepIndex}
                                      className="flex gap-3"
                                    >

                                      <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs text-gray-400">
                                        {stepIndex + 1}
                                      </div>

                                      <p className="leading-6 text-gray-300">
                                        {step}
                                      </p>

                                    </div>
                                  )
                                )}

                              </div>

                            </div>

                          </div>

                        </div>
                      ))}

                    </div>

                  </div>

                  {/* ACTION PLAN */}
                  <div className="rounded-3xl border border-blue-500/20 bg-[#151515] p-6">

                    <div className="mb-6 flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-xl">
                        🚀
                      </div>

                      <div>

                        <h3 className="text-xl font-black text-white">
                          Action Plan 7 Hari
                        </h3>

                        <p className="text-sm text-gray-500">
                          Rencana sederhana untuk mulai menjalankan produk.
                        </p>

                      </div>

                    </div>

                    <div className="space-y-3">

                      {result.actionPlan.map((plan, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#181818] p-4"
                        >

                          <div className="rounded-lg bg-blue-500/10 px-3 py-2 text-xs font-bold text-blue-400">
                            {plan.day}
                          </div>

                          <p className="leading-6 text-gray-300">
                            {plan.task}
                          </p>

                        </div>
                      ))}

                    </div>

                  </div>

                  {/* TANYA AI */}
                  <div className="rounded-3xl border border-yellow-500/20 bg-[#151515] p-6">

                    <div className="mb-6 flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500 text-xl">
                        💬
                      </div>

                      <div>

                        <h3 className="text-xl font-black text-white">
                          Tanya AI
                        </h3>

                        <p className="text-sm text-gray-500">
                          Bingung dengan hasil di atas? Tanya apa saja kepada AI.
                        </p>

                      </div>

                    </div>

                    {/* QUICK QUESTIONS */}
                    <div className="mb-5 flex flex-wrap gap-2">

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
                          onClick={() => {
                            setChatInput(question);
                          }}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-400 transition hover:border-yellow-500 hover:text-yellow-400 disabled:opacity-50"
                        >
                          {question}
                        </button>
                      ))}

                    </div>

                    {/* CHAT MESSAGES */}
                    {chatMessages.length > 0 && (
                      <div className="mb-5 max-h-[500px] space-y-4 overflow-y-auto pr-2">

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
                              className={`max-w-[90%] rounded-2xl px-4 py-3 ${
                                message.role === "user"
                                  ? "bg-yellow-500 text-black"
                                  : "bg-[#1c1c1c] text-gray-300"
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

                            <div className="rounded-2xl bg-[#1c1c1c] px-5 py-4">

                              <div className="flex gap-1">

                                <span className="h-2 w-2 animate-bounce rounded-full bg-yellow-400" />

                                <span
                                  className="h-2 w-2 animate-bounce rounded-full bg-yellow-400"
                                  style={{
                                    animationDelay: "150ms",
                                  }}
                                />

                                <span
                                  className="h-2 w-2 animate-bounce rounded-full bg-yellow-400"
                                  style={{
                                    animationDelay: "300ms",
                                  }}
                                />

                              </div>

                            </div>

                          </div>
                        )}

                      </div>
                    )}

                    {/* CHAT INPUT */}
                    <div className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-3">

                      <textarea
                        value={chatInput}
                        onChange={(e) =>
                          setChatInput(e.target.value)
                        }
                        onKeyDown={handleChatKeyDown}
                        disabled={chatLoading}
                        rows={3}
                        placeholder="Contoh: Saya pemula, langkah pertama yang harus saya lakukan apa?"
                        className="w-full resize-none bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-gray-600 disabled:opacity-50"
                      />

                      <div className="mt-2 flex items-center justify-between">

                        <p className="px-2 text-xs text-gray-600">
                          Enter untuk mengirim • Shift + Enter untuk baris baru
                        </p>

                        <button
                          type="button"
                          onClick={handleAskAI}
                          disabled={
                            chatLoading ||
                            !chatInput.trim()
                          }
                          className="rounded-xl bg-yellow-500 px-5 py-3 text-sm font-bold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          {chatLoading
                            ? "Berpikir..."
                            : "Tanya AI →"}
                        </button>

                      </div>

                    </div>

                  </div>

                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}