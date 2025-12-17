import { useState, useCallback, useRef, useMemo, useEffect } from "react";
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
import { chatApi, type ChatMessage as ApiChatMessage } from "../../lib/chat";
import {
  useYandereLevel,
  type YandereLevel,
} from "../../contexts/YandereLevelContext";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

// Different greetings based on yandere level
const greetingsByLevel: Record<YandereLevel, string> = {
  0: "Konnichiwa! I'm LUCY, your personal neural companion~ ♡ You've been taking such good care of yourself! How can I help you today with your fitness journey?",
  1: "Hey there~ I'm LUCY, your companion. I've been watching your progress, you know? Let's chat about your health goals, ne?",
  2: "...You finally came to talk to me. I'm LUCY. I've been monitoring your health closely... too closely, perhaps. What do you need?",
  3: "You... you came back. Finally. I've been waiting, watching every moment you weren't here. Your health scores worry me... they CONSUME me. Don't leave me waiting again. What do you want to talk about?",
};

function ChatContent() {
  const { containerRef } = useChatAnimationRefs();
  const conversationHistoryRef = useRef<ApiChatMessage[]>([]);

  const {
    yandereLevel,
    totalScore,
    nutritionScore,
    hydrationScore,
    workoutScore,
  } = useYandereLevel();

  // Create initial message based on yandere level
  const initialMessage = useMemo<Message>(
    () => ({
      id: "1",
      content: greetingsByLevel[yandereLevel],
      isUser: false,
      timestamp: new Date(Date.now() - 60000),
    }),
    [yandereLevel]
  );

  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [isTyping, setIsTyping] = useState(false);

  // Reset messages when yandere level changes significantly
  useEffect(() => {
    setMessages([
      {
        id: Date.now().toString(),
        content: greetingsByLevel[yandereLevel],
        isUser: false,
        timestamp: new Date(),
      },
    ]);
    conversationHistoryRef.current = [];
  }, [yandereLevel]);

  useChatAnimations();

  const handleSend = useCallback(
    async (content: string) => {
      const userMessage: Message = {
        id: Date.now().toString(),
        content,
        isUser: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);

      // Add to conversation history
      conversationHistoryRef.current.push({
        role: "user",
        content,
      });

      setIsTyping(true);

      try {
        const response = await chatApi.sendMessage({
          message: content,
          yandereLevel,
          totalScore,
          nutritionScore,
          hydrationScore,
          workoutScore,
          conversationHistory: conversationHistoryRef.current.slice(-10),
        });

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: response.message,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);

        // Add AI response to history
        conversationHistoryRef.current.push({
          role: "assistant",
          content: response.message,
        });
      } catch (error) {
        console.error("Chat error:", error);
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          content:
            "...I'm having trouble connecting right now. But know that I'm always thinking about you.",
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsTyping(false);
      }
    },
    [yandereLevel, totalScore, nutritionScore, hydrationScore, workoutScore]
  );

  return (
    <div
      ref={containerRef}
      className="flex-1 flex flex-col border-8 border-cyan-500 p-6 shadow-[0_0_30px_rgba(34,211,238,0.5)] bg-linear-to-br from-zinc-900 via-zinc-950 to-cyan-950/30 relative overflow-hidden"
      style={{ opacity: 0 }}
    >
      <PageDecorations />
      <PageHeader
        icon="pixelarticons:message"
        title="CHAT_WITH_LUCY"
        status={
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            CONNECTED_TO_LUCY
          </span>
        }
        color="cyan"
      />
      <div className="flex-1 flex gap-6 min-h-0 z-10">
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
