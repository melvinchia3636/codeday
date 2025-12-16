import type { RefObject } from "react";
import { Link } from "react-router";
import { Icon } from "@iconify/react";

interface SignupFormProps {
  formRef: RefObject<HTMLFormElement | null>;
  cardRef: RefObject<HTMLDivElement | null>;
  glowBorderRef: RefObject<HTMLDivElement | null>;
  terminalIndicatorRef: RefObject<HTMLSpanElement | null>;
  indicatorDotsRef: RefObject<HTMLDivElement[]>;
  username: string;
  password: string;
  confirmPassword: string;
  isLoading: boolean;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  handleInputFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleInputBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleButtonHover: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleButtonLeave: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function SignupForm({
  formRef,
  cardRef,
  glowBorderRef,
  terminalIndicatorRef,
  indicatorDotsRef,
  username,
  password,
  confirmPassword,
  isLoading,
  onUsernameChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  handleInputFocus,
  handleInputBlur,
  handleButtonHover,
  handleButtonLeave,
}: SignupFormProps) {
  return (
    <>
      <div className="relative" style={{ perspective: "1000px" }}>
        <div
          ref={glowBorderRef}
          className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-pink-500 opacity-30 blur-sm"
        />
        <div
          ref={cardRef}
          className="relative bg-zinc-900/95 border-2 border-cyan-500/50 p-10 backdrop-blur-sm"
          style={{ opacity: 0 }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-transparent" />

          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-cyan-500/30">
            <span ref={terminalIndicatorRef} className="text-cyan-500">
              <Icon icon="pixelarticons:command" className="w-4 h-4" />
            </span>
            <span className="text-cyan-400 text-xs tracking-widest uppercase flex items-center gap-2">
              <Icon icon="pixelarticons:user-plus" className="w-4 h-4" />{" "}
              CREATE_IDENTITY
            </span>
          </div>

          <form ref={formRef} onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-2 form-element" style={{ opacity: 0 }}>
              <label className="text-xs text-cyan-400 tracking-widest uppercase flex items-center gap-2">
                <Icon
                  icon="pixelarticons:user"
                  className="w-4 h-4 text-pink-400"
                />{" "}
                USER_HANDLE
              </label>
              <div className="relative group">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => onUsernameChange(e.target.value)}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  placeholder="enter_username"
                  className="w-full bg-zinc-800/50 border-2 border-cyan-500/30 px-4 py-3 text-white placeholder-zinc-600 focus:outline-none transition-all tracking-wide"
                />
                <div className="input-icon absolute right-3 top-1/2 -translate-y-1/2 text-cyan-500/50 group-focus-within:text-pink-400 transition-colors">
                  <Icon icon="pixelarticons:at" className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="space-y-2 form-element" style={{ opacity: 0 }}>
              <label className="text-xs text-cyan-400 tracking-widest uppercase flex items-center gap-2">
                <Icon
                  icon="pixelarticons:lock"
                  className="w-4 h-4 text-pink-400"
                />{" "}
                ACCESS_KEY
              </label>
              <div className="relative group">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => onPasswordChange(e.target.value)}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  placeholder="••••••••••••"
                  className="w-full bg-zinc-800/50 border-2 border-cyan-500/30 px-4 py-3 text-white placeholder-zinc-600 focus:outline-none transition-all tracking-widest"
                />
                <div className="input-icon absolute right-3 top-1/2 -translate-y-1/2 text-cyan-500/50 group-focus-within:text-pink-400 transition-colors">
                  <Icon icon="pixelarticons:shield" className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="space-y-2 form-element" style={{ opacity: 0 }}>
              <label className="text-xs text-cyan-400 tracking-widest uppercase flex items-center gap-2">
                <Icon
                  icon="pixelarticons:lock"
                  className="w-4 h-4 text-pink-400"
                />{" "}
                CONFIRM_KEY
              </label>
              <div className="relative group">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => onConfirmPasswordChange(e.target.value)}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  placeholder="••••••••••••"
                  className="w-full bg-zinc-800/50 border-2 border-cyan-500/30 px-4 py-3 text-white placeholder-zinc-600 focus:outline-none transition-all tracking-widest"
                />
                <div className="input-icon absolute right-3 top-1/2 -translate-y-1/2 text-cyan-500/50 group-focus-within:text-pink-400 transition-colors">
                  <Icon icon="pixelarticons:checkbox-on" className="w-5 h-5" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              style={{ opacity: 0 }}
              className="submit-btn form-element relative w-full py-4 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-bold tracking-widest uppercase overflow-hidden group transition-all disabled:opacity-50"
            >
              <span
                className={`relative z-10 flex items-center justify-center gap-3 ${
                  isLoading ? "opacity-0" : ""
                }`}
              >
                <Icon icon="pixelarticons:zap" className="w-5 h-5" />{" "}
                INITIALIZE_IDENTITY{" "}
                <Icon icon="pixelarticons:arrow-right" className="w-5 h-5" />
              </span>
              {isLoading && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <Icon
                    icon="pixelarticons:loader"
                    className="w-6 h-6 animate-spin"
                  />
                </span>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </form>

          <div className="mt-8 text-center form-element" style={{ opacity: 0 }}>
            <p className="text-xs text-zinc-500 flex items-center justify-center gap-2">
              <Icon icon="pixelarticons:user" className="w-4 h-4" />{" "}
              ALREADY_REGISTERED?{" "}
              <Link
                to="/login"
                className="text-cyan-400 hover:text-pink-400 transition-colors tracking-wider flex items-center gap-1"
              >
                <Icon icon="pixelarticons:login" className="w-4 h-4" />{" "}
                ACCESS_TERMINAL
              </Link>
            </p>
          </div>

          <div className="absolute bottom-2 right-2 text-[10px] text-cyan-500/30 tracking-widest flex items-center gap-1">
            <Icon icon="pixelarticons:shield" className="w-3 h-3" /> SEC_LEVEL:
            MAX
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) indicatorDotsRef.current[i] = el;
            }}
            className="w-2 h-2 border border-cyan-500/50"
            style={{
              backgroundColor: i === 2 ? "rgba(34,211,238,0.5)" : "transparent",
              opacity: 0,
            }}
          />
        ))}
      </div>

      <p className="text-center text-xs text-zinc-600 mt-4 tracking-wider flex items-center justify-center gap-2">
        <Icon icon="pixelarticons:lock" className="w-4 h-4" />{" "}
        ENCRYPTED_TRANSMISSION{" "}
        <Icon icon="pixelarticons:radio-signal" className="w-4 h-4" />
      </p>
    </>
  );
}
