import { useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { animate, stagger } from "animejs";
import { useChatAnimationRefs } from "../contexts/ChatAnimationsContext";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatMessagesProps {
  messages: Message[];
  isTyping?: boolean;
}

export function ChatMessages({
  messages,
  isTyping = false,
}: ChatMessagesProps) {
  const { messagesRef } = useChatAnimationRefs();
  const prevMessageIdsRef = useRef<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages.length, isTyping]);

  // Animate new messages
  useEffect(() => {
    if (!messagesRef.current) return;

    // Find new message IDs
    const currentIds = new Set(messages.map((m) => m.id));
    const newIds = messages.filter((m) => !prevMessageIdsRef.current.has(m.id));

    // Animate new messages
    if (newIds.length > 0 && prevMessageIdsRef.current.size > 0) {
      newIds.forEach((msg) => {
        const element = messagesRef.current?.querySelector(
          `[data-message-id="${msg.id}"]`
        );
        if (element) {
          animate(element, {
            opacity: [0, 1],
            translateY: [20, 0],
            scale: [0.9, 1],
            duration: 400,
            ease: "outBack",
          });
        }
      });
    }

    prevMessageIdsRef.current = currentIds;
  }, [messages, messagesRef]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      ref={(el) => {
        containerRef.current = el;
        if (messagesRef) {
          (
            messagesRef as React.MutableRefObject<HTMLDivElement | null>
          ).current = el;
        }
      }}
      className="flex-1 overflow-y-auto p-4 space-y-4"
      style={{ opacity: 0 }}
    >
      {/* Decorative line at top */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-linear-to-r from-transparent via-cyan-500/30 to-transparent" />
        <span className="text-[10px] text-cyan-500/50 tracking-widest">
          TRANSMISSION_LOG
        </span>
        <div className="flex-1 h-px bg-linear-to-r from-transparent via-cyan-500/30 to-transparent" />
      </div>

      {messages.map((message) => (
        <div
          key={message.id}
          data-message-id={message.id}
          className={`chat-message flex ${
            message.isUser ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`relative max-w-[70%] p-4 ${
              message.isUser
                ? "bg-pink-500/10 border border-pink-500/40"
                : "bg-cyan-500/10 border border-cyan-500/40"
            }`}
          >
            {/* Corner accents */}
            <div
              className={`absolute top-0 ${
                message.isUser ? "right-0" : "left-0"
              } w-2 h-2 border-${message.isUser ? "r" : "l"}-2 border-t-2 ${
                message.isUser ? "border-pink-500" : "border-cyan-500"
              }`}
            />
            <div
              className={`absolute bottom-0 ${
                message.isUser ? "left-0" : "right-0"
              } w-2 h-2 border-${message.isUser ? "l" : "r"}-2 border-b-2 ${
                message.isUser ? "border-pink-500" : "border-cyan-500"
              }`}
            />

            {/* Sender label */}
            <div
              className={`text-[9px] tracking-widest mb-2 flex items-center gap-2 ${
                message.isUser ? "text-pink-400/60" : "text-cyan-400/60"
              }`}
            >
              <Icon
                icon={
                  message.isUser ? "pixelarticons:user" : "pixelarticons:avatar"
                }
                className="w-3 h-3"
              />
              {message.isUser ? "USER" : "LUCY"}
            </div>

            {/* Message content */}
            <p
              className={`text-sm leading-relaxed ${
                message.isUser ? "text-pink-100" : "text-cyan-100"
              }`}
            >
              {message.content}
            </p>

            {/* Timestamp */}
            <div
              className={`text-[8px] tracking-wider mt-2 ${
                message.isUser ? "text-pink-500/40" : "text-cyan-500/40"
              }`}
            >
              {formatTime(message.timestamp)}
            </div>
          </div>
        </div>
      ))}

      {/* Typing indicator */}
      {isTyping && (
        <div className="chat-message flex justify-start">
          <div className="relative max-w-[70%] p-4 bg-cyan-500/10 border border-cyan-500/40">
            <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-cyan-500" />
            <div className="text-[9px] tracking-widest mb-2 text-cyan-400/60 flex items-center gap-2">
              <Icon icon="pixelarticons:avatar" className="w-3 h-3" />
              LUCY
            </div>
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 200}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
