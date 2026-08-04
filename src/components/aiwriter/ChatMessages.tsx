import MessageBubble from "./MessageBubble";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatMessagesProps = {
  messages: ChatMessage[];
  loading: boolean;
};

export default function ChatMessages({
  messages,
  loading,
}: ChatMessagesProps) {
  return (
    <main className="flex-1 overflow-y-auto bg-[#090909]">
      <div className="mx-auto w-full max-w-6xl px-8 py-12">

        <div className="space-y-12">

          {messages.map((message, index) => (
            <MessageBubble
              key={index}
              role={message.role}
              content={message.content}
            />
          ))}

          {loading && (
            <MessageBubble
              role="assistant"
              content="✦ AI sedang berpikir..."
            />
          )}

        </div>

        <div className="h-32" />

      </div>
    </main>
  );
}