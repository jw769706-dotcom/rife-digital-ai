export type GeneratorField = {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "select";
  options?: string[];
};

export type GeneratorTool = {
  id: string;
  title: string;
  description: string;
  icon: string;

  fields: GeneratorField[];

  buttonText: string;

  prompt: (
    values: Record<string, string>
  ) => string;

  systemPrompt: string;
};