import { useState } from "react";
import jsPDF from "jspdf";
import type { ProductAIResult } from "../../pages/AIProduct";
import { generateText } from "../../services/ai";

type ProductResultProps = {
  result: ProductAIResult | null;
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function ProductResult({
  result,
}: ProductResultProps) {
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);

  const [question, setQuestion] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(
    []
  );

  if (!result) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400/10 text-3xl">
            ✨
          </div>

          <h2 className="mt-5 text-2xl font-black text-white">
            Hasil AI
          </h2>

          <p className="mt-2 max-w-md text-gray-500">
            Isi informasi produk di atas, lalu klik{" "}
            <span className="font-semibold text-yellow-400">
              Generate Produk AI
            </span>{" "}
            untuk mendapatkan hasil dari AI.
          </p>
        </div>
      </div>
    );
  }

  const handleCopy = async () => {
    const tutorialText = result.tutorial
      .map(
        (section) =>
          `${section.title}\n${section.steps
            .map((step, index) => `${index + 1}. ${step}`)
            .join("\n")}`
      )
      .join("\n\n");

    const actionPlanText = result.actionPlan
      .map((item) => `${item.day}: ${item.task}`)
      .join("\n");

    const text = `
RIFE DIGITAL AI

NAMA PRODUK
${result.productName}

TARGET PASAR
${result.targetMarket.map((item) => `• ${item}`).join("\n")}

HARGA REKOMENDASI
${result.recommendedPrice}

VALUE PROPOSITION
${result.valueProposition}

STRATEGI LAUNCHING
${result.launchStrategy.map((item) => `• ${item}`).join("\n")}

ESTIMASI PROFIT
${result.estimatedProfit}

TUTORIAL LENGKAP

${tutorialText}

ACTION PLAN 7 HARI

${actionPlanText}

Dibuat dengan Rife Digital AI.
    `.trim();

    try {
      await navigator.clipboard.writeText(text);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Gagal menyalin:", error);
      alert("Gagal menyalin hasil AI.");
    }
  };

  const handleExportPDF = () => {
    try {
      setExporting(true);

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const margin = 20;
      const contentWidth = pageWidth - margin * 2;

      let y = 20;

      const checkPage = (space = 10) => {
        if (y > pageHeight - space) {
          pdf.addPage();
          y = 20;
        }
      };

      const addTitle = (title: string) => {
        checkPage(25);

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(12);
        pdf.setTextColor(190, 140, 0);

        pdf.text(title, margin, y);

        y += 7;
      };

      const addParagraph = (
        text: string,
        fontSize = 10,
        lineHeight = 5
      ) => {
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(fontSize);
        pdf.setTextColor(45, 45, 45);

        const lines = pdf.splitTextToSize(
          text,
          contentWidth
        );

        for (const line of lines) {
          checkPage(20);

          pdf.text(line, margin, y);
          y += lineHeight;
        }

        y += 3;
      };

      // Header
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(22);
      pdf.setTextColor(20, 20, 20);

      pdf.text("Rife Digital AI", margin, y);

      y += 8;

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(120, 120, 120);

      pdf.text(
        "AI Product Strategy & Beginner Guide",
        margin,
        y
      );

      y += 10;

      pdf.setDrawColor(220, 220, 220);
      pdf.line(
        margin,
        y,
        pageWidth - margin,
        y
      );

      y += 12;

      // Product
      addTitle("Nama Produk");

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(18);
      pdf.setTextColor(25, 25, 25);

      const productNameLines =
        pdf.splitTextToSize(
          result.productName,
          contentWidth
        );

      for (const line of productNameLines) {
        checkPage(20);

        pdf.text(line, margin, y);
        y += 7;
      }

      y += 6;

      // Target
      addTitle("Target Pasar");

      result.targetMarket.forEach((target) => {
        addParagraph(`• ${target}`);
      });

      // Harga
      addTitle("Harga Rekomendasi");

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(16);
      pdf.setTextColor(20, 150, 90);

      pdf.text(
        result.recommendedPrice,
        margin,
        y
      );

      y += 10;

      // Value
      addTitle("Value Proposition");

      addParagraph(
        result.valueProposition
      );

      // Launch
      addTitle("Strategi Launching");

      result.launchStrategy.forEach(
        (strategy) => {
          addParagraph(`• ${strategy}`);
        }
      );

      // Profit
      addTitle("Estimasi Profit");

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(20);
      pdf.setTextColor(20, 150, 90);

      pdf.text(
        result.estimatedProfit,
        margin,
        y
      );

      y += 10;

      addParagraph(
        "Perkiraan berdasarkan 100 penjualan.",
        9,
        5
      );

      // Tutorial
      addTitle("Tutorial Lengkap Untuk Pemula");

      result.tutorial.forEach(
        (section, sectionIndex) => {
          checkPage(30);

          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(11);
          pdf.setTextColor(30, 30, 30);

          const sectionTitle =
            `${sectionIndex + 1}. ${section.title}`;

          pdf.text(
            sectionTitle,
            margin,
            y
          );

          y += 7;

          section.steps.forEach(
            (step, stepIndex) => {
              addParagraph(
                `${stepIndex + 1}. ${step}`,
                9,
                4.8
              );
            }
          );

          y += 3;
        }
      );

      // Action Plan
      addTitle("Action Plan 7 Hari");

      result.actionPlan.forEach(
        (item) => {
          checkPage(25);

          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(10);
          pdf.setTextColor(30, 30, 30);

          pdf.text(
            item.day,
            margin,
            y
          );

          y += 5;

          addParagraph(
            item.task,
            9,
            4.8
          );

          y += 2;
        }
      );

      // Footer
      checkPage(20);

      pdf.setDrawColor(220, 220, 220);

      pdf.line(
        margin,
        y,
        pageWidth - margin,
        y
      );

      y += 7;

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      pdf.setTextColor(130, 130, 130);

      pdf.text(
        "Dibuat dengan Rife Digital AI",
        margin,
        y
      );

      const safeName = result.productName
        .replace(/[^a-zA-Z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .slice(0, 80);

      pdf.save(
        `${safeName || "produk-digital"}-Rife-Digital-AI.pdf`
      );
    } catch (error) {
      console.error(
        "Gagal membuat PDF:",
        error
      );

      alert(
        "Gagal membuat PDF. Silakan coba lagi."
      );
    } finally {
      setExporting(false);
    }
  };

  const handleAskAI = async () => {
    const userQuestion = question.trim();

    if (!userQuestion) {
      return;
    }

    try {
      setChatLoading(true);

      const newUserMessage: ChatMessage = {
        role: "user",
        content: userQuestion,
      };

      setChatMessages((prev) => [
        ...prev,
        newUserMessage,
      ]);

      setQuestion("");

      const tutorialContext = result.tutorial
        .map(
          (section) =>
            `${section.title}\n${section.steps.join("\n")}`
        )
        .join("\n\n");

      const actionPlanContext = result.actionPlan
        .map(
          (item) =>
            `${item.day}: ${item.task}`
        )
        .join("\n");

      const conversationContext =
        chatMessages
          .map(
            (message) =>
              `${message.role === "user" ? "USER" : "AI"}: ${message.content}`
          )
          .join("\n\n");

      const systemPrompt = `
Kamu adalah mentor AI pribadi di dalam Rife Digital AI.

Kamu sedang membantu pengguna memahami SATU project produk
digital yang sedang mereka kerjakan.

Pengguna adalah pemula dan mungkin sangat gaptek.

Karena itu:
- gunakan bahasa Indonesia yang sederhana
- jangan menganggap pengguna sudah paham teknologi
- jelaskan langkah demi langkah
- jangan menggunakan istilah rumit tanpa menjelaskannya
- berikan contoh konkret jika diperlukan
- jangan membuat pengguna merasa bodoh ketika bertanya
- jawab dengan ramah seperti mentor pribadi
- jika pengguna bingung, sederhanakan penjelasan
- jika pertanyaan membutuhkan tutorial, berikan tutorial langkah demi langkah
- jangan hanya memberikan teori
- arahkan pengguna pada tindakan yang bisa langsung dilakukan

Kamu harus menjawab berdasarkan konteks project di bawah.

PROJECT:

Nama Produk:
${result.productName}

Target Pasar:
${result.targetMarket.join(", ")}

Harga:
${result.recommendedPrice}

Value Proposition:
${result.valueProposition}

Strategi Launching:
${result.launchStrategy.join("\n")}

Estimasi Profit:
${result.estimatedProfit}

Tutorial:
${tutorialContext}

Action Plan:
${actionPlanContext}

Jika informasi project tidak cukup untuk menjawab,
katakan dengan jujur dan berikan langkah terbaik yang bisa dilakukan.

Jangan mengklaim bahwa hasil atau keuntungan pasti terjadi.
`;

      const userPrompt = `
Berikut percakapan sebelumnya:

${conversationContext || "Belum ada percakapan sebelumnya."}

Pertanyaan pengguna sekarang:

${userQuestion}

Jawab pertanyaan tersebut sebagai mentor pribadi.
Jika pengguna meminta "caranya", berikan langkah-langkah yang jelas.
Jika pengguna mengatakan tidak mengerti, jelaskan lebih sederhana.
`;

      const answer = await generateText({
        systemPrompt,
        userPrompt,
      });

      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: answer.trim(),
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
          role: "assistant",
          content:
            "Maaf, AI sedang mengalami kendala. Silakan coba tanyakan lagi.",
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleQuestionKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      if (!chatLoading) {
        handleAskAI();
      }
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-white">
            Hasil AI
          </h2>

          <p className="mt-2 text-gray-500">
            Output lengkap yang dihasilkan AI
          </p>
        </div>

        <div className="rounded-full bg-green-500/20 px-5 py-2 text-sm font-bold text-green-400">
          Generated
        </div>
      </div>

      <div className="mt-10 space-y-6">

        {/* Nama Produk */}
        <div className="rounded-2xl border border-white/10 bg-[#1B1B1B] p-6">
          <p className="text-sm text-gray-500">
            Nama Produk
          </p>

          <h2 className="mt-3 text-3xl font-black text-yellow-400 lg:text-4xl">
            {result.productName}
          </h2>
        </div>

        {/* Target + Harga */}
        <div className="grid gap-6 lg:grid-cols-2">

          <div className="rounded-2xl border border-white/10 bg-[#1B1B1B] p-6">
            <p className="text-sm text-gray-500">
              Target Pasar
            </p>

            <div className="mt-3 space-y-2 text-gray-300">
              {result.targetMarket.map(
                (target, index) => (
                  <p key={index}>
                    • {target}
                  </p>
                )
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#1B1B1B] p-6">
            <p className="text-sm text-gray-500">
              Harga Rekomendasi
            </p>

            <h2 className="mt-3 text-3xl font-black text-green-400">
              {result.recommendedPrice}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Berdasarkan analisis AI
            </p>
          </div>

        </div>

        {/* Value Proposition */}
        <div className="rounded-2xl border border-white/10 bg-[#1B1B1B] p-6">

          <p className="text-sm text-gray-500">
            Value Proposition
          </p>

          <p className="mt-4 leading-8 text-gray-300">
            {result.valueProposition}
          </p>

        </div>

        {/* Strategi Launching */}
        <div className="rounded-2xl border border-white/10 bg-[#1B1B1B] p-6">

          <p className="text-sm text-gray-500">
            Strategi Launching
          </p>

          <div className="mt-4 space-y-3 text-gray-300">

            {result.launchStrategy.map(
              (strategy, index) => (
                <p key={index}>
                  ✅ {strategy}
                </p>
              )
            )}

          </div>
        </div>

        {/* Estimasi Profit */}
        <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-6">

          <p className="text-sm text-green-300">
            Estimasi Profit
          </p>

          <h2 className="mt-3 text-4xl font-black text-green-400 lg:text-5xl">
            {result.estimatedProfit}
          </h2>

          <p className="mt-3 text-gray-300">
            Perkiraan berdasarkan 100 penjualan.
          </p>

        </div>

        {/* Tutorial */}
        <div className="rounded-3xl border border-yellow-400/20 bg-[#151515] p-6 lg:p-8">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-400 text-2xl">
              📚
            </div>

            <div>
              <h2 className="text-2xl font-black text-white">
                Tutorial Lengkap Untuk Pemula
              </h2>

              <p className="mt-2 leading-7 text-gray-400">
                Ikuti langkah berikut dari awal.
                Tidak perlu memiliki pengalaman
                sebelumnya.
              </p>
            </div>

          </div>

          <div className="mt-8 space-y-6">

            {result.tutorial.map(
              (section, sectionIndex) => (
                <div
                  key={sectionIndex}
                  className="rounded-2xl border border-white/10 bg-[#1B1B1B] p-6"
                >

                  <div className="flex items-start gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-yellow-400 font-black text-black">
                      {sectionIndex + 1}
                    </div>

                    <h3 className="pt-1 text-lg font-bold text-white">
                      {section.title}
                    </h3>

                  </div>

                  <div className="mt-5 space-y-4">

                    {section.steps.map(
                      (step, stepIndex) => (
                        <div
                          key={stepIndex}
                          className="flex gap-3"
                        >

                          <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-yellow-400">
                            {stepIndex + 1}
                          </div>

                          <p className="leading-7 text-gray-300">
                            {step}
                          </p>

                        </div>
                      )
                    )}

                  </div>
                </div>
              )
            )}

          </div>
        </div>

        {/* Action Plan */}
        <div className="rounded-3xl border border-blue-400/20 bg-[#151515] p-6 lg:p-8">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-400/20 text-2xl">
              🚀
            </div>

            <div>
              <h2 className="text-2xl font-black text-white">
                Action Plan 7 Hari
              </h2>

              <p className="mt-2 leading-7 text-gray-400">
                Ikuti rencana ini satu per satu.
                Tidak perlu menyelesaikan semuanya
                dalam satu hari.
              </p>
            </div>

          </div>

          <div className="mt-8 grid gap-4">

            {result.actionPlan.map(
              (item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-[#1B1B1B] p-5"
                >

                  <div className="flex items-start gap-4">

                    <div className="rounded-xl bg-blue-400/10 px-3 py-2 text-sm font-bold text-blue-300">
                      {item.day}
                    </div>

                    <p className="leading-7 text-gray-300">
                      {item.task}
                    </p>

                  </div>

                </div>
              )
            )}

          </div>
        </div>

        {/* Tanya AI */}
        <div className="rounded-3xl border border-yellow-400/20 bg-gradient-to-b from-yellow-400/10 to-[#151515] p-6 lg:p-8">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-400 text-2xl text-black">
              💬
            </div>

            <div>
              <h2 className="text-2xl font-black text-white">
                Tanya AI
              </h2>

              <p className="mt-2 leading-7 text-gray-400">
                Bingung dengan hasil di atas? Tanyakan
                apa saja kepada AI. AI akan menjawab
                berdasarkan project ini.
              </p>
            </div>

          </div>

          {/* Chat Messages */}
          {chatMessages.length > 0 && (
            <div className="mt-8 space-y-4">

              {chatMessages.map(
                (message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >

                    <div
                      className={`max-w-[90%] rounded-2xl p-5 ${
                        message.role === "user"
                          ? "bg-yellow-400 text-black"
                          : "border border-white/10 bg-[#1B1B1B] text-gray-300"
                      }`}
                    >

                      <p
                        className={`mb-2 text-xs font-bold uppercase tracking-wider ${
                          message.role === "user"
                            ? "text-black/60"
                            : "text-yellow-400"
                        }`}
                      >
                        {message.role === "user"
                          ? "Kamu"
                          : "Rife AI"}
                      </p>

                      <p className="whitespace-pre-wrap leading-7">
                        {message.content}
                      </p>

                    </div>

                  </div>
                )
              )}

            </div>
          )}

          {/* Quick Questions */}
          <div className="mt-6">

            <p className="mb-3 text-sm font-semibold text-gray-400">
              Contoh pertanyaan:
            </p>

            <div className="flex flex-wrap gap-2">

              {[
                "Saya pemula, harus mulai dari mana?",
                "Jelaskan langkah pertama lebih sederhana.",
                "Saya belum bisa Canva, ajari dari nol.",
                "Bagaimana cara mendapatkan pembeli pertama?",
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    setQuestion(item)
                  }
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 transition hover:border-yellow-400 hover:text-yellow-400"
                >
                  {item}
                </button>
              ))}

            </div>

          </div>

          {/* Input */}
          <div className="mt-5">

            <textarea
              value={question}
              onChange={(e) =>
                setQuestion(e.target.value)
              }
              onKeyDown={handleQuestionKeyDown}
              disabled={chatLoading}
              rows={4}
              placeholder="Contoh: Kak, saya belum pernah membuat produk digital. Bisa ajari saya mulai dari langkah pertama?"
              className="w-full resize-none rounded-2xl border border-white/10 bg-[#111111] p-5 text-white outline-none placeholder:text-gray-600 focus:border-yellow-400 disabled:opacity-60"
            />

            <div className="mt-3 flex items-center justify-between gap-4">

              <p className="text-xs text-gray-600">
                Tekan Enter untuk bertanya • Shift + Enter untuk baris baru
              </p>

              <button
                type="button"
                onClick={handleAskAI}
                disabled={
                  chatLoading ||
                  !question.trim()
                }
                className="rounded-2xl bg-yellow-400 px-6 py-3 font-bold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {chatLoading
                  ? "⏳ AI Menjawab..."
                  : "✨ Tanya AI"}
              </button>

            </div>

          </div>

        </div>

        {/* Beginner Reminder */}
        <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-6">

          <h3 className="text-lg font-bold text-yellow-400">
            💡 Masih pemula?
          </h3>

          <p className="mt-2 leading-7 text-gray-300">
            Tidak perlu langsung sempurna. Ikuti
            tutorial di atas satu langkah demi satu
            langkah. Kalau kamu mengalami kesulitan,
            gunakan fitur Tanya AI di atas dan minta
            AI menjelaskan dengan bahasa yang lebih
            sederhana.
          </p>

        </div>

        {/* Action */}
        <div className="grid gap-4 lg:grid-cols-2">

          <button
            onClick={handleCopy}
            className={`rounded-2xl py-4 text-lg font-bold transition ${
              copied
                ? "bg-green-500 text-white"
                : "bg-yellow-400 text-black hover:bg-yellow-300"
            }`}
          >
            {copied
              ? "✓ Berhasil Disalin"
              : "Copy Semua"}
          </button>

          <button
            onClick={handleExportPDF}
            disabled={exporting}
            className={`rounded-2xl border border-white/10 py-4 font-semibold transition ${
              exporting
                ? "cursor-wait bg-yellow-400/20 text-yellow-400"
                : "bg-[#202020] text-white hover:border-yellow-400"
            }`}
          >
            {exporting
              ? "Membuat PDF..."
              : "Export PDF"}
          </button>

        </div>

      </div>
    </div>
  );
}