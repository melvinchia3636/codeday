import type { RefObject } from "react";
import { Icon } from "@iconify/react";

interface ErrorDisplayProps {
  errorCodeRef: RefObject<HTMLDivElement | null>;
  glowRef: RefObject<HTMLDivElement | null>;
  messageRef: RefObject<HTMLDivElement | null>;
  errorLogRef: RefObject<HTMLDivElement | null>;
}

export function ErrorDisplay({
  errorCodeRef,
  glowRef,
  messageRef,
  errorLogRef,
}: ErrorDisplayProps) {
  return (
    <>
      <div className="relative inline-block mb-8">
        <div
          ref={glowRef}
          className="absolute -inset-16 bg-pink-500/20 blur-3xl rounded-full"
          style={{ opacity: 0 }}
        />
        <div
          ref={errorCodeRef}
          className="text-[14rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-pink-400 via-fuchsia-500 to-pink-600 select-none tracking-tighter"
          style={{ opacity: 0, textShadow: "0 0 100px rgba(236,72,153,0.5)" }}
        >
          404
        </div>
        <div className="absolute inset-0 text-[14rem] font-black leading-none text-pink-500/10 blur-2xl select-none tracking-tighter">
          404
        </div>
        <div className="absolute -inset-4 border-2 border-pink-500/40 shadow-[inset_0_0_30px_rgba(236,72,153,0.2)]" />
        <div className="absolute -inset-8 border border-pink-500/20" />
        <div className="absolute -inset-12 border border-pink-500/10" />
      </div>

      <div ref={messageRef} className="space-y-4 mb-10">
        <p
          className="message-item text-pink-400 text-2xl tracking-[0.4em] uppercase flex items-center justify-center gap-3"
          style={{ opacity: 0 }}
        >
          <Icon icon="pixelarticons:warning-box" className="w-7 h-7" />
          SYSTEM_ERROR
          <Icon icon="pixelarticons:warning-box" className="w-7 h-7" />
        </p>
        <div
          className="message-item flex items-center justify-center gap-3 text-red-400 text-sm"
          style={{ opacity: 0 }}
        >
          <span className="w-3 h-3 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
          <span className="tracking-[0.3em]">ROUTE_NOT_FOUND.exe</span>
          <span className="w-3 h-3 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
        </div>
        <p
          className="message-item text-fuchsia-300/70 text-base max-w-lg mx-auto tracking-wide leading-relaxed"
          style={{ opacity: 0 }}
        >
          <Icon icon="pixelarticons:code" className="inline w-4 h-4 mr-2" />
          The requested neural pathway does not exist in this dimension.
          <br />
          Please verify your coordinates and try again.
          <Icon icon="pixelarticons:code" className="inline w-4 h-4 ml-2" />
        </p>
      </div>

      <div
        ref={errorLogRef}
        className="bg-zinc-900/90 border-2 border-pink-500/50 p-5 mb-10 max-w-lg mx-auto backdrop-blur-sm shadow-[0_0_30px_rgba(236,72,153,0.2)]"
        style={{ opacity: 0 }}
      >
        <div className="text-xs text-pink-400 tracking-[0.3em] mb-3 text-left flex items-center gap-2 border-b border-pink-500/30 pb-2">
          <Icon icon="pixelarticons:file" className="w-4 h-4" />
          ERROR_LOG //
        </div>
        <div className="font-mono text-sm text-left space-y-2">
          <p
            className="log-line text-cyan-400 flex items-center gap-2"
            style={{ opacity: 0 }}
          >
            <Icon
              icon="pixelarticons:clock"
              className="w-4 h-4 text-zinc-500"
            />
            <span className="text-zinc-500">[TIMESTAMP]</span> Connection
            terminated
          </p>
          <p
            className="log-line text-fuchsia-400 flex items-center gap-2"
            style={{ opacity: 0 }}
          >
            <Icon
              icon="pixelarticons:warning-box"
              className="w-4 h-4 text-zinc-500"
            />
            <span className="text-zinc-500">[STATUS]</span> 404 - Not Found
          </p>
          <p
            className="log-line text-pink-400 flex items-center gap-2"
            style={{ opacity: 0 }}
          >
            <Icon
              icon="pixelarticons:arrow-right"
              className="w-4 h-4 text-zinc-500"
            />
            <span className="text-zinc-500">[ACTION]</span> Redirect recommended
          </p>
        </div>
      </div>
    </>
  );
}
