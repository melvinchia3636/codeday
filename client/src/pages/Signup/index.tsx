import { useState, useRef } from "react";
import {
  useSignupAnimations,
  useInputAnimations,
  useButtonAnimations,
  useSubmitAnimation,
} from "./hooks/useSignupAnimations";
import { PageDecorations } from "./components/PageDecorations";
import { SignupHeader } from "./components/SignupHeader";
import { SignupForm } from "./components/SignupForm";

export function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    triggerSubmitAnimation();
    setTimeout(() => setIsLoading(false), 2000);
  };

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

        <SignupForm
          formRef={formRef}
          cardRef={cardRef}
          glowBorderRef={glowBorderRef}
          terminalIndicatorRef={terminalIndicatorRef}
          indicatorDotsRef={indicatorDotsRef}
          username={username}
          password={password}
          confirmPassword={confirmPassword}
          isLoading={isLoading}
          onUsernameChange={setUsername}
          onPasswordChange={setPassword}
          onConfirmPasswordChange={setConfirmPassword}
          onSubmit={handleSubmit}
          handleInputFocus={handleInputFocus}
          handleInputBlur={handleInputBlur}
          handleButtonHover={handleButtonHover}
          handleButtonLeave={handleButtonLeave}
        />
      </div>
    </div>
  );
}
