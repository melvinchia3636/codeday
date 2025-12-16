import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import {
  useSignupAnimations,
  useInputAnimations,
  useButtonAnimations,
  useSubmitAnimation,
} from "./hooks/useSignupAnimations";
import { PageDecorations } from "./components/PageDecorations";
import { SignupHeader } from "./components/SignupHeader";
import { SignupForm } from "./components/SignupForm";
import { useAuth } from "../../contexts/AuthContext";
import {
  AuthLoadingOverlay,
  AuthSuccessModal,
} from "../../components/AuthFeedback";

type FeedbackState = "idle" | "loading" | "success" | "error";

export function Signup() {
  const navigate = useNavigate();
  const { signup, error, clearError } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [feedbackState, setFeedbackState] = useState<FeedbackState>("idle");

  // Track signup completion for deferred feedback
  const signupCompleteRef = useRef(false);

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
  const hexGridRef = useRef<HTMLDivElement>(null);
  const dataStreamsRef = useRef<HTMLDivElement>(null);

  useSignupAnimations({
    containerRef,
    logoRef,
    cardRef,
    cursorRef,
    glowBorderRef,
    topLineRef,
    bottomLineRef,
    terminalIndicatorRef,
    particlesRef,
    hexGridRef,
    dataStreamsRef,
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
    signupCompleteRef.current = false;

    // Validation
    if (!username.trim() || !email.trim() || !password.trim()) {
      setLocalError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setLocalError("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);
    setFeedbackState("loading");
    triggerSubmitAnimation();

    try {
      await signup({
        username,
        email,
        password,
        passwordConfirm: confirmPassword,
      });
      // Mark signup as complete - will show success after loading animation
      signupCompleteRef.current = true;
    } catch {
      setLocalError(error || "Signup failed. Please try again.");
      setFeedbackState("idle");
      setIsLoading(false);
    }
  };

  const handleLoadingComplete = useCallback(() => {
    if (signupCompleteRef.current) {
      setFeedbackState("success");
      setIsLoading(false);
    }
  }, []);

  const handleSuccessConfirm = () => {
    setFeedbackState("idle");
    navigate("/login");
  };

  const displayError = localError || error;

  return (
    <div
      ref={containerRef}
      className="flex-1 flex items-center justify-center border-[8px] border-cyan-500 p-4 shadow-[0_0_30px_rgba(34,211,238,0.5)] bg-gradient-to-br from-zinc-900 via-zinc-950 to-cyan-950/30 relative overflow-hidden"
      style={{ opacity: 0 }}
    >
      <PageDecorations
        particlesRef={particlesRef}
        hexGridRef={hexGridRef}
        dataStreamsRef={dataStreamsRef}
        topLineRef={topLineRef}
        bottomLineRef={bottomLineRef}
        orbsRef={orbsRef}
        cornersRef={cornersRef}
        sideBarsLeftRef={sideBarsLeftRef}
        sideBarsRightRef={sideBarsRightRef}
      />

      <div className="relative z-10 w-full max-w-lg">
        <SignupHeader logoRef={logoRef} cursorRef={cursorRef} />

        {displayError && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 text-red-400 text-sm tracking-wider text-center">
            {displayError}
          </div>
        )}

        <SignupForm
          formRef={formRef}
          cardRef={cardRef}
          glowBorderRef={glowBorderRef}
          terminalIndicatorRef={terminalIndicatorRef}
          indicatorDotsRef={indicatorDotsRef}
          username={username}
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          isLoading={isLoading}
          onUsernameChange={setUsername}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onConfirmPasswordChange={setConfirmPassword}
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
        message="INITIALIZING_NEURAL_PROFILE..."
        color="cyan"
        onComplete={handleLoadingComplete}
      />

      <AuthSuccessModal
        isVisible={feedbackState === "success"}
        title="IDENTITY_INITIALIZED"
        message="Neural profile created successfully. Your digital consciousness has been registered in the network. Proceed to authentication terminal."
        buttonText="PROCEED_TO_AUTH_TERMINAL"
        onConfirm={handleSuccessConfirm}
        color="cyan"
      />
    </div>
  );
}
