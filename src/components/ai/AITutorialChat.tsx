import { useState } from "react";
import { BookOpen, MessageCircle, Rocket, Send, Sparkles } from "lucide-react";
import { generateText } from "../../services/ai";

type TutorialStep = {
  title: string;
  description: string;
};

type AITutorialChatProps = {
  featureName: string;
  projectContext: string;
  tutorial: TutorialStep[];
  actionPlan: string[];
};

export default function AITutorialChat({
  featureName,
  projectContext,
  tutorial,
  actionPlan,
}: AITutorialChatProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAskAI() {
    if (!question.trim()) {
      alert("Silakan tulis pertanyaan terlebih dahulu.");
      return;
    }

    try {
      setLoading(true);

      const systemPrompt = `
Kamu adalah mentor AI untuk Rife Digital AI.

Target pengguna adalah pemula total yang bahkan bisa saja belum pernah
menggunakan tools digital sebelumnya.

Karena itu:
- gunakan bahasa Indonesia yang sangat sederhana
- jangan menggunakan istilah teknis tanpa menjelaskannya
- jelaskan langkah demi langkah
- jangan menganggap pengguna sudah paham
- berikan contoh nyata
- jika ada beberapa cara, pilih cara yang paling mudah untuk pemula
- jangan membuat pengguna bingung dengan terlalu banyak pilihan
- jawab dengan ramah dan sabar
- fokus membantu pengguna benar-benar menyelesaikan tugasnya

Kamu sedang membantu pengguna menggunakan fitur:
${featureName}

Konteks project:
${projectContext}

Jawab pertanyaan pengguna berdasarkan konteks project tersebut.
`;

      const userPrompt = `
Pertanyaan pengguna:

${question}

Berikan jawaban yang:
1. langsung menjawab pertanyaan
2. mudah dipahami pemula
3. memiliki langkah-langkah yang jelas
4. memberikan contoh jika diperlukan
5. menjelaskan apa yang harus diklik/dibuat/dilakukan
6. memberi tips agar pengguna tidak salah langkah
`;

      const response = await generateText({
        systemPrompt,
        userPrompt,
      });

      setAnswer(response.trim());
    } catch (error) {
      console.error("TANYA AI ERROR:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Gagal mendapatkan jawaban AI. Silakan coba lagi."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8 space-y-6">
      {/* ===================================================== */}
      {/* TUTORIAL LENGKAP */}
      {/* ===================================================== */}

      <section className="rounded-3xl border border-yellow-400/20 bg-[#151515] p-6 lg:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-400 text-black">
            <BookOpen size={22} />
          </div>

          <div>
            <h2 className="text-xl font-black text-white">
              Tutorial Lengkap Untuk Pemula
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Ikuti langkah berikut dari awal. Tidak perlu memiliki pengalaman
              sebelumnya.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {tutorial.map((step, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-[#1B1B1B] p-5"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-yellow-400 text-sm font-black text-black">
                  {index + 1}
                </div>

                <div className="min-w-0">
                  <h3 className="font-bold text-white">
                    Langkah {index + 1} - {step.title}
                  </h3>

                  <p className="mt-3 whitespace-pre-line leading-7 text-gray-300">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================== */}
      {/* ACTION PLAN */}
      {/* ===================================================== */}

      <section className="rounded-3xl border border-blue-500/20 bg-[#151515] p-6 lg:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-400">
            <Rocket size={22} />
          </div>

          <div>
            <h2 className="text-xl font-black text-white">
              Action Plan 7 Hari
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Ikuti rencana ini satu per satu. Tidak perlu menyelesaikan
              semuanya sekaligus.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {actionPlan.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#1B1B1B] p-4"
            >
              <div className="rounded-xl bg-blue-500/10 px-3 py-2 text-xs font-bold text-blue-400">
                Hari {index + 1}
              </div>

              <p className="text-sm leading-6 text-gray-300">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================== */}
      {/* TANYA AI */}
      {/* ===================================================== */}

      <section className="rounded-3xl border border-yellow-400/20 bg-gradient-to-b from-yellow-400/10 to-[#151515] p-6 lg:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-400 text-black">
            <MessageCircle size={22} />
          </div>

          <div>
            <h2 className="text-xl font-black text-white">
              Tanya AI
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Bingung dengan hasil di atas? Tanyakan apa saja kepada AI.
              AI akan menjawab berdasarkan project ini.
            </p>
          </div>
        </div>

        {/* Contoh pertanyaan */}
        <div className="mt-6">
          <p className="mb-3 text-xs font-semibold text-gray-500">
            Contoh pertanyaan:
          </p>

          <div className="flex flex-wrap gap-2">
            {[
              "Saya pemula, harus mulai dari mana?",
              "Jelaskan langkah pertama lebih sederhana.",
              "Saya belum bisa menggunakan tools ini.",
              "Bagaimana cara mendapatkan pembeli pertama?",
            ].map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => setQuestion(example)}
                className="rounded-full border border-white/10 bg-[#1B1B1B] px-4 py-2 text-xs text-gray-300 transition hover:border-yellow-400/40 hover:text-yellow-400"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="mt-5">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={`Contoh: Kak, saya belum pernah menggunakan fitur ${featureName}. Bisa ajari saya mulai dari langkah pertama?`}
            className="min-h-[120px] w-full resize-none rounded-2xl border border-white/10 bg-[#111111] p-5 text-sm leading-7 text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-400/50"
          />
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            Tekan Enter untuk bertanya. Shift + Enter untuk baris baru.
          </p>

          <button
            type="button"
            onClick={handleAskAI}
            disabled={loading}
            className="flex shrink-0 items-center gap-2 rounded-2xl bg-yellow-400 px-6 py-3 font-bold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Sparkles size={18} />
                AI Sedang Menjawab...
              </>
            ) : (
              <>
                <Send size={18} />
                Tanya AI
              </>
            )}
          </button>
        </div>

        {/* Jawaban AI */}
        {answer && (
          <div className="mt-6 rounded-2xl border border-green-500/20 bg-green-500/5 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
                <Sparkles size={18} />
              </div>

              <h3 className="font-bold text-white">
                Jawaban Rife AI
              </h3>
            </div>

            <div className="mt-5 whitespace-pre-line leading-8 text-gray-300">
              {answer}
            </div>
          </div>
        )}
      </section>

      {/* ===================================================== */}
      {/* TIPS PEMULA */}
      {/* ===================================================== */}

      <section className="rounded-2xl border border-yellow-400/10 bg-yellow-400/5 p-5">
        <h3 className="font-bold text-yellow-400">
          💡 Masih pemula?
        </h3>

        <p className="mt-2 text-sm leading-7 text-gray-400">
          Tidak perlu langsung menyelesaikan semuanya. Ikuti tutorial di atas
          langkah demi langkah. Kalau mengalami kesulitan, gunakan fitur
          <span className="font-semibold text-yellow-400"> Tanya AI </span>
          dan jelaskan bagian mana yang membuat kamu bingung.
        </p>
      </section>
    </div>
  );
}