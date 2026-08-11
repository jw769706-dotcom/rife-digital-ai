import { useEffect, useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";

import { generateText } from "../services/ai";

import {
  canGenerate,
  increaseUsage,
} from "../lib/subscriptions";

import { getHistory, saveHistory } from "../lib/history";
import type { HistoryItem } from "../lib/history";

type FieldType = "text" | "textarea" | "select";

type Field = {
  name: string;
  label: string;
  placeholder?: string;
  type?: FieldType;
  options?: string[];
};

type TutorialStep = {
  title: string;
  description: string;
};

type Tool = {
  id: string;
  title: string;
  icon: string;
  description: string;
  fields: Field[];
  systemPrompt: string;
  buildPrompt: (values: Record<string, string>) => string;
  tutorial: TutorialStep[];
};

const tools: Tool[] = [
  {
    id: "calendar",
    title: "Content Calendar",
    icon: "📅",
    description: "Buat kalender konten lengkap untuk beberapa hari.",
    fields: [
      {
        name: "topic",
        label: "Apa yang ingin kamu promosikan?",
        placeholder: "Contoh: Ebook Canva untuk pemula",
        type: "text",
      },
      {
        name: "target",
        label: "Siapa target pembelinya?",
        placeholder: "Contoh: Pemula yang ingin belajar Canva",
        type: "text",
      },
      {
        name: "platform",
        label: "Mau posting di mana?",
        type: "select",
        options: [
          "Instagram",
          "TikTok",
          "Instagram & TikTok",
          "Facebook",
          "YouTube Shorts",
        ],
      },
      {
        name: "duration",
        label: "Mau dibuat untuk berapa hari?",
        type: "select",
        options: ["7 hari", "14 hari", "30 hari"],
      },
      {
        name: "contentType",
        label: "Jenis konten",
        type: "select",
        options: [
          "Campuran",
          "Edukasi",
          "Promosi",
          "Storytelling",
          "Tips & Tutorial",
        ],
      },
      {
        name: "goal",
        label: "Tujuan konten",
        type: "select",
        options: [
          "Mendapatkan pembeli",
          "Mendapatkan followers",
          "Meningkatkan engagement",
          "Membangun kepercayaan",
          "Mengenalkan produk",
        ],
      },
    ],
    systemPrompt: `
Kamu adalah content strategist profesional untuk bisnis digital.

Target pengguna adalah pemula yang tidak memahami strategi konten.

Buat hasil yang:
- sangat mudah dipahami
- praktis
- tidak menggunakan istilah rumit
- bisa langsung dipraktikkan
- cocok untuk pemula
`,
    buildPrompt: (v) => `
Buat Content Calendar lengkap berdasarkan:

Produk:
${v.topic}

Target pasar:
${v.target}

Platform:
${v.platform}

Durasi:
${v.duration}

Jenis konten:
${v.contentType}

Tujuan:
${v.goal}

Untuk setiap hari berikan:

1. Hari
2. Judul konten
3. Format konten
4. Hook
5. Isi konten
6. CTA
7. Ide visual

Buat seolah-olah pengguna benar-benar pemula dan tinggal mengikuti kalender tersebut.
`,
    tutorial: [
      {
        title: "Tentukan produk atau topik",
        description:
          "Masukkan produk atau topik yang ingin kamu promosikan. Contohnya ebook, template Canva, jasa desain, atau produk digital lainnya.",
      },
      {
        title: "Tentukan target pembeli",
        description:
          "Tulis siapa yang paling cocok membeli produkmu. Tidak perlu rumit. Contohnya guru, mahasiswa, karyawan, ibu rumah tangga, atau pemula.",
      },
      {
        title: "Pilih platform",
        description:
          "Pilih tempat kamu biasanya membuat konten seperti Instagram atau TikTok.",
      },
      {
        title: "Pilih durasi kalender",
        description:
          "Untuk pemula, mulai dari 7 hari terlebih dahulu agar lebih mudah dijalankan.",
      },
      {
        title: "Ikuti kalender dari AI",
        description:
          "Gunakan ide, hook, isi, CTA, dan visual yang diberikan AI. Kamu tidak harus membuat strategi dari awal.",
      },
      {
        title: "Mulai posting",
        description:
          "Buat kontennya satu per satu sesuai jadwal. Jangan menunggu semuanya sempurna sebelum mulai posting.",
      },
    ],
  },

  {
    id: "ideas",
    title: "Ide Konten",
    icon: "💡",
    description: "Cari ide konten berdasarkan produk dan target pasar.",
    fields: [
      {
        name: "topic",
        label: "Apa produk atau topik kamu?",
        placeholder: "Contoh: Template Canva untuk guru",
        type: "text",
      },
      {
        name: "target",
        label: "Siapa target kamu?",
        placeholder:
          "Contoh: Guru SD yang tidak terlalu mahir desain",
        type: "text",
      },
      {
        name: "platform",
        label: "Platform utama",
        type: "select",
        options: [
          "Instagram",
          "TikTok",
          "Instagram & TikTok",
          "Facebook",
          "YouTube Shorts",
        ],
      },
      {
        name: "amount",
        label: "Berapa ide yang kamu inginkan?",
        type: "select",
        options: ["10 ide", "20 ide", "30 ide"],
      },
      {
        name: "style",
        label: "Gaya konten",
        type: "select",
        options: [
          "Santai",
          "Profesional",
          "Lucu",
          "Storytelling",
          "Edukasi",
          "Persuasif",
        ],
      },
      {
        name: "goal",
        label: "Tujuan utama",
        type: "select",
        options: [
          "Jualan",
          "Followers",
          "Engagement",
          "Branding",
          "Edukasi",
        ],
      },
    ],
    systemPrompt: `
Kamu adalah ahli content marketing dan social media strategist.

Pengguna adalah pemula.

Jangan membuat pengguna harus memahami istilah marketing yang rumit.
Berikan contoh yang konkret dan mudah diterapkan.
`,
    buildPrompt: (v) => `
Buat ${v.amount} ide konten untuk:

Produk/topik:
${v.topic}

Target:
${v.target}

Platform:
${v.platform}

Gaya:
${v.style}

Tujuan:
${v.goal}

Untuk setiap ide berikan:

- Judul
- Hook
- Ide isi
- Format
- CTA
- Ide visual

Prioritaskan ide yang realistis dibuat oleh pemula.
`,
    tutorial: [
      {
        title: "Masukkan produk atau topik",
        description:
          "Tulis produk yang ingin kamu promosikan atau topik yang ingin kamu bahas.",
      },
      {
        title: "Tentukan target",
        description:
          "Jelaskan secara sederhana siapa yang ingin kamu jangkau.",
      },
      {
        title: "Pilih gaya konten",
        description:
          "Kalau bingung, pilih Campuran atau gaya Santai agar ide lebih bervariasi.",
      },
      {
        title: "Generate ide",
        description:
          "Klik Generate dan AI akan memberikan beberapa ide konten yang bisa langsung kamu gunakan.",
      },
      {
        title: "Pilih ide terbaik",
        description:
          "Tidak perlu menggunakan semua ide. Pilih yang paling sesuai dengan produk dan kemampuanmu.",
      },
      {
        title: "Kembangkan menjadi konten",
        description:
          "Gunakan ide tersebut sebagai dasar untuk membuat Reels, TikTok, carousel, atau postingan.",
      },
    ],
  },

  {
    id: "carousel",
    title: "Instagram Carousel",
    icon: "📸",
    description: "Buat carousel Instagram lengkap dari slide 1 sampai CTA.",
    fields: [
      {
        name: "topic",
        label: "Topik carousel",
        placeholder:
          "Contoh: 5 kesalahan pemula saat jualan produk digital",
        type: "text",
      },
      {
        name: "target",
        label: "Target pembaca",
        placeholder:
          "Contoh: Orang yang baru mulai bisnis online",
        type: "text",
      },
      {
        name: "slides",
        label: "Jumlah slide",
        type: "select",
        options: ["5 slide", "7 slide", "8 slide", "10 slide"],
      },
      {
        name: "style",
        label: "Gaya bahasa",
        type: "select",
        options: [
          "Santai",
          "Profesional",
          "Storytelling",
          "Persuasif",
          "Edukasi",
        ],
      },
      {
        name: "goal",
        label: "Tujuan carousel",
        type: "select",
        options: [
          "Mendapatkan pembeli",
          "Meningkatkan engagement",
          "Edukasi",
          "Mendapatkan followers",
          "Promosi produk",
        ],
      },
      {
        name: "cta",
        label: "CTA yang diinginkan",
        placeholder:
          "Contoh: Klik link di bio untuk melihat produknya",
        type: "text",
      },
    ],
    systemPrompt: `
Kamu adalah copywriter Instagram profesional.

Buat carousel yang:
- mudah dibaca
- tidak terlalu panjang
- memiliki alur jelas
- menarik sejak slide pertama
- cocok untuk pemula
`,
    buildPrompt: (v) => `
Buat Instagram Carousel:

Topik:
${v.topic}

Target:
${v.target}

Jumlah slide:
${v.slides}

Gaya:
${v.style}

Tujuan:
${v.goal}

CTA:
${v.cta}

Untuk setiap slide berikan:

Slide X:
Judul:
Isi:
Ide visual:

Pastikan slide pertama memiliki hook yang kuat.
Slide terakhir harus memiliki CTA.
`,
    tutorial: [
      {
        title: "Tentukan topik",
        description:
          "Pilih satu topik yang ingin kamu jelaskan kepada audiens. Hindari memasukkan terlalu banyak topik dalam satu carousel.",
      },
      {
        title: "Tentukan target pembaca",
        description:
          "Tulis siapa yang akan membaca carousel tersebut agar bahasa dan contoh yang diberikan AI lebih relevan.",
      },
      {
        title: "Pilih jumlah slide",
        description:
          "Untuk pemula, 5 sampai 7 slide sudah cukup untuk mulai membuat carousel.",
      },
      {
        title: "Generate carousel",
        description:
          "Klik Generate dan AI akan membuat struktur dari slide pertama sampai CTA.",
      },
      {
        title: "Buat desain di Canva",
        description:
          "Salin isi setiap slide ke Canva. Gunakan desain sederhana dan pastikan teks mudah dibaca.",
      },
      {
        title: "Upload dan evaluasi",
        description:
          "Posting carousel lalu lihat bagian mana yang mendapatkan respons paling bagus dari audiens.",
      },
    ],
  },

  {
    id: "video",
    title: "Video Content",
    icon: "🎬",
    description: "Buat script video Reels, TikTok, dan Shorts.",
    fields: [
      {
        name: "topic",
        label: "Topik video",
        placeholder:
          "Contoh: Cara menghasilkan uang dari produk digital",
        type: "text",
      },
      {
        name: "target",
        label: "Target penonton",
        placeholder:
          "Contoh: Pemula usia 18-30 tahun",
        type: "text",
      },
      {
        name: "platform",
        label: "Platform",
        type: "select",
        options: [
          "TikTok",
          "Instagram Reels",
          "YouTube Shorts",
          "TikTok & Reels",
        ],
      },
      {
        name: "duration",
        label: "Durasi video",
        type: "select",
        options: [
          "15 detik",
          "30 detik",
          "45 detik",
          "60 detik",
        ],
      },
      {
        name: "style",
        label: "Gaya video",
        type: "select",
        options: [
          "Faceless",
          "Talking Head",
          "Storytelling",
          "Tutorial",
          "Edukasi",
        ],
      },
      {
        name: "goal",
        label: "Tujuan video",
        type: "select",
        options: [
          "Viral / Jangkauan",
          "Mendapatkan followers",
          "Menjual produk",
          "Edukasi",
          "Membangun personal brand",
        ],
      },
    ],
    systemPrompt: `
Kamu adalah scriptwriter video pendek profesional.

Buat script yang cocok untuk pemula.
Gunakan bahasa sehari-hari.
Fokus pada hook, retention, value, dan CTA.
`,
    buildPrompt: (v) => `
Buat script video:

Topik:
${v.topic}

Target:
${v.target}

Platform:
${v.platform}

Durasi:
${v.duration}

Style:
${v.style}

Tujuan:
${v.goal}

Buat dengan struktur:

1. Hook 0-3 detik
2. Opening
3. Masalah
4. Isi utama
5. Solusi
6. CTA

Tambahkan:

- Voice over
- Teks di layar
- Ide visual
- Musik / suasana yang cocok

Jika menggunakan faceless, berikan contoh footage yang bisa digunakan.
`,
    tutorial: [
      {
        title: "Tentukan topik video",
        description:
          "Tulis satu hal yang ingin kamu sampaikan kepada penonton.",
      },
      {
        title: "Tentukan target penonton",
        description:
          "Semakin jelas targetnya, semakin mudah AI membuat bahasa yang sesuai.",
      },
      {
        title: "Pilih gaya video",
        description:
          "Kalau tidak ingin menunjukkan wajah, pilih Faceless. AI akan memberikan contoh footage yang bisa digunakan.",
      },
      {
        title: "Generate script",
        description:
          "AI akan membuat hook, isi, voice over, teks layar, visual, dan CTA.",
      },
      {
        title: "Rekam atau kumpulkan footage",
        description:
          "Ikuti bagian visual yang diberikan AI. Kamu bisa menggunakan rekaman sendiri atau footage yang sesuai.",
      },
      {
        title: "Edit dan upload",
        description:
          "Masukkan video ke aplikasi editing, tambahkan teks, musik, dan voice over lalu upload.",
      },
    ],
  },

  {
    id: "hook",
    title: "Hook Generator",
    icon: "🎯",
    description: "Buat hook kuat untuk menarik perhatian.",
    fields: [
      {
        name: "topic",
        label: "Topik konten",
        placeholder:
          "Contoh: Jualan produk digital",
        type: "text",
      },
      {
        name: "target",
        label: "Target penonton",
        placeholder:
          "Contoh: Pemula yang ingin mendapatkan penghasilan online",
        type: "text",
      },
      {
        name: "platform",
        label: "Platform",
        type: "select",
        options: [
          "TikTok",
          "Instagram Reels",
          "YouTube Shorts",
          "Instagram Carousel",
        ],
      },
      {
        name: "amount",
        label: "Jumlah hook",
        type: "select",
        options: ["10 hook", "20 hook", "30 hook"],
      },
      {
        name: "style",
        label: "Jenis hook",
        type: "select",
        options: [
          "Rasa penasaran",
          "Masalah",
          "Hasil",
          "Storytelling",
          "Pertanyaan",
          "Kontroversial",
          "Campuran",
        ],
      },
      {
        name: "tone",
        label: "Gaya bahasa",
        type: "select",
        options: [
          "Santai",
          "Tegas",
          "Profesional",
          "Friendly",
          "Berani",
        ],
      },
    ],
    systemPrompt: `
Kamu adalah ahli copywriting dan hook media sosial.

Buat hook yang menarik tetapi tidak menipu.
Hook harus mudah dipahami oleh orang awam.
`,
    buildPrompt: (v) => `
Buat ${v.amount} hook untuk:

Topik:
${v.topic}

Target:
${v.target}

Platform:
${v.platform}

Jenis hook:
${v.style}

Gaya bahasa:
${v.tone}

Buat hook yang pendek dan langsung menarik perhatian.

Untuk setiap hook tambahkan:
- Hook
- Kenapa menarik
- Contoh lanjutan 1 kalimat
`,
    tutorial: [
      {
        title: "Tentukan topik",
        description:
          "Masukkan topik yang akan dibahas dalam konten.",
      },
      {
        title: "Tentukan target",
        description:
          "Tulis siapa yang ingin kamu tarik perhatiannya.",
      },
      {
        title: "Pilih jenis hook",
        description:
          "Kalau bingung, pilih Campuran agar AI memberikan berbagai gaya hook.",
      },
      {
        title: "Generate hook",
        description:
          "AI akan membuat beberapa pembuka yang bisa kamu pilih.",
      },
      {
        title: "Pilih hook terbaik",
        description:
          "Pilih hook yang paling sesuai dengan isi kontenmu. Jangan membuat hook yang menjanjikan sesuatu yang tidak ada di isi.",
      },
      {
        title: "Gunakan di awal konten",
        description:
          "Letakkan hook pada 1 sampai 3 detik pertama video atau slide pertama carousel.",
      },
    ],
  },

  {
    id: "viral",
    title: "Viral Content",
    icon: "🔥",
    description:
      "Buat konsep konten dengan potensi engagement tinggi.",
    fields: [
      {
        name: "product",
        label: "Produk / topik",
        placeholder:
          "Contoh: Template Canva untuk UMKM",
        type: "text",
      },
      {
        name: "target",
        label: "Target pasar",
        placeholder:
          "Contoh: Pemilik UMKM yang belum bisa desain",
        type: "text",
      },
      {
        name: "platform",
        label: "Platform utama",
        type: "select",
        options: [
          "TikTok",
          "Instagram Reels",
          "TikTok & Instagram",
          "YouTube Shorts",
        ],
      },
      {
        name: "contentType",
        label: "Jenis konten",
        type: "select",
        options: [
          "Edukasi",
          "Storytelling",
          "Tips",
          "Tutorial",
          "Promosi",
          "Entertainment",
          "Campuran",
        ],
      },
      {
        name: "goal",
        label: "Tujuan",
        type: "select",
        options: [
          "Jangkauan",
          "Followers",
          "Engagement",
          "Penjualan",
          "Brand Awareness",
        ],
      },
      {
        name: "amount",
        label: "Jumlah konsep",
        type: "select",
        options: [
          "5 konsep",
          "10 konsep",
          "20 konsep",
        ],
      },
    ],
    systemPrompt: `
Kamu adalah social media strategist profesional.

Jangan menjamin sebuah konten pasti viral.
Gunakan istilah "berpotensi mendapatkan engagement tinggi".

Buat strategi yang realistis untuk pemula.
`,
    buildPrompt: (v) => `
Buat ${v.amount} konsep konten untuk:

Produk/topik:
${v.product}

Target:
${v.target}

Platform:
${v.platform}

Jenis:
${v.contentType}

Tujuan:
${v.goal}

Untuk setiap konsep berikan:

1. Judul
2. Hook
3. Angle
4. Struktur konten
5. Script singkat
6. Ide visual
7. Caption
8. CTA
9. Alasan konsep ini menarik

Buat semuanya mudah dipraktikkan oleh pemula.
`,
    tutorial: [
      {
        title: "Masukkan produk atau topik",
        description:
          "Tulis produk atau topik yang ingin kamu jadikan bahan konten.",
      },
      {
        title: "Kenali target pasar",
        description:
          "Tulis siapa orang yang ingin kamu jangkau.",
      },
      {
        title: "Pilih jenis konten",
        description:
          "Pilih jenis konten yang paling cocok. Jika bingung, gunakan Campuran.",
      },
      {
        title: "Generate konsep",
        description:
          "AI akan membuat beberapa konsep lengkap beserta hook, script, visual, caption, dan CTA.",
      },
      {
        title: "Jangan mengejar viral saja",
        description:
          "Gunakan konsep yang relevan dengan target pasar. Konten yang mendapatkan penonton yang tepat lebih berguna daripada sekadar banyak views.",
      },
      {
        title: "Uji beberapa konsep",
        description:
          "Coba beberapa konsep lalu lihat mana yang mendapatkan respons terbaik. Gunakan hasil tersebut untuk membuat konten berikutnya.",
      },
    ],
  },
];

function getHistoryIcon(toolName: string) {
  const name = toolName.toLowerCase();

  if (name.includes("calendar")) return "📅";
  if (name.includes("ide")) return "💡";
  if (name.includes("carousel")) return "📸";
  if (name.includes("video")) return "🎬";
  if (name.includes("hook")) return "🎯";
  if (name.includes("viral")) return "🔥";

  return "✨";
}

function getHistoryPreview(prompt: string) {
  const clean = prompt.replace(/\s+/g, " ").trim();
  return clean.length > 58 ? `${clean.slice(0, 58)}...` : clean;
}

export default function AIContent() {
  const [selectedTool, setSelectedTool] =
    useState("calendar");

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(null);

  const [values, setValues] =
    useState<Record<string, string>>({});

  const [result, setResult] = useState("");

  const [loading, setLoading] = useState(false);

  const [question, setQuestion] = useState("");

  const [answer, setAnswer] = useState("");

  const [asking, setAsking] = useState(false);

  const tool =
    tools.find((item) => item.id === selectedTool) ??
    tools[0];

  useEffect(() => {
    const refreshHistory = () => {
      setHistory(getHistory());
    };

    refreshHistory();

    window.addEventListener("rife-history-updated", refreshHistory);
    window.addEventListener("storage", refreshHistory);

    return () => {
      window.removeEventListener("rife-history-updated", refreshHistory);
      window.removeEventListener("storage", refreshHistory);
    };
  }, []);

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function openHistory(item: HistoryItem) {
    setSelectedHistoryId(item.id);
    setResult(item.result);
    setQuestion("");
    setAnswer("");

    const toolName = item.tool.replace("Content Studio • ", "").trim();
    const matchedTool = tools.find((item) => item.title === toolName);

    if (matchedTool) {
      setSelectedTool(matchedTool.id);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function selectTool(toolId: string) {
    setSelectedTool(toolId);
    setValues({});
    setResult("");
    setQuestion("");
    setAnswer("");
  }

  function updateValue(
    name: string,
    value: string
  ) {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleGenerate() {
    const missingField = tool.fields.find(
      (field) =>
        field.type !== "select" &&
        !values[field.name]?.trim()
    );

    if (missingField) {
      alert(
        `Silakan isi bagian "${missingField.label}" terlebih dahulu.`
      );
      return;
    }

    setLoading(true);
    setAnswer("");

    try {
      const allowed = await canGenerate();

      if (!allowed) {
        setResult(
          "🚫 Limit generate kamu sudah habis.\n\nUpgrade ke BASIC untuk melanjutkan."
        );
        return;
      }

      const prompt = tool.buildPrompt(values);

      const ai = await generateText({
        systemPrompt: tool.systemPrompt,
        userPrompt: prompt,
      });

      await increaseUsage();

      setResult(ai);

      /*
       * SIMPAN KE HISTORY
       */
      saveHistory({
        id: crypto.randomUUID(),
        tool: `Content Studio • ${tool.title}`,
        prompt,
        result: ai,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error(
        "CONTENT AI ERROR:",
        error
      );

      setResult(
        "Terjadi kesalahan saat membuat konten. Silakan coba lagi."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleAskAI() {
    if (!question.trim()) {
      alert("Tulis pertanyaan terlebih dahulu.");
      return;
    }

    if (!result) {
      alert(
        "Generate hasil AI terlebih dahulu sebelum bertanya."
      );
      return;
    }

    setAsking(true);

    try {
      const allowed = await canGenerate();

      if (!allowed) {
        setAnswer(
          "🚫 Limit generate kamu sudah habis. Upgrade ke BASIC untuk melanjutkan."
        );
        return;
      }

      const ai = await generateText({
        systemPrompt: `
Kamu adalah asisten AI di Rife Digital AI.

Pengguna adalah pemula yang mungkin masih sangat awam.

Jawab dengan:
- bahasa Indonesia sederhana
- langkah yang jelas
- contoh konkret
- jangan menggunakan istilah rumit tanpa menjelaskannya

Kamu sedang membantu pengguna memahami hasil Content Studio.
`,
        userPrompt: `
Tools:
${tool.title}

Hasil AI:
${result}

Pertanyaan pengguna:
${question}

Jawab pertanyaan pengguna berdasarkan hasil AI di atas.

Jika pertanyaannya meminta langkah, berikan langkah bernomor.
Jika pengguna terlihat bingung, jelaskan dengan bahasa yang sangat sederhana.
`,
      });

      await increaseUsage();

      setAnswer(ai);
    } catch (error) {
      console.error(
        "CONTENT ASK AI ERROR:",
        error
      );

      setAnswer(
        "Terjadi kesalahan saat bertanya kepada AI."
      );
    } finally {
      setAsking(false);
    }
  }

  function handleClear() {
    setValues({});
    setResult("");
    setQuestion("");
    setAnswer("");
  }

  return (
    <DashboardLayout
      title="Content Studio"
      subtitle="Buat berbagai jenis konten dengan bantuan AI, bahkan jika kamu masih pemula."
    >
      <div className="grid gap-8 xl:grid-cols-[300px_minmax(0,1fr)]">

        {/* HISTORY SIDEBAR */}
        <aside className="h-fit rounded-3xl border border-white/10 bg-[#111111] p-5 xl:sticky xl:top-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-400">
                Workspace
              </p>
              <h2 className="mt-1 text-xl font-black text-white">
                History
              </h2>
            </div>
            <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-bold text-gray-400">
              {history.length}
            </span>
          </div>

          <div className="mt-5 rounded-2xl border border-white/10 bg-[#171717] px-4 py-3">
            <p className="text-xs font-semibold text-gray-500">
              Semua hasil generate Content Studio tersimpan di sini.
            </p>
          </div>

          <div className="mt-6">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
              Hari Ini
            </p>

            {history.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 p-5 text-center">
                <div className="text-2xl">📂</div>
                <p className="mt-2 text-sm font-semibold text-gray-400">
                  Belum ada project
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-600">
                  Generate konten pertamamu dan hasilnya akan muncul di sini.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {history.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => openHistory(item)}
                    className={`w-full rounded-2xl border p-4 text-left transition ${
                      selectedHistoryId === item.id
                        ? "border-yellow-400/50 bg-yellow-500/10"
                        : "border-white/5 bg-[#171717] hover:border-yellow-400/30 hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-lg">
                        {getHistoryIcon(item.tool)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-white">
                          {item.tool.replace("Content Studio • ", "")}
                        </p>
                        <p className="mt-1 truncate text-xs text-gray-500">
                          {getHistoryPreview(item.prompt)}
                        </p>
                        <p className="mt-2 text-[10px] text-gray-600">
                          {formatDate(item.createdAt)}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <div className="min-w-0 space-y-8">

        {/* TOOL SELECTOR */}
        <div className="rounded-3xl border border-white/10 bg-[#111111] p-8">

          <h1 className="text-3xl font-black text-white">
            Content Studio
          </h1>

          <p className="mt-2 text-gray-400">
            Pilih tools yang ingin kamu gunakan.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">

            {tools.map((item) => {
              const active =
                selectedTool === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    selectTool(item.id)
                  }
                  className={`rounded-2xl border p-5 text-left transition ${
                    active
                      ? "border-yellow-400 bg-yellow-500/10"
                      : "border-white/10 bg-[#171717] hover:border-yellow-400/50"
                  }`}
                >
                  <div className="flex items-center gap-4">

                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl ${
                        active
                          ? "bg-yellow-500 text-black"
                          : "bg-white/5"
                      }`}
                    >
                      {item.icon}
                    </div>

                    <div>
                      <h2 className="font-bold text-white">
                        {item.title}
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>

                  </div>
                </button>
              );
            })}

          </div>
        </div>

        {/* FORM */}
        <div className="rounded-3xl border border-white/10 bg-[#111111] p-8">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-500 text-2xl">
              {tool.icon}
            </div>

            <div>
              <h2 className="text-2xl font-black text-white">
                {tool.title}
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Isi beberapa informasi sederhana di
                bawah ini. Selebihnya biarkan AI yang
                mengerjakan.
              </p>
            </div>

          </div>

          {/* BEGINNER INFO */}
          <div className="mt-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5">

            <p className="text-sm font-bold text-yellow-400">
              💡 Bingung harus isi apa?
            </p>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              Tenang. Isi sesuai kondisi kamu saja.
              Tidak perlu menggunakan bahasa profesional.
              Contohnya cukup seperti:
              <span className="text-white">
                {" "}“Saya jual ebook Canva untuk guru.”
              </span>
            </p>

          </div>

          {/* FIELDS */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">

            {tool.fields.map((field) => {

              if (field.type === "textarea") {
                return (
                  <div
                    key={field.name}
                    className="md:col-span-2"
                  >
                    <label className="mb-2 block text-sm font-semibold text-gray-300">
                      {field.label}
                    </label>

                    <textarea
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
                        field.placeholder
                      }
                      rows={5}
                      className="w-full resize-none rounded-2xl border border-white/10 bg-[#171717] px-5 py-4 text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-400"
                    />
                  </div>
                );
              }

              if (field.type === "select") {
                return (
                  <div key={field.name}>

                    <label className="mb-2 block text-sm font-semibold text-gray-300">
                      {field.label}
                    </label>

                    <select
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
                      className="w-full rounded-2xl border border-white/10 bg-[#171717] px-5 py-4 text-white outline-none focus:border-yellow-400"
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

                  </div>
                );
              }

              return (
                <div key={field.name}>

                  <label className="mb-2 block text-sm font-semibold text-gray-300">
                    {field.label}
                  </label>

                  <input
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
                      field.placeholder
                    }
                    className="w-full rounded-2xl border border-white/10 bg-[#171717] px-5 py-4 text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-400"
                  />

                </div>
              );
            })}

          </div>

          {/* ACTION */}
          <div className="mt-8 flex gap-3">

            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading}
              className="rounded-2xl bg-yellow-500 px-8 py-4 font-bold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "⚡ AI sedang bekerja..."
                : `${tool.icon} Generate ${tool.title}`}
            </button>

            <button
              type="button"
              onClick={handleClear}
              disabled={loading}
              className="rounded-2xl border border-white/10 bg-white/5 px-7 py-4 font-semibold text-white hover:bg-white/10"
            >
              Clear
            </button>

          </div>

        </div>

        {/* RESULT */}
        <div className="rounded-3xl border border-yellow-500/20 bg-[#111111] p-8">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-2xl font-black text-white">
                Hasil AI
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Hasil generate dari {tool.title}
              </p>
            </div>

            {result && (
              <span className="rounded-full bg-green-500/10 px-4 py-2 text-sm font-bold text-green-400">
                ✓ Generated
              </span>
            )}

          </div>

          {!result && !loading && (
            <div className="mt-8 rounded-2xl border border-white/5 bg-[#171717] p-12 text-center">

              <div className="text-4xl">
                ✨
              </div>

              <h3 className="mt-4 text-xl font-bold text-white">
                Belum ada hasil
              </h3>

              <p className="mt-2 text-gray-500">
                Isi form di atas lalu klik Generate AI.
              </p>

            </div>
          )}

          {loading && (
            <div className="mt-8 rounded-2xl border border-white/5 bg-[#171717] p-12 text-center">

              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-white/10 border-t-yellow-400" />

              <p className="mt-4 text-gray-400">
                AI sedang membuat hasil terbaik
                untuk kamu...
              </p>

            </div>
          )}

          {result && !loading && (
            <>
              {/* MAIN RESULT */}
              <div className="mt-8">

                <div className="rounded-2xl border border-white/5 bg-[#171717] p-6">

                  <pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-gray-300">
                    {result}
                  </pre>

                </div>

                <div className="mt-4 flex justify-end">

                  <button
                    type="button"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        result
                      )
                    }
                    className="rounded-xl bg-yellow-500 px-5 py-3 font-bold text-black hover:bg-yellow-400"
                  >
                    📋 Copy Hasil
                  </button>

                </div>

              </div>

              {/* TUTORIAL */}
              <div className="mt-8 rounded-3xl border border-yellow-500/20 bg-yellow-500/5 p-6">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500 text-xl">
                    📚
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-white">
                      Tutorial Lengkap
                    </h3>

                    <p className="text-sm text-gray-500">
                      Ikuti langkah berikut jika kamu
                      masih bingung harus mulai dari mana.
                    </p>
                  </div>

                </div>

                <div className="mt-6 space-y-4">

                  {tool.tutorial.map(
                    (step, index) => (
                      <div
                        key={step.title}
                        className="rounded-2xl border border-white/10 bg-[#171717] p-5"
                      >
                        <div className="flex gap-4">

                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-yellow-500 font-black text-black">
                            {index + 1}
                          </div>

                          <div>
                            <h4 className="font-bold text-white">
                              {step.title}
                            </h4>

                            <p className="mt-2 text-sm leading-6 text-gray-400">
                              {step.description}
                            </p>
                          </div>

                        </div>
                      </div>
                    )
                  )}

                </div>

              </div>

              {/* ASK AI */}
              <div className="mt-8 rounded-3xl border border-white/10 bg-[#111111] p-6">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500 text-xl">
                    💬
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-white">
                      Tanya AI
                    </h3>

                    <p className="text-sm text-gray-500">
                      Bingung dengan hasil di atas?
                      Tanya langsung kepada AI.
                    </p>
                  </div>

                </div>

                {/* QUICK QUESTIONS */}
                <div className="mt-5 flex flex-wrap gap-2">

                  {[
                    "Saya harus mulai dari mana?",
                    "Jelaskan dengan lebih sederhana.",
                    "Berikan contoh untuk pemula.",
                    "Bagaimana cara menerapkannya?",
                  ].map((text) => (
                    <button
                      key={text}
                      type="button"
                      onClick={() =>
                        setQuestion(text)
                      }
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-gray-300 transition hover:border-yellow-400 hover:text-yellow-400"
                    >
                      {text}
                    </button>
                  ))}

                </div>

                {/* QUESTION FORM */}
                <div className="mt-5 rounded-2xl border border-white/10 bg-[#171717] p-4">

                  <textarea
                    value={question}
                    onChange={(e) =>
                      setQuestion(e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter" &&
                        !e.shiftKey
                      ) {
                        e.preventDefault();
                        handleAskAI();
                      }
                    }}
                    rows={4}
                    placeholder="Contoh: Saya masih pemula, langkah pertama yang harus saya lakukan apa?"
                    className="w-full resize-none bg-transparent text-sm leading-6 text-white outline-none placeholder:text-gray-600"
                  />

                  <div className="mt-3 flex items-center justify-between">

                    <p className="text-xs text-gray-600">
                      Enter untuk mengirim • Shift +
                      Enter untuk baris baru
                    </p>

                    <button
                      type="button"
                      onClick={handleAskAI}
                      disabled={
                        asking ||
                        !question.trim()
                      }
                      className="rounded-xl bg-yellow-500 px-5 py-3 text-sm font-bold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {asking
                        ? "AI menjawab..."
                        : "Tanya AI →"}
                    </button>

                  </div>

                </div>

                {/* AI ANSWER */}
                {answer && (
                  <div className="mt-5 rounded-2xl border border-green-500/20 bg-green-500/5 p-5">

                    <div className="flex items-center gap-2">

                      <span className="text-lg">
                        🤖
                      </span>

                      <p className="font-bold text-green-400">
                        Jawaban AI
                      </p>

                    </div>

                    <pre className="mt-4 whitespace-pre-wrap font-sans text-sm leading-7 text-gray-300">
                      {answer}
                    </pre>

                  </div>
                )}

              </div>
            </>
          )}

                </div>

      </div>

    </div>
    </DashboardLayout>
  );
}