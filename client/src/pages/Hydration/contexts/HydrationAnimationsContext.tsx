import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import { useHydrationAnimations } from "../hooks/useHydrationAnimations";

// Animation ref types
interface HydrationAnimationRefs {
  containerRef: RefObject<HTMLDivElement | null>;
  headerRef: RefObject<HTMLDivElement | null>;
  tankRef: RefObject<HTMLDivElement | null>;
  statsRef: RefObject<HTMLDivElement | null>;
  historyRef: RefObject<HTMLDivElement | null>;
  logRef: RefObject<HTMLDivElement | null>;
  topLineRef: RefObject<HTMLDivElement | null>;
  bottomLineRef: RefObject<HTMLDivElement | null>;
  orbsRef: RefObject<HTMLDivElement[]>;
  cornersRef: RefObject<HTMLDivElement[]>;
  particlesRef: RefObject<HTMLDivElement | null>;
  scanlineRef: RefObject<HTMLDivElement | null>;
  gridRef: RefObject<HTMLDivElement | null>;
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

  // Decoration refs
  const topLineRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement[]>([]);
  const cornersRef = useRef<HTMLDivElement[]>([]);
  const particlesRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLDivElement>(null);

  // Run the animations hook
  useHydrationAnimations({
    containerRef,
    headerRef,
    tankRef,
    statsRef,
    historyRef,
    logRef,
    topLineRef,
    bottomLineRef,
    orbsRef,
    cornersRef,
    particlesRef,
    scanlineRef,
    gridRef,
    bubblesRef,
  });

  const value: HydrationAnimationsContextType = {
    containerRef,
    headerRef,
    tankRef,
    statsRef,
    historyRef,
    logRef,
    topLineRef,
    bottomLineRef,
    orbsRef,
    cornersRef,
    particlesRef,
    scanlineRef,
    gridRef,
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
