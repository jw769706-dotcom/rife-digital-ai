import { useState } from "react";
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

  const handleExportPDF = async () => {
    try {
      const { default: jsPDF } = await import("jspdf");
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
    <div className="w-full min-w-0 overflow-hidden">
      {/* RESULT HEADER */}
      <div className="flex min-w-0 flex-col gap-5 border-b border-white/10 pb-7 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400">
            <span>✦</span>
            Rife AI Result
          </div>

          <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            Rencana Produkmu Sudah Jadi.
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
            Jangan bingung melihat banyak informasi. Ikuti bagian ini satu per
            satu. Rife sudah membantu menyusun langkahnya untukmu.
          </p>
        </div>

        <div className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-green-400/20 bg-green-400/10 px-4 py-2 text-xs font-bold text-green-400">
          <span className="h-2 w-2 rounded-full bg-green-400" />
          Berhasil dibuat
        </div>
      </div>

      <div className="mt-7 min-w-0 space-y-5">
        {/* PRODUCT HERO */}
        <section className="relative overflow-hidden rounded-[28px] border border-yellow-400/20 bg-gradient-to-br from-yellow-400/[0.12] via-[#151515] to-[#0d0d0d] p-6 sm:p-8">
          <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-yellow-400/10 blur-3xl" />

          <div className="relative">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-yellow-400">
              PRODUK YANG DISARANKAN
            </p>

            <h1 className="mt-3 break-words text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
              {result.productName}
            </h1>

            <div className="mt-6 grid min-w-0 gap-4 sm:grid-cols-2">
              <div className="min-w-0 rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Target Pembeli
                </p>

                <div className="mt-3 flex min-w-0 flex-wrap gap-2">
                  {result.targetMarket.map((target, index) => (
                    <span
                      key={index}
                      className="max-w-full rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-300"
                    >
                      {target}
                    </span>
                  ))}
                </div>
              </div>

              <div className="min-w-0 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-yellow-400/70">
                  Harga yang Bisa Dicoba
                </p>

                <p className="mt-2 break-words text-2xl font-black text-yellow-400 sm:text-3xl">
                  {result.recommendedPrice}
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Ini rekomendasi awal dari AI, bukan jaminan harga pasti.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* VALUE PROPOSITION */}
        <section className="rounded-[24px] border border-white/10 bg-[#111111] p-6 sm:p-7">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-yellow-400 text-xl text-black">
              💎
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400">
                KENAPA ORANG MAU MEMBELI?
              </p>

              <h2 className="mt-2 text-xl font-black text-white sm:text-2xl">
                Nilai utama produkmu
              </h2>

              <p className="mt-4 break-words text-sm leading-7 text-gray-300 sm:text-base">
                {result.valueProposition}
              </p>
            </div>
          </div>
        </section>

        {/* LAUNCH + PROFIT */}
        <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.6fr)]">
          <section className="min-w-0 rounded-[24px] border border-white/10 bg-[#111111] p-6 sm:p-7">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-yellow-400 text-xl text-black">
                🚀
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400">
                  LANGKAH MENJUAL
                </p>

                <h2 className="mt-2 text-xl font-black text-white sm:text-2xl">
                  Mulai dari sini
                </h2>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {result.launchStrategy.map((strategy, index) => (
                <div
                  key={index}
                  className="flex min-w-0 items-start gap-3 rounded-2xl border border-white/10 bg-[#181818] p-4"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-xs font-black text-black">
                    {index + 1}
                  </div>

                  <p className="min-w-0 break-words text-sm leading-6 text-gray-300">
                    {strategy}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="min-w-0 rounded-[24px] border border-green-400/20 bg-gradient-to-br from-green-400/10 to-[#111111] p-6 sm:p-7">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-green-400">
              SIMULASI
            </p>

            <h2 className="mt-2 text-xl font-black text-white">
              Potensi keuntungan
            </h2>

            <p className="mt-6 break-words text-3xl font-black text-green-400 sm:text-4xl">
              {result.estimatedProfit}
            </p>

            <div className="mt-4 rounded-2xl border border-green-400/10 bg-black/20 p-4">
              <p className="text-xs leading-5 text-gray-400">
                Perkiraan berdasarkan 100 penjualan. Hasil nyata bisa berbeda
                tergantung harga, biaya, kualitas produk, promosi, dan jumlah
                pembeli.
              </p>
            </div>
          </section>
        </div>

        {/* TUTORIAL */}
        <section className="min-w-0 rounded-[28px] border border-yellow-400/20 bg-[#111111] p-6 sm:p-8">
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-400 text-2xl text-black">
              📚
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400">
                PANDUAN PEMULA
              </p>

              <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                Ikuti Langkahnya Pelan-Pelan
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                Kamu tidak harus langsung mengerti semuanya. Kerjakan satu
                langkah, lalu lanjut ke langkah berikutnya.
              </p>
            </div>
          </div>

          <div className="mt-7 space-y-4">
            {result.tutorial.map((section, sectionIndex) => (
              <div
                key={sectionIndex}
                className="min-w-0 rounded-2xl border border-white/10 bg-[#181818] p-5 sm:p-6"
              >
                <div className="flex min-w-0 items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-yellow-400 text-sm font-black text-black">
                    {sectionIndex + 1}
                  </div>

                  <h3 className="min-w-0 break-words pt-1 text-base font-black text-white sm:text-lg">
                    {section.title}
                  </h3>
                </div>

                <div className="mt-5 space-y-3 pl-0 sm:pl-[52px]">
                  {section.steps.map((step, stepIndex) => (
                    <div
                      key={stepIndex}
                      className="flex min-w-0 items-start gap-3"
                    >
                      <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[11px] font-bold text-yellow-400">
                        {stepIndex + 1}
                      </span>

                      <p className="min-w-0 break-words text-sm leading-7 text-gray-300">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ACTION PLAN */}
        <section className="min-w-0 rounded-[28px] border border-blue-400/20 bg-gradient-to-br from-blue-400/[0.08] to-[#111111] p-6 sm:p-8">
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-400/15 text-2xl">
              🗓️
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-300">
                RENCANA 7 HARI
              </p>

              <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                Jangan Bingung Harus Ngapain Besok
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Gunakan rencana ini sebagai checklist sederhana.
              </p>
            </div>
          </div>

          <div className="mt-7 grid min-w-0 gap-3">
            {result.actionPlan.map((item, index) => (
              <div
                key={index}
                className="flex min-w-0 flex-col gap-4 rounded-2xl border border-white/10 bg-[#181818] p-5 sm:flex-row sm:items-start"
              >
                <div className="w-fit shrink-0 rounded-xl border border-blue-400/20 bg-blue-400/10 px-3 py-2 text-xs font-black text-blue-300">
                  {item.day}
                </div>

                <p className="min-w-0 break-words text-sm leading-7 text-gray-300">
                  {item.task}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ASK AI */}
        <section className="min-w-0 overflow-hidden rounded-[28px] border border-yellow-400/20 bg-gradient-to-br from-yellow-400/[0.10] via-[#151515] to-[#0f0f0f] p-6 sm:p-8">
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-400 text-2xl text-black">
              💬
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400">
                MENTOR PRIBADI
              </p>

              <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                Masih Bingung? Tanya Rife.
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
                Tidak perlu malu bertanya. Ceritakan bagian yang tidak kamu
                pahami dan minta AI menjelaskannya dengan bahasa paling
                sederhana.
              </p>
            </div>
          </div>

          {chatMessages.length > 0 && (
            <div className="mt-7 max-h-[520px] space-y-4 overflow-y-auto pr-1">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[92%] min-w-0 rounded-2xl p-4 sm:max-w-[85%] sm:p-5 ${
                      message.role === "user"
                        ? "bg-yellow-400 text-black"
                        : "border border-white/10 bg-[#181818] text-gray-300"
                    }`}
                  >
                    <p
                      className={`mb-2 text-[10px] font-black uppercase tracking-wider ${
                        message.role === "user"
                          ? "text-black/60"
                          : "text-yellow-400"
                      }`}
                    >
                      {message.role === "user" ? "Kamu" : "Rife AI"}
                    </p>

                    <p className="whitespace-pre-wrap break-words text-sm leading-7">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-7">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
              Coba salah satu:
            </p>

            <div className="flex min-w-0 flex-wrap gap-2">
              {[
                "Saya pemula, harus mulai dari mana?",
                "Jelaskan langkah pertama lebih sederhana.",
                "Saya belum bisa Canva, ajari dari nol.",
                "Bagaimana cara mendapatkan pembeli pertama?",
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setQuestion(item)}
                  className="max-w-full rounded-full border border-white/10 bg-white/5 px-4 py-2 text-left text-xs text-gray-300 transition hover:border-yellow-400/40 hover:text-yellow-400"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 min-w-0">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleQuestionKeyDown}
              disabled={chatLoading}
              rows={4}
              placeholder="Contoh: Kak, saya belum pernah membuat produk digital. Bisa ajari saya mulai dari langkah pertama?"
              className="w-full min-w-0 resize-none rounded-2xl border border-white/10 bg-[#0d0d0d] p-5 text-sm leading-6 text-white outline-none placeholder:text-gray-600 focus:border-yellow-400/50 disabled:opacity-60"
            />

            <div className="mt-3 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[11px] leading-5 text-gray-600">
                Enter untuk bertanya • Shift + Enter untuk baris baru
              </p>

              <button
                type="button"
                onClick={handleAskAI}
                disabled={chatLoading || !question.trim()}
                className="w-full shrink-0 rounded-2xl bg-yellow-400 px-6 py-3.5 text-sm font-black text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                {chatLoading ? "⏳ AI sedang menjawab..." : "✨ Tanya Rife AI"}
              </button>
            </div>
          </div>
        </section>

        {/* BEGINNER REMINDER */}
        <div className="flex min-w-0 items-start gap-4 rounded-2xl border border-yellow-400/15 bg-yellow-400/[0.05] p-5 sm:p-6">
          <div className="shrink-0 text-2xl">💡</div>

          <div className="min-w-0">
            <h3 className="font-black text-yellow-400">
              Tidak perlu langsung jago.
            </h3>

            <p className="mt-2 break-words text-sm leading-7 text-gray-400">
              Fokus kerjakan satu langkah dulu. Kalau tidak paham, gunakan
              tombol <span className="font-bold text-yellow-400">Tanya Rife AI</span>
              dan minta penjelasan yang lebih sederhana.
            </p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="grid min-w-0 gap-3 sm:grid-cols-2">
          <button
            onClick={handleCopy}
            className={`rounded-2xl py-4 text-sm font-black transition ${
              copied
                ? "bg-green-500 text-white"
                : "bg-yellow-400 text-black hover:bg-yellow-300"
            }`}
          >
            {copied ? "✓ Berhasil Disalin" : "Copy Semua Hasil"}
          </button>

          <button
            onClick={handleExportPDF}
            disabled={exporting}
            className={`rounded-2xl border py-4 text-sm font-black transition ${
              exporting
                ? "cursor-wait border-yellow-400/20 bg-yellow-400/10 text-yellow-400"
                : "border-white/10 bg-[#181818] text-white hover:border-yellow-400/40 hover:bg-[#202020]"
            }`}
          >
            {exporting ? "⏳ Membuat PDF..." : "↓ Simpan sebagai PDF"}
          </button>
        </div>
      </div>
    </div>
  );
}