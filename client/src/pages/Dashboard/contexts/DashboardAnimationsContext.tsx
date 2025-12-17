import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import { useDashboardAnimations } from "../hooks/useDashboardAnimations";

interface DashboardAnimationRefs {
  containerRef: RefObject<HTMLDivElement | null>;
  mainPanelRef: RefObject<HTMLElement | null>;
  headerRef: RefObject<HTMLDivElement | null>;
  cardsContainerRef: RefObject<HTMLDivElement | null>;
  timelinePanelRef: RefObject<HTMLDivElement | null>;
  waifuPanelRef: RefObject<HTMLElement | null>;
  bottomBarRef: RefObject<HTMLElement | null>;

  particlesRef: RefObject<HTMLDivElement | null>;
  scanlineRef: RefObject<HTMLDivElement | null>;
  glitchOverlayRef: RefObject<HTMLDivElement | null>;
  dataStreamRef: RefObject<HTMLDivElement | null>;
  hexGridRef: RefObject<HTMLDivElement | null>;
  matrixRainRef: RefObject<HTMLDivElement | null>;
  energyFieldRef: RefObject<HTMLDivElement | null>;
  cyberGridRef: RefObject<HTMLDivElement | null>;
  orbsRef: RefObject<HTMLDivElement[]>;
  cornersRef: RefObject<HTMLDivElement[]>;
  sideBarsTopRef: RefObject<HTMLDivElement[]>;
  sideBarsBottomRef: RefObject<HTMLDivElement[]>;
  neonLinesRef: RefObject<HTMLDivElement[]>;
  hologramRingsRef: RefObject<HTMLDivElement[]>;
  circuitLinesRef: RefObject<HTMLDivElement[]>;
  pulseRingsRef: RefObject<HTMLDivElement[]>;
}

interface DashboardAnimationsContextType extends DashboardAnimationRefs {
  isAnimationsReady: boolean;
}

const DashboardAnimationsContext = createContext<
  DashboardAnimationsContextType | undefined
>(undefined);

interface DashboardAnimationsProviderProps {
  children: ReactNode;
}

export function DashboardAnimationsProvider({
  children,
}: DashboardAnimationsProviderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainPanelRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const timelinePanelRef = useRef<HTMLDivElement>(null);
  const waifuPanelRef = useRef<HTMLElement>(null);
  const bottomBarRef = useRef<HTMLElement>(null);

  const particlesRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const glitchOverlayRef = useRef<HTMLDivElement>(null);
  const dataStreamRef = useRef<HTMLDivElement>(null);
  const hexGridRef = useRef<HTMLDivElement>(null);
  const matrixRainRef = useRef<HTMLDivElement>(null);
  const energyFieldRef = useRef<HTMLDivElement>(null);
  const cyberGridRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement[]>([]);
  const cornersRef = useRef<HTMLDivElement[]>([]);
  const sideBarsTopRef = useRef<HTMLDivElement[]>([]);
  const sideBarsBottomRef = useRef<HTMLDivElement[]>([]);
  const neonLinesRef = useRef<HTMLDivElement[]>([]);
  const hologramRingsRef = useRef<HTMLDivElement[]>([]);
  const circuitLinesRef = useRef<HTMLDivElement[]>([]);
  const pulseRingsRef = useRef<HTMLDivElement[]>([]);

  useDashboardAnimations({
    containerRef,
    mainPanelRef,
    particlesRef,
    scanlineRef,
    glitchOverlayRef,
    dataStreamRef,
    hexGridRef,
    orbsRef,
    cornersRef,
    sideBarsTopRef,
    sideBarsBottomRef,
    neonLinesRef,
    hologramRingsRef,
    circuitLinesRef,
    headerRef,
    cardsContainerRef,
    timelinePanelRef,
    waifuPanelRef,
    bottomBarRef,
    matrixRainRef,
    pulseRingsRef,
    energyFieldRef,
    cyberGridRef,
  });

  const value: DashboardAnimationsContextType = {
    containerRef,
    mainPanelRef,
    headerRef,
    cardsContainerRef,
    timelinePanelRef,
    waifuPanelRef,
    bottomBarRef,
    particlesRef,
    scanlineRef,
    glitchOverlayRef,
    dataStreamRef,
    hexGridRef,
    matrixRainRef,
    energyFieldRef,
    cyberGridRef,
    orbsRef,
    cornersRef,
    sideBarsTopRef,
    sideBarsBottomRef,
    neonLinesRef,
    hologramRingsRef,
    circuitLinesRef,
    pulseRingsRef,
    isAnimationsReady: true,
  };

  return (
    <DashboardAnimationsContext.Provider value={value}>
      {children}
    </DashboardAnimationsContext.Provider>
  );
}

export function useDashboardAnimationRefs(): DashboardAnimationsContextType {
  const context = useContext(DashboardAnimationsContext);
  if (context === undefined) {
    throw new Error(
      "useDashboardAnimationRefs must be used within a DashboardAnimationsProvider"
    );
  }
  return context;
}
