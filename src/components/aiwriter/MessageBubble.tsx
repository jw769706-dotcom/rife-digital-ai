type MessageBubbleProps = {
  role: "user" | "assistant";
  content: string;
};

export default function MessageBubble({
  role,
  content,
}: MessageBubbleProps) {
  const isUser = role === "user";

  return (
    <div
      className={`flex w-full ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`rounded-[28px] transition-all duration-300

        ${
          isUser
            ? "max-w-3xl bg-yellow-500 text-black"
            : "w-full max-w-5xl border border-white/10 bg-[#171717] text-white"
        }`}
      >
        {!isUser && (
          <div className="flex items-center gap-4 border-b border-white/10 px-8 py-6">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500 text-lg font-black text-black">
              AI
            </div>

            <div>

              <h3 className="text-xl font-bold">
                Rife AI
              </h3>

            

            </div>

          </div>
        )}

        <div className="px-8 py-7">

          <div className="whitespace-pre-line text-[17px] leading-9">

            {content}

          </div>

                    {!isUser && (
            <div className="mt-8 flex items-center gap-6 border-t border-white/10 pt-6">

              <button className="rounded-xl bg-white/5 px-4 py-2 text-sm text-gray-300 transition hover:bg-white/10">
                📋 Copy
              </button>

              <button className="rounded-xl bg-white/5 px-4 py-2 text-sm text-gray-300 transition hover:bg-white/10">
                🔄 Regenerate
              </button>

              <button className="rounded-xl bg-white/5 px-4 py-2 text-sm text-gray-300 transition hover:bg-white/10">
                📤 Export
              </button>

            </div>
          )}

          {isUser && (
            <div className="mt-5 text-sm font-medium text-black/70">
              Kamu
            </div>
          )}

        </div>

      </div>

    </div>
  );
}