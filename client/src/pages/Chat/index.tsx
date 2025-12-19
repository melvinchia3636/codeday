import {
  ChatAnimationsProvider,
  useChatAnimationRefs,
} from "./contexts/ChatAnimationsContext";
import { useChatAnimations } from "./hooks/useChatAnimations";
import { PageDecorationsProvider } from "../../contexts/PageDecorationsContext";
import { PageHeader } from "../../components/PageHeader";
import { PageDecorations } from "../../components/PageDecorations";
import { WaifuPanel } from "../Dashboard/components/WaifuPanel";
import { ChatComingSoon } from "./components/ChatComingSoon";

function ChatContent() {
  const { containerRef } = useChatAnimationRefs();

  useChatAnimations(false);

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
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            UPGRADING_SYSTEMS
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
              <div className="w-1.5 h-1.5 bg-amber-400" />
              TRANSMISSION_FEED
            </div>
            <div className="text-[10px] text-amber-400/60 tracking-widest">
              STATUS: MAINTENANCE
            </div>
          </div>
          <ChatComingSoon />
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
