import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import { useUserProfile } from "../../../contexts/UserProfileContext";
import { useProfileAnimations } from "../hooks/useProfileAnimations";

// Animation ref types
interface ProfileAnimationRefs {
  containerRef: RefObject<HTMLDivElement | null>;
  headerRef: RefObject<HTMLDivElement | null>;
  avatarRef: RefObject<HTMLDivElement | null>;
  userInfoRef: RefObject<HTMLDivElement | null>;
  settingsRef: RefObject<HTMLDivElement | null>;
  targetsRef: RefObject<HTMLDivElement | null>;
  waifuRef: RefObject<HTMLDivElement | null>;
  topLineRef: RefObject<HTMLDivElement | null>;
  bottomLineRef: RefObject<HTMLDivElement | null>;
  orbsRef: RefObject<HTMLDivElement[]>;
  cornersRef: RefObject<HTMLDivElement[]>;
  sideBarsRef: RefObject<HTMLDivElement[]>;
  particlesRef: RefObject<HTMLDivElement | null>;
  scanlineRef: RefObject<HTMLDivElement | null>;
  glitchOverlayRef: RefObject<HTMLDivElement | null>;
  gridRef: RefObject<HTMLDivElement | null>;
}

interface ProfileAnimationsContextType extends ProfileAnimationRefs {
  isAnimationsReady: boolean;
}

const ProfileAnimationsContext = createContext<
  ProfileAnimationsContextType | undefined
>(undefined);

interface ProfileAnimationsProviderProps {
  children: ReactNode;
}

export function ProfileAnimationsProvider({
  children,
}: ProfileAnimationsProviderProps) {
  const { isLoading } = useUserProfile();

  // All animation refs
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const userInfoRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const targetsRef = useRef<HTMLDivElement>(null);
  const waifuRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement[]>([]);
  const cornersRef = useRef<HTMLDivElement[]>([]);
  const sideBarsRef = useRef<HTMLDivElement[]>([]);
  const particlesRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const glitchOverlayRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const isAnimationsReady = !isLoading;

  // Run the animations hook
  useProfileAnimations({
    containerRef,
    headerRef,
    avatarRef,
    userInfoRef,
    settingsRef,
    targetsRef,
    waifuRef,
    topLineRef,
    bottomLineRef,
    orbsRef,
    cornersRef,
    sideBarsRef,
    particlesRef,
    scanlineRef,
    glitchOverlayRef,
    gridRef,
    isReady: isAnimationsReady,
  });

  const value: ProfileAnimationsContextType = {
    containerRef,
    headerRef,
    avatarRef,
    userInfoRef,
    settingsRef,
    targetsRef,
    waifuRef,
    topLineRef,
    bottomLineRef,
    orbsRef,
    cornersRef,
    sideBarsRef,
    particlesRef,
    scanlineRef,
    glitchOverlayRef,
    gridRef,
    isAnimationsReady,
  };

  return (
    <ProfileAnimationsContext.Provider value={value}>
      {children}
    </ProfileAnimationsContext.Provider>
  );
}

export function useProfileAnimationRefs(): ProfileAnimationsContextType {
  const context = useContext(ProfileAnimationsContext);
  if (context === undefined) {
    throw new Error(
      "useProfileAnimationRefs must be used within a ProfileAnimationsProvider"
    );
  }
  return context;
}
