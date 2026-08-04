import writerPrompt from "../prompts/writerPrompt";

export type WriterTool = {
  id: string;
  title: string;
  description: string;
  icon: string;
  systemPrompt: string;
  fields: {
    name: string;
    label: string;
    placeholder?: string;
    type?: "text" | "select";
    options?: string[];
  }[];
  buttonText: string;
  prompt: (values: Record<string, string>) => string;
};

export const writerTools: WriterTool[] = [
  {
    id: "caption",
    title: "Caption Instagram",
    description: "Buat caption Instagram yang menjual.",
    icon: "✍️",
    systemPrompt: writerPrompt,
    buttonText: "Generate Caption",
    fields: [
      {
        name: "product",
        label: "Nama Produk",
        placeholder: "Contoh: Ebook Canva",
      },
      {
        name: "target",
        label: "Target Market",
        placeholder: "Contoh: Guru SD",
      },
      {
        name: "goal",
        label: "Tujuan",
        type: "select",
        options: ["Menjual", "Brand Awareness", "Edukasi"],
      },
      {
        name: "tone",
        label: "Gaya Bahasa",
        type: "select",
        options: ["Santai", "Profesional", "Persuasif"],
      },
    ],
    prompt(values) {
      return `
Buat caption Instagram.

Nama Produk:
${values.product}

Target Market:
${values.target}

Tujuan:
${values.goal}

Gaya Bahasa:
${values.tone}

Format:

Hook

Isi Caption

CTA
`;
    },
  },

  {
    id: "landing",
    title: "Landing Page",
    description: "Landing page yang meningkatkan konversi.",
    icon: "📄",
    systemPrompt: writerPrompt,
    buttonText: "Generate Landing Page",
    fields: [
      {
        name: "product",
        label: "Nama Produk",
      },
      {
        name: "target",
        label: "Target Market",
      },
      {
        name: "benefit",
        label: "Benefit Utama",
      },
      {
        name: "cta",
        label: "Call To Action",
      },
    ],
    prompt(values) {
      return `
Buat landing page yang menjual.

Produk:
${values.product}

Target:
${values.target}

Benefit:
${values.benefit}

CTA:
${values.cta}
`;
    },
  },

  {
    id: "email",
    title: "Email Marketing",
    description: "Email promosi yang profesional.",
    icon: "📧",
    systemPrompt: writerPrompt,
    buttonText: "Generate Email",
    fields: [
      {
        name: "product",
        label: "Nama Produk",
      },
      {
        name: "target",
        label: "Target Market",
      },
      {
        name: "purpose",
        label: "Tujuan Email",
      },
    ],
    prompt(values) {
      return `
Buat Email Marketing.

Produk:
${values.product}

Target:
${values.target}

Tujuan:
${values.purpose}
`;
    },
  },
];