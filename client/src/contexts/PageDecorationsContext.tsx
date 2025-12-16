import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";

/**
 * Decoration refs shared across all pages for animation
 */
export interface PageDecorationRefs {
  particlesRef: RefObject<HTMLDivElement | null>;
  gridRef: RefObject<HTMLDivElement | null>;
  scanlineRef: RefObject<HTMLDivElement | null>;
  topLineRef: RefObject<HTMLDivElement | null>;
  bottomLineRef: RefObject<HTMLDivElement | null>;
  orbsRef: RefObject<HTMLDivElement[]>;
  cornersRef: RefObject<HTMLDivElement[]>;
}

interface PageDecorationsContextType extends PageDecorationRefs {
  color: "pink" | "cyan";
}

const PageDecorationsContext = createContext<
  PageDecorationsContextType | undefined
>(undefined);

interface PageDecorationsProviderProps {
  children: ReactNode;
  /** Color theme: 'pink' (default) or 'cyan' */
  color?: "pink" | "cyan";
}

/**
 * Unified provider for page decoration animation refs.
 * Wrap your page content with this provider to enable the PageDecorations component.
 */
export function PageDecorationsProvider({
  children,
  color = "pink",
}: PageDecorationsProviderProps) {
  const particlesRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement[]>([]);
  const cornersRef = useRef<HTMLDivElement[]>([]);

  const value: PageDecorationsContextType = {
    particlesRef,
    gridRef,
    scanlineRef,
    topLineRef,
    bottomLineRef,
    orbsRef,
    cornersRef,
    color,
  };

  return (
    <PageDecorationsContext.Provider value={value}>
      {children}
    </PageDecorationsContext.Provider>
  );
}

/**
 * Hook to access page decoration refs and color theme.
 * Must be used within a PageDecorationsProvider.
 */
export function usePageDecorationsRefs(): PageDecorationsContextType {
  const context = useContext(PageDecorationsContext);
  if (context === undefined) {
    throw new Error(
      "usePageDecorationsRefs must be used within a PageDecorationsProvider"
    );
  }
  return context;
}
