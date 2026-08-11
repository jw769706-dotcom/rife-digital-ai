import { useState } from "react";
import type { KeyboardEvent } from "react";

import { generateText } from "../../services/ai";

import {
  canGenerate,
  increaseUsage,
} from "../../lib/subscriptions";

import {
  createHistoryItem,
  saveHistory,
} from "../../lib/history";

import GeneratorButton from "./GeneratorButton";
import GeneratorResult from "./GeneratorResult";

type Field = {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "select";
  options?: string[];
};

type Props = {
  title: string;
  fields: Field[];
  buttonText: string;
  prompt: (values: Record<string, string>) => string;
  systemPrompt: string;
};

type ChatMessage = {
  role: "user" | "ai";
  message: string;
};

export default function GeneratorForm({
  title,
  fields,
  buttonText,
  prompt,
  systemPrompt,
}: Props) {
  const [values, setValues] =
    useState<Record<string, string>>({});

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState("");

  // ==============================
  // TUTORIAL
  // ==============================

  const [tutorial, setTutorial] = useState("");

  const [tutorialLoading, setTutorialLoading] =
    useState(false);

  // ==============================
  // TANYA AI
  // ==============================

  const [question, setQuestion] = useState("");

  const [chatMessages, setChatMessages] =
    useState<ChatMessage[]>([]);

  const [chatLoading, setChatLoading] =
    useState(false);

  // ==============================
  // UPDATE FORM
  // ==============================

  function updateValue(
    name: string,
    value: string
  ) {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // ==============================
  // GENERATE
  // ==============================

  async function handleGenerate() {
    setLoading(true);

    try {
      console.log("========== GENERATE ==========");

      const allowed = await canGenerate();

      console.log("ALLOWED =", allowed);

      if (!allowed) {
        setResult(
          "🚫 Limit gratis kamu hari ini sudah habis.\n\nUpgrade ke BASIC Rp49.000/bulan untuk melanjutkan."
        );

        return;
      }

      const userPrompt = prompt(values);

      const ai = await generateText({
        systemPrompt,
        userPrompt,
      });

      console.log("AI BERHASIL");

      await increaseUsage();

      console.log("increaseUsage BERHASIL");

      setResult(ai);

      // Reset tutorial dan chat
      setTutorial("");
      setQuestion("");
      setChatMessages([]);

      // ==============================
      // SIMPAN HISTORY
      // ==============================

      const historyItem = createHistoryItem(
        getHistoryToolName(title),
        userPrompt,
        ai
      );

      saveHistory(historyItem);

      /*
       * Beri tahu sidebar bahwa ada history baru.
       * AIWriterLayout akan menangkap event ini.
       */

      window.dispatchEvent(
        new Event("rife-history-updated")
      );

      console.log(
        "History berhasil disimpan:",
        historyItem
      );
    } catch (err) {
      console.error("ERROR :", err);

      setResult(
        "Terjadi kesalahan saat membuat hasil AI."
      );
    } finally {
      setLoading(false);
    }
  }

  // ==============================
  // TUTORIAL LENGKAP
  // ==============================

  async function handleGenerateTutorial() {
    if (!result) {
      return;
    }

    if (tutorialLoading) {
      return;
    }

    try {
      setTutorialLoading(true);

      const allowed = await canGenerate();

      if (!allowed) {
        setTutorial(
          "🚫 Limit gratis kamu hari ini sudah habis.\n\nUpgrade ke BASIC untuk melanjutkan."
        );

        return;
      }

      const ai = await generateText({
        systemPrompt: `
Kamu adalah mentor profesional di Rife Digital AI.

Kamu membantu pengguna PEMULA menggunakan hasil AI
yang sudah mereka buat.

Nama tools:
${title}

Jelaskan dengan bahasa Indonesia yang:
- sederhana
- jelas
- praktis
- mudah dipahami
- tidak terlalu teknis

Jangan hanya memberikan teori.

Berikan tutorial yang benar-benar bisa dilakukan.

Jika tool berhubungan dengan konten atau marketing,
jelaskan juga bagaimana cara menerapkannya di platform
yang sesuai.

Jangan menjanjikan hasil penjualan atau keuntungan pasti.
`,

        userPrompt: `
Saya baru saja menggunakan ${title}.

DATA INPUT:
${JSON.stringify(values, null, 2)}

HASIL AI:
${result}

Buat TUTORIAL LENGKAP dari nol.

Gunakan struktur:

1. Apa tujuan hasil ini
2. Kapan hasil ini digunakan
3. Langkah persiapan
4. Langkah 1
5. Langkah 2
6. Langkah 3
7. Langkah 4
8. Cara menerapkan hasil ini
9. Contoh penerapan
10. Kesalahan yang harus dihindari
11. Tips untuk pemula
12. Apa yang harus dilakukan setelah menerapkannya

Jelaskan setiap langkah dengan jelas.

Anggap pengguna benar-benar pemula dan belum pernah
menggunakan tool ini sebelumnya.
`,
      });

      await increaseUsage();

      setTutorial(ai);
    } catch (error) {
      console.error(
        "TUTORIAL ERROR:",
        error
      );

      setTutorial(
        "Terjadi kesalahan saat membuat tutorial. Silakan coba lagi."
      );
    } finally {
      setTutorialLoading(false);
    }
  }

  // ==============================
  // TANYA AI
  // ==============================

  async function handleAskAI() {
    const trimmedQuestion =
      question.trim();

    if (!trimmedQuestion) {
      return;
    }

    if (!result) {
      return;
    }

    if (chatLoading) {
      return;
    }

    try {
      setChatLoading(true);

      const allowed = await canGenerate();

      if (!allowed) {
        setChatMessages((prev) => [
          ...prev,
          {
            role: "ai",
            message:
              "🚫 Limit gratis kamu hari ini sudah habis.\n\nUpgrade ke BASIC untuk melanjutkan.",
          },
        ]);

        return;
      }

      // Tambahkan pertanyaan user
      setChatMessages((prev) => [
        ...prev,
        {
          role: "user",
          message: trimmedQuestion,
        },
      ]);

      setQuestion("");

      const previousConversation =
        chatMessages
          .map(
            (message) =>
              `${message.role === "user" ? "USER" : "AI"}: ${message.message}`
          )
          .join("\n\n");

      const ai = await generateText({
        systemPrompt: `
Kamu adalah Tanya AI dari Rife Digital AI.

Kamu berperan sebagai mentor pribadi pengguna.

Tool yang sedang digunakan:
${title}

DATA INPUT PENGGUNA:
${JSON.stringify(values, null, 2)}

HASIL AI:
${result}

TUTORIAL YANG SUDAH DIBUAT:
${tutorial || "Belum dibuat."}

Tugas kamu adalah menjawab pertanyaan pengguna
berdasarkan konteks tersebut.

ATURAN:

- Gunakan bahasa Indonesia.
- Jawab seperti mentor yang membantu pemula.
- Jangan terlalu rumit.
- Berikan langkah konkret.
- Jika pengguna bertanya "bagaimana caranya", berikan langkah demi langkah.
- Jika pengguna meminta revisi, berikan versi revisinya.
- Jika pengguna meminta contoh, berikan contoh.
- Jika pengguna bingung, jelaskan dengan bahasa yang lebih sederhana.
- Jangan memberikan janji keuntungan pasti.
- Jangan mengatakan "sebagai AI".
- Fokus pada pertanyaan pengguna.
`,

        userPrompt: `
Percakapan sebelumnya:

${previousConversation || "Belum ada percakapan sebelumnya."}

Pertanyaan terbaru pengguna:

${trimmedQuestion}

Jawab pertanyaan tersebut secara praktis dan jelas.
`,
      });

      await increaseUsage();

      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          message: ai,
        },
      ]);
    } catch (error) {
      console.error(
        "TANYA AI ERROR:",
        error
      );

      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          message:
            "Maaf, terjadi kesalahan. Silakan coba tanyakan lagi.",
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  }

  // ==============================
  // ENTER UNTUK TANYA AI
  // ==============================

  function handleQuestionKeyDown(
    event: KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      handleAskAI();
    }
  }

  // ==============================
  // RENDER
  // ==============================

  return (
    <div className="rounded-3xl border border-white/10 bg-[#111111] p-8">

      {/* HEADER */}

      <div>
        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500/10 text-xl">
            ✨
          </div>

          <div>
            <h2 className="text-3xl font-black text-white">
              {title}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Buat hasil profesional dengan bantuan Rife AI.
            </p>
          </div>

        </div>
      </div>

      {/* FORM */}

      <div className="mt-8 grid gap-6 md:grid-cols-2">

        {fields.map((field) => {

          if (field.type === "select") {
            return (
              <select
                key={field.name}
                value={
                  values[field.name] ??
                  field.options?.[0] ??
                  ""
                }
                onChange={(e) =>
                  updateValue(
                    field.name,
                    e.target.value
                  )
                }
                className="rounded-2xl border border-white/10 bg-[#1B1B1B] px-5 py-4 text-white outline-none transition focus:border-yellow-400"
              >

                {field.options?.map(
                  (option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  )
                )}

              </select>
            );
          }

          return (
            <input
              key={field.name}
              value={
                values[field.name] ?? ""
              }
              onChange={(e) =>
                updateValue(
                  field.name,
                  e.target.value
                )
              }
              placeholder={
                field.placeholder ||
                field.label
              }
              className="rounded-2xl border border-white/10 bg-[#1B1B1B] px-5 py-4 text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-400"
            />
          );
        })}

      </div>

      {/* GENERATE BUTTON */}

      <GeneratorButton
        loading={loading}
        text={buttonText}
        onClick={handleGenerate}
      />

      {/* ==============================
          HASIL AI
      ============================== */}

      {result && (
        <div className="mt-8 space-y-6">

          <div>

            <div className="mb-4 flex items-center justify-between">

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-400">
                  AI RESULT
                </p>

                <h3 className="mt-1 text-xl font-black text-white">
                  Hasil {title}
                </h3>

              </div>

              <div className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-bold text-green-400">
                ✓ Generated
              </div>

            </div>

            <GeneratorResult result={result} />

          </div>

          {/* ==============================
              TUTORIAL
          ============================== */}

          <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#0D0D0D]">

            <div className="border-b border-white/10 bg-[#111111] px-6 py-5">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <div className="flex items-center gap-2">

                    <span className="text-xl">
                      📚
                    </span>

                    <h3 className="text-xl font-black text-white">
                      Tutorial Lengkap
                    </h3>

                  </div>

                  <p className="mt-2 text-sm text-gray-500">
                    Panduan langkah demi langkah menggunakan hasil AI ini.
                  </p>

                </div>

                {!tutorial && (
                  <button
                    type="button"
                    onClick={
                      handleGenerateTutorial
                    }
                    disabled={
                      tutorialLoading
                    }
                    className="rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {tutorialLoading
                      ? "⏳ Membuat Tutorial..."
                      : "📚 Buat Tutorial"}
                  </button>
                )}

              </div>

            </div>

            <div className="p-6">

              {!tutorial &&
                !tutorialLoading && (
                  <div className="rounded-2xl border border-white/5 bg-[#151515] p-6">

                    <div className="flex items-start gap-4">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-500/10">
                        📖
                      </div>

                      <div>

                        <h4 className="font-bold text-white">
                          Belajar dari hasil AI
                        </h4>

                        <p className="mt-2 text-sm leading-7 text-gray-500">
                          Klik tombol{" "}
                          <span className="font-semibold text-gray-300">
                            Buat Tutorial
                          </span>{" "}
                          untuk mendapatkan panduan lengkap
                          dari awal sampai bisa menerapkannya.
                        </p>

                      </div>

                    </div>

                  </div>
                )}

              {tutorialLoading && (
                <div className="rounded-2xl border border-white/5 bg-[#151515] p-8 text-center">

                  <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-white/10 border-t-yellow-400" />

                  <p className="mt-4 text-sm text-gray-400">
                    Rife AI sedang membuat tutorial lengkap...
                  </p>

                </div>
              )}

              {tutorial &&
                !tutorialLoading && (
                  <div className="rounded-2xl border border-white/5 bg-[#151515] p-6">

                    <div className="mb-5 flex items-center gap-2">

                      <span className="text-lg">
                        🎓
                      </span>

                      <p className="text-sm font-bold text-yellow-400">
                        Panduan Lengkap
                      </p>

                    </div>

                    <div className="whitespace-pre-wrap text-sm leading-8 text-gray-300">
                      {tutorial}
                    </div>

                  </div>
                )}

            </div>

          </section>

          {/* ==============================
              TANYA AI
          ============================== */}

          <section className="overflow-hidden rounded-3xl border border-yellow-500/20 bg-[#0D0D0D]">

            <div className="border-b border-white/10 bg-[#111111] px-6 py-5">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500 text-xl">
                  🤖
                </div>

                <div>

                  <div className="flex items-center gap-2">

                    <h3 className="text-xl font-black text-white">
                      Tanya AI
                    </h3>

                    <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-yellow-400">
                      Mentor
                    </span>

                  </div>

                  <p className="mt-1 text-sm text-gray-500">
                    Tanyakan apa pun tentang hasil AI ini.
                  </p>

                </div>

              </div>

            </div>

            <div className="p-6">

              {/* CHAT MESSAGES */}

              {chatMessages.length > 0 && (
                <div className="mb-6 max-h-[500px] space-y-4 overflow-y-auto pr-1">

                  {chatMessages.map(
                    (message, index) => (

                      <div
                        key={`${message.role}-${index}`}
                        className={`flex ${
                          message.role === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >

                        <div
                          className={`max-w-[90%] rounded-2xl px-5 py-4 ${
                            message.role === "user"
                              ? "bg-yellow-400 text-black"
                              : "border border-white/10 bg-[#181818] text-gray-300"
                          }`}
                        >

                          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider opacity-60">
                            {message.role ===
                            "user"
                              ? "Kamu"
                              : "Rife AI"}
                          </p>

                          <p className="whitespace-pre-wrap text-sm leading-7">
                            {message.message}
                          </p>

                        </div>

                      </div>

                    )
                  )}

                  {chatLoading && (
                    <div className="flex justify-start">

                      <div className="rounded-2xl border border-white/10 bg-[#181818] px-5 py-4">

                        <div className="flex items-center gap-2">

                          <div className="h-2 w-2 animate-bounce rounded-full bg-yellow-400" />

                          <div
                            className="h-2 w-2 animate-bounce rounded-full bg-yellow-400"
                            style={{
                              animationDelay:
                                "150ms",
                            }}
                          />

                          <div
                            className="h-2 w-2 animate-bounce rounded-full bg-yellow-400"
                            style={{
                              animationDelay:
                                "300ms",
                            }}
                          />

                          <span className="ml-2 text-xs text-gray-500">
                            Rife AI sedang berpikir...
                          </span>

                        </div>

                      </div>

                    </div>
                  )}

                </div>
              )}

              {/* QUICK QUESTIONS */}

              <div className="mb-4 flex flex-wrap gap-2">

                {[
                  "Bagaimana cara menggunakannya?",
                  "Buat versi yang lebih menarik",
                  "Buat versi yang lebih singkat",
                  "Berikan saya contohnya",
                ].map(
                  (quickQuestion) => (

                    <button
                      key={quickQuestion}
                      type="button"
                      disabled={chatLoading}
                      onClick={() =>
                        setQuestion(
                          quickQuestion
                        )
                      }
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-400 transition hover:border-yellow-400/50 hover:text-yellow-400 disabled:opacity-50"
                    >
                      {quickQuestion}
                    </button>

                  )
                )}

              </div>

              {/* QUESTION INPUT */}

              <div className="rounded-2xl border border-white/10 bg-[#151515] p-3">

                <textarea
                  value={question}
                  onChange={(e) =>
                    setQuestion(
                      e.target.value
                    )
                  }
                  onKeyDown={
                    handleQuestionKeyDown
                  }
                  disabled={chatLoading}
                  rows={4}
                  placeholder="Contoh: Bagaimana cara menggunakan hasil ini untuk mendapatkan lebih banyak pembeli?"
                  className="w-full resize-none bg-transparent px-3 py-2 text-sm leading-7 text-white outline-none placeholder:text-gray-600 disabled:opacity-50"
                />

                <div className="mt-2 flex flex-col gap-3 px-3 pb-1 sm:flex-row sm:items-center sm:justify-between">

                  <p className="text-[11px] text-gray-600">
                    Enter untuk mengirim • Shift + Enter untuk baris baru
                  </p>

                  <button
                    type="button"
                    onClick={handleAskAI}
                    disabled={
                      chatLoading ||
                      !question.trim()
                    }
                    className="rounded-xl bg-yellow-400 px-6 py-3 text-sm font-bold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {chatLoading
                      ? "AI Menjawab..."
                      : "Tanya AI →"}
                  </button>

                </div>

              </div>

            </div>

          </section>

        </div>
      )}

    </div>
  );
}


/* ==========================================
   HISTORY TOOL NAME
========================================== */

function getHistoryToolName(
  title: string
) {
  const normalized = title
    .toLowerCase()
    .trim();

  if (
    normalized.includes("caption")
  ) {
    return "Caption Instagram";
  }

  if (
    normalized.includes("landing")
  ) {
    return "Landing Page";
  }

  if (
    normalized.includes("email")
  ) {
    return "Email Marketing";
  }

  if (
    normalized.includes("seo") ||
    normalized.includes("artikel")
  ) {
    return "Artikel SEO";
  }

  if (
    normalized.includes("copy")
  ) {
    return "Copywriting";
  }

  if (
    normalized.includes("reels") ||
    normalized.includes("script")
  ) {
    return "Script Reels";
  }

  return title;
}