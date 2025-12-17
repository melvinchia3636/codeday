import { useState, useCallback } from "react";
import {
  ChatAnimationsProvider,
  useChatAnimationRefs,
} from "./contexts/ChatAnimationsContext";
import { useChatAnimations } from "./hooks/useChatAnimations";
import { PageDecorationsProvider } from "../../contexts/PageDecorationsContext";
import { PageHeader } from "../../components/PageHeader";
import { PageDecorations } from "../../components/PageDecorations";
import { WaifuPanel } from "../Dashboard/components/WaifuPanel";
import { ChatMessages } from "./components/ChatMessages";
import { ChatInput } from "./components/ChatInput";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

// Initial messages to greet the user
const initialMessages: Message[] = [
  {
    id: "1",
    content:
      "Konnichiwa! I'm LUCY, your personal neural companion. How can I assist you today with your fitness journey?",
    isUser: false,
    timestamp: new Date(Date.now() - 60000),
  },
];

// Sample AI responses for demo
const aiResponses = [
  "That's great progress! Keep pushing your limits!",
  "I've analyzed your workout data. Your form is improving steadily!",
  "Remember to stay hydrated during your training sessions!",
  "Based on your goals, I recommend focusing on compound movements today.",
  "Your dedication is inspiring! Let's crush those goals together!",
  "I've noticed you've been consistent with your workouts. Amazing work!",
  "Would you like me to suggest a new workout routine?",
  "Your nutrition tracking shows great balance. Keep it up!",
];

function ChatContent() {
  const { containerRef } = useChatAnimationRefs();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);

  // Run animations
  useChatAnimations();

  const handleSend = useCallback((content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI typing
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex-1 flex flex-col border-8 border-cyan-500 p-6 shadow-[0_0_30px_rgba(34,211,238,0.5)] bg-linear-to-br from-zinc-900 via-zinc-950 to-cyan-950/30 relative overflow-hidden"
      style={{ opacity: 0 }}
    >
      <PageDecorations />
      <PageHeader
        icon="pixelarticons:message"
        title="NEURAL_CHAT"
        status={
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            CONNECTED_TO_LUCY
          </span>
        }
        color="cyan"
      />
      <div className="flex-1 flex gap-6 min-h-0 z-10">
        {/* Left side - Lucy avatar panel */}
        <div className="w-96 shrink-0">
          <WaifuPanel />
        </div>
        <div className="flex-1 flex flex-col bg-zinc-900/50 border border-cyan-500/30">
          <div className="p-3 border-b border-cyan-500/30 flex items-center justify-between">
            <div className="text-[10px] text-cyan-400/60 tracking-widest flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-cyan-400" />
              TRANSMISSION_FEED
            </div>
            <div className="text-[10px] text-fuchsia-400/40 tracking-widest">
              {messages.length} MESSAGES
            </div>
          </div>
          <ChatMessages messages={messages} isTyping={isTyping} />
          <ChatInput onSend={handleSend} disabled={isTyping} />
        </div>
      </div>
    </div>
  );
}

export function Chat() {
  return (
    <PageDecorationsProvider color="cyan">
      <ChatAnimationsProvider>
        <ChatContent />
      </ChatAnimationsProvider>
    </PageDecorationsProvider>
  );
}
