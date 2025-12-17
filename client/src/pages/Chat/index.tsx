import { useState, useCallback, useRef, useEffect } from "react";
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
import {
  chatApi,
  type ChatMessage as ApiChatMessage,
  type ChatHistoryEntry,
} from "../../lib/chat";
import { useYandereLevel } from "../../contexts/YandereLevelContext";
import { Icon } from "@iconify/react";
import { ConfirmModal } from "../../components/ConfirmModal";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const clearHistoryModalConfig = {
  title: "CLEAR_HISTORY",
  message: "Are you sure you want to clear all chat history with Lucy?",
  subMessage: "This action cannot be undone.",
  statusText: "CONFIRM_CLEAR",
  icon: "pixelarticons:trash",
  confirmText: "CLEAR",
  cancelText: "CANCEL",
  theme: "danger" as const,
  warningText: "WARNING",
  irreversibleText: "IRREVERSIBLE",
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

  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showClearModal, setShowClearModal] = useState(false);

  // Load chat history on mount
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const history = await chatApi.getHistory();
        if (history.length > 0) {
          // Convert history entries to messages
          const loadedMessages: Message[] = history.map(
            (entry: ChatHistoryEntry) => ({
              id: entry.id,
              content: entry.content,
              isUser: entry.role === "user",
              timestamp: new Date(entry.timestamp),
            })
          );
          setMessages(loadedMessages);

          // Rebuild conversation history ref for context
          conversationHistoryRef.current = history.map(
            (entry: ChatHistoryEntry) => ({
              role: entry.role,
              content: entry.content,
            })
          );
        }
      } catch (error) {
        console.error("Failed to load chat history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, []);

  useChatAnimations(isLoading);

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

      // Save user message to database
      chatApi.saveMessage("user", content).catch(console.error);

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

        // Save AI response to database
        chatApi.saveMessage("assistant", response.message).catch(console.error);
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

  const handleClearHistory = async () => {
    try {
      await chatApi.clearHistory();
      setMessages([]);
      conversationHistoryRef.current = [];
      setShowClearModal(false);
    } catch (error) {
      console.error("Failed to clear history:", error);
    }
  };

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
            <div className="flex items-center gap-3">
              <div className="text-[10px] text-fuchsia-400/40 tracking-widest">
                {messages.length} MESSAGES
              </div>
              {messages.length > 0 && (
                <button
                  onClick={() => setShowClearModal(true)}
                  className="text-[10px] text-red-400/60 hover:text-red-400 tracking-widest flex items-center gap-1 transition-colors"
                  title="Clear chat history"
                >
                  <Icon icon="pixelarticons:trash" className="w-3 h-3" />
                  CLEAR
                </button>
              )}
            </div>
          </div>
          <div className="relative min-h-0 flex-1 flex flex-col">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/80 z-20">
                <div className="text-cyan-400/60 text-sm tracking-widest animate-pulse">
                  LOADING_HISTORY...
                </div>
              </div>
            )}
            <ChatMessages messages={messages} isTyping={isTyping} />
          </div>
          <ChatInput onSend={handleSend} disabled={isTyping || isLoading} />
        </div>
      </div>

      <ConfirmModal
        isVisible={showClearModal}
        onConfirm={handleClearHistory}
        onCancel={() => setShowClearModal(false)}
        config={clearHistoryModalConfig}
      />
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
