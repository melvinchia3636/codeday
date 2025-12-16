import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import { useWorkoutsAnimations } from "../hooks/useWorkoutsAnimations";

// Animation ref types
interface WorkoutsAnimationRefs {
  containerRef: RefObject<HTMLDivElement | null>;
  headerRef: RefObject<HTMLDivElement | null>;
  statsRef: RefObject<HTMLDivElement | null>;
  historyRef: RefObject<HTMLDivElement | null>;
  typesRef: RefObject<HTMLDivElement | null>;
  logFormRef: RefObject<HTMLDivElement | null>;
  topLineRef: RefObject<HTMLDivElement | null>;
  bottomLineRef: RefObject<HTMLDivElement | null>;
  orbsRef: RefObject<HTMLDivElement[]>;
  cornersRef: RefObject<HTMLDivElement[]>;
  particlesRef: RefObject<HTMLDivElement | null>;
  scanlineRef: RefObject<HTMLDivElement | null>;
  gridRef: RefObject<HTMLDivElement | null>;
}

interface WorkoutsAnimationsContextType extends WorkoutsAnimationRefs {
  isAnimationsReady: boolean;
}

const WorkoutsAnimationsContext = createContext<
  WorkoutsAnimationsContextType | undefined
>(undefined);

interface WorkoutsAnimationsProviderProps {
  children: ReactNode;
}

export function WorkoutsAnimationsProvider({
  children,
}: WorkoutsAnimationsProviderProps) {
  // Main layout refs
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const typesRef = useRef<HTMLDivElement>(null);
  const logFormRef = useRef<HTMLDivElement>(null);

  // Decoration refs
  const topLineRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement[]>([]);
  const cornersRef = useRef<HTMLDivElement[]>([]);
  const particlesRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Run the animations hook
  useWorkoutsAnimations({
    containerRef,
    headerRef,
    statsRef,
    historyRef,
    typesRef,
    logFormRef,
    topLineRef,
    bottomLineRef,
    orbsRef,
    cornersRef,
    particlesRef,
    scanlineRef,
    gridRef,
  });

  const value: WorkoutsAnimationsContextType = {
    containerRef,
    headerRef,
    statsRef,
    historyRef,
    typesRef,
    logFormRef,
    topLineRef,
    bottomLineRef,
    orbsRef,
    cornersRef,
    particlesRef,
    scanlineRef,
    gridRef,
    isAnimationsReady: true,
  };

  return (
    <WorkoutsAnimationsContext.Provider value={value}>
      {children}
    </WorkoutsAnimationsContext.Provider>
  );
}

export function useWorkoutsAnimationRefs(): WorkoutsAnimationsContextType {
  const context = useContext(WorkoutsAnimationsContext);
  if (context === undefined) {
    throw new Error(
      "useWorkoutsAnimationRefs must be used within a WorkoutsAnimationsProvider"
    );
  }
  return context;
}
