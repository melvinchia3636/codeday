import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import { useUserProfile } from "../../../contexts/UserProfileContext";
import { useProfileAnimations } from "../hooks/useProfileAnimations";

interface ProfileAnimationRefs {
  containerRef: RefObject<HTMLDivElement | null>;
  avatarRef: RefObject<HTMLDivElement | null>;
  userInfoRef: RefObject<HTMLDivElement | null>;
  settingsRef: RefObject<HTMLDivElement | null>;
  targetsRef: RefObject<HTMLDivElement | null>;
  waifuRef: RefObject<HTMLDivElement | null>;
  sideBarsRef: RefObject<HTMLDivElement[]>;
  glitchOverlayRef: RefObject<HTMLDivElement | null>;
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

  const containerRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const userInfoRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const targetsRef = useRef<HTMLDivElement>(null);
  const waifuRef = useRef<HTMLDivElement>(null);

  const sideBarsRef = useRef<HTMLDivElement[]>([]);
  const glitchOverlayRef = useRef<HTMLDivElement>(null);

  const isAnimationsReady = !isLoading;

  useProfileAnimations({
    containerRef,
    avatarRef,
    userInfoRef,
    settingsRef,
    targetsRef,
    waifuRef,
    sideBarsRef,
    glitchOverlayRef,
    isReady: isAnimationsReady,
  });

  const value: ProfileAnimationsContextType = {
    containerRef,
    avatarRef,
    userInfoRef,
    settingsRef,
    targetsRef,
    waifuRef,
    sideBarsRef,
    glitchOverlayRef,
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
