import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { animate } from "animejs";
import { useChatAnimationRefs } from "../contexts/ChatAnimationsContext";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const { inputRef } = useChatAnimationRefs();
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const sendButtonRef = useRef<HTMLButtonElement>(null);

  const maxLength = 500;
  const canSend = message.trim().length > 0 && !disabled;

  // Animate send button on enable/disable
  useEffect(() => {
    if (sendButtonRef.current && canSend) {
      animate(sendButtonRef.current, {
        scale: [1, 1.1, 1],
        duration: 300,
        ease: "outBack",
      });
    }
  }, [canSend]);

  const handleSend = () => {
    if (canSend) {
      onSend(message.trim());
      setMessage("");

      // Flash effect
      if (inputRef.current) {
        animate(inputRef.current, {
          boxShadow: [
            "0 0 20px rgba(236,72,153,0.3)",
            "0 0 60px rgba(236,72,153,0.6)",
            "0 0 20px rgba(236,72,153,0.3)",
          ],
          duration: 300,
          ease: "outQuad",
        });
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      ref={inputRef}
      className="relative p-4 bg-zinc-900/80 border-2 border-pink-500/40"
      style={{ opacity: 0 }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-pink-500 via-fuchsia-500 to-cyan-500 opacity-50" />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-pink-500" />
      <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-cyan-500" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-cyan-500" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-pink-500" />

      {/* Input label */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-[10px] text-pink-400/60 tracking-widest">
          <Icon icon="pixelarticons:message" className="w-3 h-3" />
          TRANSMISSION_INPUT
        </div>
        <div
          className={`text-[10px] tracking-widest ${
            message.length > maxLength * 0.9 ? "text-red-400" : "text-zinc-500"
          }`}
        >
          {message.length}/{maxLength}
        </div>
      </div>

      {/* Input area */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, maxLength))}
            onKeyDown={handleKeyDown}
            placeholder="ENTER_MESSAGE..."
            disabled={disabled}
            rows={2}
            className="w-full bg-zinc-800/60 border border-pink-500/30 px-4 py-3 text-white text-sm tracking-wide resize-none focus:outline-none focus:border-pink-400 focus:shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-all placeholder:text-zinc-600"
          />

          {/* Scanline overlay */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.05)_50%)] bg-size-[100%_4px]" />
        </div>

        {/* Send button */}
        <button
          ref={sendButtonRef}
          onClick={handleSend}
          disabled={!canSend}
          className={`relative px-6 py-3 font-bold tracking-widest text-sm transition-all flex items-center gap-2 overflow-hidden ${
            canSend
              ? "bg-linear-to-r from-pink-600 via-fuchsia-500 to-pink-600 text-white hover:scale-105"
              : "bg-zinc-800 text-zinc-500 border border-zinc-700"
          }`}
          style={{
            boxShadow: canSend ? "0 0 25px rgba(236,72,153,0.4)" : undefined,
          }}
        >
          {/* Shimmer effect */}
          {canSend && (
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          )}
          <Icon
            icon="pixelarticons:arrow-right"
            className="w-5 h-5 relative z-10"
          />
          <span className="relative z-10 hidden sm:inline">SEND</span>
        </button>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between mt-3 text-[9px] text-zinc-500 tracking-widest">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          CONNECTION_STABLE
        </div>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-1 h-3 ${i < 4 ? "bg-cyan-500" : "bg-zinc-700"}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          ENCRYPTION: AES-256
          <Icon icon="pixelarticons:lock" className="w-3 h-3 text-cyan-500" />
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
