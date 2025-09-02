"use client";

import { ChatUI } from "@/components/chat-ui";
import { title, subtitle } from "@/components/primitives";

// Sample initial messages for demonstration
const initialMessages = [
  {
    id: "1",
    text: "Hello! How can I help you today?",
    isUser: false,
    timestamp: new Date(Date.now() - 60000 * 5) // 5 minutes ago
  },
  {
    id: "2",
    text: "I have a question about your services.",
    isUser: true,
    timestamp: new Date(Date.now() - 60000 * 4) // 4 minutes ago
  },
  {
    id: "3",
    text: "Of course! I'd be happy to help. What would you like to know?",
    isUser: false,
    timestamp: new Date(Date.now() - 60000 * 3) // 3 minutes ago
  }
];

export default function ChatDemoPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title({ color: "blue" })}>Chat UI</h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          A responsive chat interface component
        </h2>
      </div>

      <div className="w-full max-w-4xl px-6 py-8">
        <ChatUI initialMessages={initialMessages} height="600px" />
      </div>
    </section>
  );
}
