import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import { useHydrationAnimations } from "../hooks/useHydrationAnimations";

// Animation ref types (page-specific only, decoration refs come from PageDecorationsContext)
interface HydrationAnimationRefs {
  containerRef: RefObject<HTMLDivElement | null>;
  headerRef: RefObject<HTMLDivElement | null>;
  tankRef: RefObject<HTMLDivElement | null>;
  statsRef: RefObject<HTMLDivElement | null>;
  historyRef: RefObject<HTMLDivElement | null>;
  logRef: RefObject<HTMLDivElement | null>;
  bubblesRef: RefObject<HTMLDivElement | null>;
}

interface HydrationAnimationsContextType extends HydrationAnimationRefs {
  isAnimationsReady: boolean;
}

const HydrationAnimationsContext = createContext<
  HydrationAnimationsContextType | undefined
>(undefined);

interface HydrationAnimationsProviderProps {
  children: ReactNode;
}

export function HydrationAnimationsProvider({
  children,
}: HydrationAnimationsProviderProps) {
  // Main layout refs
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tankRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  // Hydration-specific decoration ref
  const bubblesRef = useRef<HTMLDivElement>(null);

  // Run the animations hook
  useHydrationAnimations({
    containerRef,
    headerRef,
    tankRef,
    statsRef,
    historyRef,
    logRef,
    bubblesRef,
  });

  const value: HydrationAnimationsContextType = {
    containerRef,
    headerRef,
    tankRef,
    statsRef,
    historyRef,
    logRef,
    bubblesRef,
    isAnimationsReady: true,
  };

  return (
    <HydrationAnimationsContext.Provider value={value}>
      {children}
    </HydrationAnimationsContext.Provider>
  );
}

export function useHydrationAnimationRefs(): HydrationAnimationsContextType {
  const context = useContext(HydrationAnimationsContext);
  if (context === undefined) {
    throw new Error(
      "useHydrationAnimationRefs must be used within a HydrationAnimationsProvider"
    );
  }
  return context;
}
