import { useState } from "react";

import { generateText } from "../../services/ai";

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

export default function GeneratorForm({
  title,
  fields,
  buttonText,
  prompt,
  systemPrompt,
}: Props) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  function updateValue(name: string, value: string) {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleGenerate() {
    setLoading(true);

    try {
      const ai = await generateText({
        systemPrompt,
        userPrompt: prompt(values),
      });

      setResult(ai);
    } catch {
      setResult("Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-[#111111] p-8">
      <h2 className="text-3xl font-black text-white">
        {title}
      </h2>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {fields.map((field) => {
          if (field.type === "select") {
            return (
              <select
                key={field.name}
                value={values[field.name] ?? field.options?.[0] ?? ""}
                onChange={(e) => updateValue(field.name, e.target.value)}
                className="rounded-2xl border border-white/10 bg-[#1B1B1B] px-5 py-4 text-white outline-none"
              >
                {field.options?.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            );
          }

          return (
            <input
              key={field.name}
              value={values[field.name] ?? ""}
              onChange={(e) => updateValue(field.name, e.target.value)}
              placeholder={field.placeholder || field.label}
              className="rounded-2xl border border-white/10 bg-[#1B1B1B] px-5 py-4 text-white outline-none"
            />
          );
        })}
      </div>

      <GeneratorButton
        loading={loading}
        text={buttonText}
        onClick={handleGenerate}
      />

      <GeneratorResult result={result} />
    </div>
  );
}