import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import { useWorkoutsAnimations } from "../hooks/useWorkoutsAnimations";
import { useWorkouts } from "../../../contexts/WorkoutsContext";

interface WorkoutsAnimationRefs {
  containerRef: RefObject<HTMLDivElement | null>;
  statsRef: RefObject<HTMLDivElement | null>;
  historyRef: RefObject<HTMLDivElement | null>;
  typesRef: RefObject<HTMLDivElement | null>;
  logFormRef: RefObject<HTMLDivElement | null>;
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
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const typesRef = useRef<HTMLDivElement>(null);
  const logFormRef = useRef<HTMLDivElement>(null);

  const { isLoading } = useWorkouts();

  useWorkoutsAnimations({
    containerRef,
    statsRef,
    historyRef,
    typesRef,
    logFormRef,
    isLoading,
  });

  const value: WorkoutsAnimationsContextType = {
    containerRef,
    statsRef,
    historyRef,
    typesRef,
    logFormRef,
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
