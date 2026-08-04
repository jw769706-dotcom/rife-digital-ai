import { useState } from "react";
import {
  Paperclip,
  Mic,
  SendHorizontal,
  Sparkles,
} from "lucide-react";

import { generateText } from "../../services/ai";
import writerPrompt from "../../prompts/writerPrompt";
import type { ChatMessage } from "./ChatMessages";

type ChatInputProps = {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ChatInput({
  setMessages,
  loading,
  setLoading,
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  async function handleSend() {
    if (!message.trim() || loading) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    setMessage("");
    setLoading(true);

    try {
      const ai = await generateText({
        systemPrompt: writerPrompt,
        userPrompt: message,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: ai,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "❌ Terjadi kesalahan.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="sticky bottom-0 border-t border-white/10 bg-[#0B0B0B]/95 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-6xl px-8 py-6">

        <div className="rounded-[30px] border border-white/10 bg-[#171717] p-5">

          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Tanyakan apa saja kepada AI..."
            className="min-h-[90px] w-full resize-none bg-transparent text-[16px] leading-8 text-white outline-none placeholder:text-gray-500"
          />

          <div className="mt-5 flex items-center justify-between">

            <div className="flex items-center gap-3">

              <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#202020] text-gray-300">
                <Paperclip size={18} />
              </button>

              <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#202020] text-gray-300">
                <Mic size={18} />
              </button>

              <button
                onClick={() =>
                  setMessage(
                    "Buatkan caption Instagram yang menjual produk digital dengan CTA kuat."
                  )
                }
                className="flex items-center gap-2 rounded-xl border border-yellow-400/20 bg-yellow-400/10 px-4 py-3 text-sm font-semibold text-yellow-300"
              >
                <Sparkles size={16} />
                Quick Prompt
              </button>

            </div>

            <button
              onClick={handleSend}
              disabled={loading}
              className="flex items-center gap-2 rounded-2xl bg-yellow-400 px-6 py-3 font-bold text-black transition hover:bg-yellow-300 disabled:opacity-50"
            >
              {loading ? "Generating..." : "Kirim"}
              <SendHorizontal size={18} />
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}