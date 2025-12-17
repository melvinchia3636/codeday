import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { useYandereLevel, type YandereLevel } from "./YandereLevelContext";

export type WorkoutAction =
  | "light_workout"
  | "moderate_workout"
  | "heavy_workout";
export type NutritionAction = "breakfast" | "lunch" | "dinner" | "snack";
export type HydrationAction =
  | "first_time"
  | "subsequent_time"
  | "reached_time"
  | "overdrink_time";
export type BmiAction = "underweight" | "normal" | "overweight" | "obese";

export type ActionCategory =
  | "logged_workout"
  | "logged_nutrition"
  | "logged_hydration"
  | "logged_bmi";
export type ActionType =
  | WorkoutAction
  | NutritionAction
  | HydrationAction
  | BmiAction;

interface ToastMessage {
  id: string;
  message: string;
  yandereLevel: YandereLevel;
  visible: boolean;
}

interface LucyToastContextType {
  showToast: (category: ActionCategory, action: ActionType) => void;
}

const LucyToastContext = createContext<LucyToastContextType | undefined>(
  undefined
);

const messagesCache: Record<
  YandereLevel,
  Record<string, Record<string, string[]>> | null
> = {
  0: null,
  1: null,
  2: null,
  3: null,
};

async function loadMessages(
  level: YandereLevel
): Promise<Record<string, Record<string, string[]>>> {
  if (messagesCache[level]) {
    return messagesCache[level]!;
  }

  try {
    const response = await fetch(`/messages/${level}.json`);
    const data = await response.json();
    messagesCache[level] = data;
    return data;
  } catch (error) {
    console.error(`Failed to load messages for level ${level}:`, error);
    return {};
  }
}

function getRandomMessage(messages: string[]): string {
  if (!messages || messages.length === 0) {
    return "...";
  }
  return messages[Math.floor(Math.random() * messages.length)];
}

export function LucyToastProvider({ children }: { children: ReactNode }) {
  const { yandereLevel } = useYandereLevel();
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const yandereLevelRef = useRef(yandereLevel);
  useEffect(() => {
    yandereLevelRef.current = yandereLevel;
  }, [yandereLevel]);

  useEffect(() => {
    loadMessages(yandereLevel);
  }, [yandereLevel]);

  const handleTypingComplete = useCallback((id: string) => {
    setTimeout(() => {
      setToast((prev) =>
        prev?.id === id ? { ...prev, visible: false } : prev
      );
    }, 5000);

    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 5500);
  }, []);

  const showToast = useCallback(
    async (category: ActionCategory, action: ActionType) => {
      setTimeout(async () => {
        const currentLevel = yandereLevelRef.current;

        const messages = await loadMessages(currentLevel);
        const categoryMessages = messages[category];

        if (!categoryMessages || !categoryMessages[action]) {
          console.warn(`No messages found for ${category}.${action}`);
          return;
        }

        const message = getRandomMessage(categoryMessages[action]);
        const id = `${Date.now()}-${Math.random()}`;

        setToast({
          id,
          message,
          yandereLevel: currentLevel,
          visible: true,
        });
      }, 500);
    },
    []
  );

  return (
    <LucyToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <LucyToastNotification
          toast={toast}
          onTypingComplete={() => handleTypingComplete(toast.id)}
        />
      )}
    </LucyToastContext.Provider>
  );
}

export function useLucyToast() {
  const context = useContext(LucyToastContext);
  if (!context) {
    throw new Error("useLucyToast must be used within LucyToastProvider");
  }
  return context;
}

function LucyToastNotification({
  toast,
  onTypingComplete,
}: {
  toast: ToastMessage;
  onTypingComplete: () => void;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const typingSpeed = 30;

  useEffect(() => {
    setDisplayedText("");
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex < toast.message.length) {
        setDisplayedText(toast.message.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        onTypingComplete();
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [toast.message, onTypingComplete]);

  const levelImages: Record<YandereLevel, string> = {
    0: "/avatar/0avatar.png",
    1: "/avatar/1avatar.png",
    2: "/avatar/2avatar.png",
    3: "/avatar/3avatar.png",
  };

  const levelColors: Record<YandereLevel, string> = {
    0: "border-cyan-500 bg-cyan-500/10",
    1: "border-pink-500 bg-pink-500/10",
    2: "border-fuchsia-500 bg-fuchsia-500/10",
    3: "border-red-500 bg-red-500/10",
  };

  const textColors: Record<YandereLevel, string> = {
    0: "text-cyan-400",
    1: "text-pink-400",
    2: "text-fuchsia-400",
    3: "text-red-400",
  };

  return (
    <div
      className={`fixed bottom-12 right-12 z-50 flex items-end gap-3 max-w-md transition-all duration-500 ${
        toast.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* Speech Bubble */}
      <div
        className={`relative border ${
          levelColors[toast.yandereLevel]
        } backdrop-blur-md rounded-lg p-4 shadow-lg`}
      >
        <div
          className={`absolute -right-2 bottom-4 w-4 h-4 ${
            levelColors[toast.yandereLevel]
          } border-r border-b -rotate-45`}
        />
        <p
          className={`text-sm ${
            textColors[toast.yandereLevel]
          } leading-relaxed`}
        >
          {displayedText}
          <span className="animate-pulse">|</span>
        </p>
      </div>

      {/* Lucy Avatar */}
      <div className="w-28 h-28 rounded-full overflow-hidden shrink-0 shadow-lg">
        <img
          src={levelImages[toast.yandereLevel]}
          alt="Lucy"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
