import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";

interface ChatAnimationRefs {
  containerRef: RefObject<HTMLDivElement | null>;
  messagesRef: RefObject<HTMLDivElement | null>;
  inputRef: RefObject<HTMLDivElement | null>;
  avatarRef: RefObject<HTMLDivElement | null>;
}

const ChatAnimationsContext = createContext<ChatAnimationRefs | undefined>(
  undefined
);

interface ChatAnimationsProviderProps {
  children: ReactNode;
}

export function ChatAnimationsProvider({
  children,
}: ChatAnimationsProviderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  return (
    <ChatAnimationsContext.Provider
      value={{ containerRef, messagesRef, inputRef, avatarRef }}
    >
      {children}
    </ChatAnimationsContext.Provider>
  );
}

export function useChatAnimationRefs(): ChatAnimationRefs {
  const context = useContext(ChatAnimationsContext);
  if (context === undefined) {
    throw new Error(
      "useChatAnimationRefs must be used within a ChatAnimationsProvider"
    );
  }
  return context;
}
