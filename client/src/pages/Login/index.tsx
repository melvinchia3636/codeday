import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import {
  useLoginAnimations,
  useInputAnimations,
  useButtonAnimations,
  useSubmitAnimation,
} from "./hooks/useLoginAnimations";
import { PageDecorations } from "./components/PageDecorations";
import { LoginHeader } from "./components/LoginHeader";
import { LoginForm } from "./components/LoginForm";
import { useAuth } from "../../contexts/AuthContext";
import {
  AuthLoadingOverlay,
  AuthSuccessModal,
  AuthErrorModal,
} from "../../components/AuthFeedback";

type FeedbackState = "idle" | "loading" | "success" | "error";

export function Login() {
  const navigate = useNavigate();
  const { loginSilent, applyAuthData, error, clearError } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [feedbackState, setFeedbackState] = useState<FeedbackState>("idle");

  // Store auth data in ref to apply after loading animation
  const authDataRef = useRef<{ token: string; user: unknown } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement[]>([]);
  const cornersRef = useRef<HTMLDivElement[]>([]);
  const sideBarsLeftRef = useRef<HTMLDivElement[]>([]);
  const sideBarsRightRef = useRef<HTMLDivElement[]>([]);
  const indicatorDotsRef = useRef<HTMLDivElement[]>([]);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const glowBorderRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);
  const terminalIndicatorRef = useRef<HTMLSpanElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useLoginAnimations({
    containerRef,
    logoRef,
    cardRef,
    cursorRef,
    glowBorderRef,
    topLineRef,
    bottomLineRef,
    terminalIndicatorRef,
    particlesRef,
    orbsRef,
    cornersRef,
    sideBarsLeftRef,
    sideBarsRightRef,
    indicatorDotsRef,
  });

  const { handleInputFocus, handleInputBlur } = useInputAnimations();
  const { handleButtonHover, handleButtonLeave } = useButtonAnimations();
  const { triggerSubmitAnimation } = useSubmitAnimation(cardRef);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError();
    authDataRef.current = null;

    if (!username.trim() || !password.trim()) {
      setLocalError("Please enter username and password");
      return;
    }

    setIsLoading(true);
    setFeedbackState("loading");
    triggerSubmitAnimation();

    try {
      // Use loginSilent to avoid updating state immediately
      const authData = await loginSilent({ identity: username, password });
      // Store auth data to apply after loading animation
      authDataRef.current = authData;
    } catch {
      setLocalError(error || "Login failed. Please check your credentials.");
      setFeedbackState("error");
      setIsLoading(false);
    }
  };

  const handleLoadingComplete = useCallback(() => {
    if (authDataRef.current) {
      // Now apply the auth data to context state
      applyAuthData(authDataRef.current as Parameters<typeof applyAuthData>[0]);
      setFeedbackState("success");
      setIsLoading(false);
    }
  }, [applyAuthData]);

  const handleSuccessConfirm = () => {
    setFeedbackState("idle");
    navigate("/");
  };

  const handleErrorClose = () => {
    setFeedbackState("idle");
    setLocalError(null);
    clearError();
  };

  const displayError = feedbackState === "idle" ? localError || error : null;

  return (
    <div
      ref={containerRef}
      className="flex-1 flex items-center justify-center border-[8px] border-pink-500 p-4 shadow-[0_0_30px_rgba(236,72,153,0.5)] bg-gradient-to-br from-zinc-900 via-zinc-950 to-fuchsia-950/30 relative overflow-hidden"
      style={{ opacity: 0 }}
    >
      <PageDecorations
        particlesRef={particlesRef}
        topLineRef={topLineRef}
        bottomLineRef={bottomLineRef}
        orbsRef={orbsRef}
        cornersRef={cornersRef}
        sideBarsLeftRef={sideBarsLeftRef}
        sideBarsRightRef={sideBarsRightRef}
      />

      <div className="relative z-10 w-full max-w-md">
        <LoginHeader logoRef={logoRef} cursorRef={cursorRef} />

        {displayError && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 text-red-400 text-sm tracking-wider text-center">
            {displayError}
          </div>
        )}

        <LoginForm
          formRef={formRef}
          cardRef={cardRef}
          glowBorderRef={glowBorderRef}
          terminalIndicatorRef={terminalIndicatorRef}
          indicatorDotsRef={indicatorDotsRef}
          username={username}
          password={password}
          isLoading={isLoading}
          onUsernameChange={setUsername}
          onPasswordChange={setPassword}
          onSubmit={handleSubmit}
          handleInputFocus={handleInputFocus}
          handleInputBlur={handleInputBlur}
          handleButtonHover={handleButtonHover}
          handleButtonLeave={handleButtonLeave}
        />
      </div>

      {/* Auth Feedback Overlays */}
      <AuthLoadingOverlay
        isVisible={feedbackState === "loading"}
        message="AUTHENTICATING..."
        color="pink"
        onComplete={handleLoadingComplete}
      />

      <AuthSuccessModal
        isVisible={feedbackState === "success"}
        title="ACCESS_GRANTED"
        message="Neural link established. Welcome back, Operator. Redirecting to command center..."
        buttonText="ENTER_SYSTEM"
        onConfirm={handleSuccessConfirm}
        color="pink"
      />

      <AuthErrorModal
        isVisible={feedbackState === "error"}
        title="ACCESS_DENIED"
        message={
          localError || error || "Authentication failed. Invalid credentials."
        }
        buttonText="TRY_AGAIN"
        onClose={handleErrorClose}
      />
    </div>
  );
}
