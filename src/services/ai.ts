const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

type GenerateTextProps = {
  systemPrompt: string;
  userPrompt: string;
};

export async function generateText({
  systemPrompt,
  userPrompt,
}: GenerateTextProps) {
  const isLocal = window.location.hostname === "localhost";

  const response = await fetch(
    isLocal
      ? "https://openrouter.ai/api/v1/chat/completions"
      : "/api/generate",
    {
      method: "POST",
      headers: isLocal
        ? {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          }
        : {
            "Content-Type": "application/json",
          },
      body: JSON.stringify(
        isLocal
          ? {
              model: "deepseek/deepseek-chat-v3",
              temperature: 0.7,
              messages: [
                {
                  role: "system",
                  content: systemPrompt,
                },
                {
                  role: "user",
                  content: userPrompt,
                },
              ],
            }
          : {
              model: "deepseek/deepseek-chat-v3",
              temperature: 0.7,
              messages: [
                {
                  role: "system",
                  content: systemPrompt,
                },
                {
                  role: "user",
                  content: userPrompt,
                },
              ],
            }
      ),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  const data = await response.json();

  return data.choices[0].message.content;
}