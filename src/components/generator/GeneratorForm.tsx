import { useState } from "react";
import type { KeyboardEvent } from "react";

import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  MessageCircle,
  Sparkles,
} from "lucide-react";

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

  const [chatLoading, setChatLoading] = useState(false);

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
    const trimmedQuestion = question.trim();

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
              `${
                message.role === "user"
                  ? "USER"
                  : "AI"
              }: ${message.message}`
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

${
  previousConversation ||
  "Belum ada percakapan sebelumnya."
}

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
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#101010] shadow-[0_20px_80px_rgba(0,0,0,.25)]">
      {/* TOP GLOW */}

      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[500px] -translate-x-1/2 rounded-full bg-yellow-400/[0.05] blur-[100px]" />

      <div className="relative p-5 sm:p-7 lg:p-8">

        {/* ==============================
            HEADER
        ============================== */}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

          <div className="flex min-w-0 items-start gap-4">

            {/* ICON */}

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-400 text-black shadow-lg shadow-yellow-400/10">
              <Sparkles size={21} strokeWidth={2.5} />
            </div>

            {/* TITLE */}

            <div className="min-w-0">

              <div className="flex flex-wrap items-center gap-2">

                <h2 className="text-xl font-black tracking-tight text-white sm:text-2xl">
                  {title}
                </h2>

                <span className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-yellow-400">
                  AI
                </span>

              </div>

              <p className="mt-1.5 max-w-xl text-xs leading-6 text-gray-500 sm:text-sm">
                Isi beberapa informasi sederhana.
                Rife akan membantu membuat hasilnya untukmu.
              </p>

            </div>

          </div>

          {/* BEGINNER LABEL */}

          <div className="hidden shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 sm:flex">

            <HelpCircle
              size={13}
              className="text-yellow-400"
            />

            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-500">
              Tidak perlu jago AI
            </span>

          </div>

        </div>


        {/* ==============================
            SIMPLE GUIDE
        ============================== */}

        <div className="mt-6 grid gap-2 sm:grid-cols-3">

          <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.025] px-3 py-3">

            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-yellow-400/10 text-[10px] font-black text-yellow-400">
              01
            </div>

            <div>
              <p className="text-[11px] font-bold text-white">
                Ceritakan
              </p>

              <p className="text-[10px] text-gray-600">
                Isi kebutuhanmu
              </p>
            </div>

          </div>


          <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.025] px-3 py-3">

            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-yellow-400/10 text-[10px] font-black text-yellow-400">
              02
            </div>

            <div>
              <p className="text-[11px] font-bold text-white">
                Klik Generate
              </p>

              <p className="text-[10px] text-gray-600">
                Biar Rife yang bekerja
              </p>
            </div>

          </div>


          <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.025] px-3 py-3">

            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-yellow-400/10 text-[10px] font-black text-yellow-400">
              03
            </div>

            <div>
              <p className="text-[11px] font-bold text-white">
                Gunakan hasilnya
              </p>

              <p className="text-[10px] text-gray-600">
                Edit jika diperlukan
              </p>
            </div>

          </div>

        </div>


        {/* ==============================
            FORM
        ============================== */}

        <div className="mt-7">

          <div className="mb-4 flex items-center justify-between">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-400">
                Mulai di sini
              </p>

              <h3 className="mt-1 text-sm font-bold text-white">
                Ceritakan apa yang kamu butuhkan
              </h3>
            </div>

            <span className="hidden text-[10px] text-gray-600 sm:block">
              {fields.length} informasi
            </span>

          </div>


          <div className="grid gap-4 md:grid-cols-2">

            {fields.map((field, index) => {

              const currentValue =
                values[field.name] ??
                field.options?.[0] ??
                "";

              const fieldNumber =
                String(index + 1).padStart(2, "0");

              if (field.type === "select") {

                return (
                  <div
                    key={field.name}
                    className="group"
                  >

                    <label
                      htmlFor={field.name}
                      className="mb-2.5 flex items-center gap-2"
                    >

                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/[0.05] text-[8px] font-black text-gray-500">
                        {fieldNumber}
                      </span>

                      <span className="text-xs font-bold text-gray-300">
                        {field.label}
                      </span>

                    </label>

                    <div className="relative">

                      <select
                        id={field.name}
                        value={currentValue}
                        onChange={(e) =>
                          updateValue(
                            field.name,
                            e.target.value
                          )
                        }
                        className="
                          w-full
                          appearance-none
                          rounded-2xl
                          border
                          border-white/10
                          bg-[#171717]
                          px-4
                          py-4
                          pr-10
                          text-sm
                          font-medium
                          text-white
                          outline-none
                          transition-all
                          duration-200
                          hover:border-white/20
                          focus:border-yellow-400/50
                          focus:bg-[#1a1a1a]
                          focus:ring-4
                          focus:ring-yellow-400/[0.05]
                        "
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

                      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                        <ArrowRight
                          size={15}
                          className="rotate-90"
                        />
                      </div>

                    </div>

                  </div>
                );
              }

              return (
                <div
                  key={field.name}
                  className="group"
                >

                  <label
                    htmlFor={field.name}
                    className="mb-2.5 flex items-center gap-2"
                  >

                    <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/[0.05] text-[8px] font-black text-gray-500">
                      {fieldNumber}
                    </span>

                    <span className="text-xs font-bold text-gray-300">
                      {field.label}
                    </span>

                  </label>

                  <div className="relative">

                    <input
                      id={field.name}
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
                        `Contoh: ${field.label}`
                      }
                      className="
                        w-full
                        rounded-2xl
                        border
                        border-white/10
                        bg-[#171717]
                        px-4
                        py-4
                        text-sm
                        font-medium
                        text-white
                        outline-none
                        transition-all
                        duration-200
                        placeholder:text-gray-600
                        hover:border-white/20
                        focus:border-yellow-400/50
                        focus:bg-[#1a1a1a]
                        focus:ring-4
                        focus:ring-yellow-400/[0.05]
                      "
                    />

                  </div>

                </div>
              );
            })}

          </div>

        </div>


        {/* ==============================
            HELPER MESSAGE
        ============================== */}

        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-yellow-400/10 bg-yellow-400/[0.04] p-4">

          <Lightbulb
            size={17}
            className="mt-0.5 shrink-0 text-yellow-400"
          />

          <div>

            <p className="text-xs font-bold text-white">
              Bingung harus menulis apa?
            </p>

            <p className="mt-1 text-[11px] leading-5 text-gray-500">
              Tulis saja dengan bahasa sehari-hari.
              Tidak perlu membuat prompt khusus.
              Rife akan membantu memahami kebutuhanmu.
            </p>

          </div>

        </div>


        {/* ==============================
            GENERATE BUTTON
        ============================== */}

        <div className="mt-5">

          <GeneratorButton
            loading={loading}
            text={buttonText}
            onClick={handleGenerate}
          />

        </div>


        {/* ==============================
            HASIL AI
        ============================== */}

        {result && (
          <div className="mt-8 space-y-6">

            {/* RESULT HEADER */}

            <div>

              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-400">

                    <Sparkles size={12} />

                    AI RESULT

                  </p>

                  <h3 className="mt-1 text-xl font-black text-white">
                    Hasil {title}
                  </h3>

                </div>

                <div className="flex w-fit items-center gap-2 rounded-full border border-green-400/10 bg-green-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-green-400">

                  <CheckCircle2 size={12} />

                  Generated

                </div>

              </div>

              <GeneratorResult result={result} />

            </div>


            {/* ==============================
                TUTORIAL
            ============================== */}

            <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d0d]">

              <div className="border-b border-white/10 bg-[#111111] px-5 py-5 sm:px-6">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div>

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">

                        <BookOpen size={18} />

                      </div>

                      <div>

                        <h3 className="text-lg font-black text-white sm:text-xl">
                          Tutorial Lengkap
                        </h3>

                        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                          Belajar menggunakan hasil AI ini dari nol.
                        </p>

                      </div>

                    </div>

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
                      className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-yellow-400
                        px-5
                        py-3
                        text-xs
                        font-black
                        text-black
                        transition
                        hover:bg-yellow-300
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    >

                      <BookOpen size={15} />

                      {tutorialLoading
                        ? "Membuat Tutorial..."
                        : "Buat Tutorial"}

                    </button>
                  )}

                </div>

              </div>


              <div className="p-5 sm:p-6">

                {!tutorial &&
                  !tutorialLoading && (
                    <div className="rounded-2xl border border-white/5 bg-[#151515] p-5 sm:p-6">

                      <div className="flex items-start gap-4">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-400/10">

                          <Lightbulb
                            size={18}
                            className="text-yellow-400"
                          />

                        </div>

                        <div>

                          <h4 className="font-bold text-white">
                            Jangan cuma menghasilkan — pelajari juga caranya
                          </h4>

                          <p className="mt-2 text-xs leading-6 text-gray-500 sm:text-sm sm:leading-7">
                            Klik{" "}
                            <span className="font-semibold text-gray-300">
                              Buat Tutorial
                            </span>{" "}
                            untuk mendapatkan panduan sederhana
                            dari awal sampai kamu tahu cara
                            menggunakan hasil ini.
                          </p>

                        </div>

                      </div>

                    </div>
                  )}


                {tutorialLoading && (
                  <div className="rounded-2xl border border-white/5 bg-[#151515] p-8 text-center">

                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/10 border-t-yellow-400 animate-spin" />

                    <p className="mt-4 text-sm font-medium text-gray-400">
                      Rife sedang menyiapkan tutorial...
                    </p>

                    <p className="mt-1 text-xs text-gray-600">
                      Tunggu sebentar, hampir selesai.
                    </p>

                  </div>
                )}


                {tutorial &&
                  !tutorialLoading && (
                    <div className="rounded-2xl border border-white/5 bg-[#151515] p-5 sm:p-6">

                      <div className="mb-5 flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-400/10">

                          <BookOpen
                            size={16}
                            className="text-yellow-400"
                          />

                        </div>

                        <p className="text-sm font-bold text-yellow-400">
                          Panduan Lengkap
                        </p>

                      </div>

                      <div className="whitespace-pre-wrap text-xs leading-7 text-gray-300 sm:text-sm sm:leading-8">
                        {tutorial}
                      </div>

                    </div>
                  )}

              </div>

            </section>


            {/* ==============================
                TANYA AI
            ============================== */}

            <section className="overflow-hidden rounded-3xl border border-yellow-500/20 bg-[#0d0d0d]">

              <div className="border-b border-white/10 bg-[#111111] px-5 py-5 sm:px-6">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-400 text-black shadow-lg shadow-yellow-400/10">

                    <MessageCircle
                      size={19}
                    />

                  </div>

                  <div>

                    <div className="flex flex-wrap items-center gap-2">

                      <h3 className="text-lg font-black text-white sm:text-xl">
                        Tanya Rife
                      </h3>

                      <span className="rounded-full bg-yellow-400/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-yellow-400">
                        Mentor AI
                      </span>

                    </div>

                    <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                      Masih bingung? Tanyakan langsung ke Rife.
                    </p>

                  </div>

                </div>

              </div>


              <div className="p-5 sm:p-6">

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
                            className={`max-w-[92%] rounded-2xl px-4 py-4 sm:max-w-[85%] ${
                              message.role ===
                              "user"
                                ? "bg-yellow-400 text-black"
                                : "border border-white/10 bg-[#181818] text-gray-300"
                            }`}
                          >

                            <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.12em] opacity-60">
                              {message.role ===
                              "user"
                                ? "Kamu"
                                : "Rife AI"}
                            </p>

                            <p className="whitespace-pre-wrap text-xs leading-7 sm:text-sm">
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
                              Rife sedang berpikir...
                            </span>

                          </div>

                        </div>

                      </div>
                    )}

                  </div>
                )}


                {/* QUICK QUESTIONS */}

                <div className="mb-4">

                  <div className="mb-2 flex items-center gap-2">

                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-600">
                      Bingung mau tanya apa?
                    </span>

                  </div>

                  <div className="flex flex-wrap gap-2">

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
                          className="
                            rounded-full
                            border
                            border-white/10
                            bg-white/[0.03]
                            px-3
                            py-2
                            text-[10px]
                            text-gray-400
                            transition
                            hover:border-yellow-400/40
                            hover:bg-yellow-400/[0.05]
                            hover:text-yellow-400
                            disabled:opacity-50
                            sm:text-xs
                          "
                        >
                          {quickQuestion}
                        </button>

                      )
                    )}

                  </div>

                </div>


                {/* QUESTION INPUT */}

                <div className="rounded-2xl border border-white/10 bg-[#151515] p-3 transition focus-within:border-yellow-400/30">

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
                    placeholder="Contoh: Bagaimana cara menggunakan hasil ini?"
                    className="
                      w-full
                      resize-none
                      bg-transparent
                      px-3
                      py-2
                      text-xs
                      leading-7
                      text-white
                      outline-none
                      placeholder:text-gray-600
                      disabled:opacity-50
                      sm:text-sm
                    "
                  />

                  <div className="mt-2 flex flex-col gap-3 px-3 pb-1 sm:flex-row sm:items-center sm:justify-between">

                    <p className="text-[10px] text-gray-600">
                      Enter untuk mengirim • Shift + Enter untuk baris baru
                    </p>

                    <button
                      type="button"
                      onClick={handleAskAI}
                      disabled={
                        chatLoading ||
                        !question.trim()
                      }
                      className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-yellow-400
                        px-5
                        py-3
                        text-xs
                        font-black
                        text-black
                        transition
                        hover:bg-yellow-300
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                      "
                    >

                      {chatLoading
                        ? "AI Menjawab..."
                        : "Tanya Rife"}

                      {!chatLoading && (
                        <ArrowRight size={14} />
                      )}

                    </button>

                  </div>

                </div>

              </div>

            </section>

          </div>
        )}

      </div>
    </div>
  );
}


/* ==========================================
   HISTORY TOOL NAME
========================================== */

function getHistoryToolName(title: string) {
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