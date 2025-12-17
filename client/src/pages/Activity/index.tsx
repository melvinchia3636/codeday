import { useRef, useMemo } from "react";
import { useActivityAnimations } from "./hooks/useActivityAnimations";
import { PageDecorationsProvider } from "../../contexts/PageDecorationsContext";
import { PageDecorations } from "../../components/PageDecorations";
import { PageHeader } from "../../components/PageHeader";
import { SummaryCards } from "./components/SummaryCards";
import { ActivityTimeline } from "./components/ActivityTimeline";
import { HistoryCalendar } from "./components/HistoryCalendar";
import { useWorkoutsQuery } from "../../hooks/useWorkoutQueries";
import { useTodayMealsQuery } from "../../hooks/useMealQueries";
import { useTodayLogsQuery } from "../../hooks/useHydrationQueries";
import {
  useYandereLevel,
  type YandereLevel,
} from "../../contexts/YandereLevelContext";

const levelToEmotion: Record<YandereLevel, string> = {
  0: "in love",
  1: "friendly",
  2: "tsundere",
  3: "yandere",
};

const emotionIcons: Record<string, string> = {
  "in love": "pixelarticons:mood-happy",
  friendly: "pixelarticons:mood-neutral",
  tsundere: "pixelarticons:mood-sad",
  yandere: "pixelarticons:heart",
};

const emotionColors: Record<string, string> = {
  "in love": "cyan",
  friendly: "pink",
  tsundere: "fuchsia",
  yandere: "red",
};

function ActivityContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const { data: workouts = [] } = useWorkoutsQuery();
  const { data: meals = [] } = useTodayMealsQuery();
  const { data: waterLogs = [] } = useTodayLogsQuery();

  const {
    nutritionScore,
    hydrationScore,
    workoutScore,
    totalScore,
    yandereLevel,
  } = useYandereLevel();

  const activityTimeline = useMemo(() => {
    const items: {
      id: number;
      type: string;
      title: string;
      desc: string;
      time: string;
      icon: string;
      color: string;
      timestamp: number;
    }[] = [];

    let idCounter = 1;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const isToday = (dateStr: string) => {
      const date = new Date(dateStr);
      return date >= today && date < tomorrow;
    };

    const formatTime = (date: Date) =>
      date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "UTC",
      });

    workouts
      .filter((w) => isToday(w.created))
      .forEach((w) => {
        const date = new Date(w.created);
        items.push({
          id: idCounter++,
          type: "workout",
          title: w.type,
          desc: `${w.durationMin} min • ${w.caloriesBurned} kcal`,
          time: formatTime(date),
          icon: "pixelarticons:human-run",
          color: "pink",
          timestamp: date.getTime(),
        });
      });

    meals.forEach((m) => {
      const date = new Date(m.created);
      const mealTypeLabel = m.type.charAt(0).toUpperCase() + m.type.slice(1);
      const itemCount = m.items?.length || 0;
      items.push({
        id: idCounter++,
        type: "meal",
        title: mealTypeLabel,
        desc: `${itemCount} items logged`,
        time: formatTime(date),
        icon: "pixelarticons:coin",
        color: "fuchsia",
        timestamp: date.getTime(),
      });
    });

    waterLogs.forEach((w) => {
      const date = new Date(w.timestamp || w.created || new Date());
      items.push({
        id: idCounter++,
        type: "water",
        title: "Hydration",
        desc: `${w.amountMl} ml`,
        time: formatTime(date),
        icon: "pixelarticons:drop",
        color: "cyan",
        timestamp: date.getTime(),
      });
    });

    return items.sort((a, b) => b.timestamp - a.timestamp);
  }, [workouts, meals, waterLogs]);

  useActivityAnimations({
    containerRef,
    summaryRef,
    timelineRef,
    calendarRef,
    itemsCount: activityTimeline.length,
  });

  const emotion = levelToEmotion[yandereLevel];
  const today = {
    date: new Date().toISOString().split("T")[0],
    diet: nutritionScore,
    hydro: hydrationScore,
    effort: workoutScore,
    total: totalScore,
    emotion,
  };

  const dailySummaries = [today];

  return (
    <div
      ref={containerRef}
      className="flex-1 flex flex-col border-8 border-pink-500 p-6 shadow-[0_0_30px_rgba(236,72,153,0.5)] bg-linear-to-br from-zinc-900 via-zinc-950 to-fuchsia-950/30 relative overflow-hidden"
      style={{ opacity: 0 }}
    >
      <PageDecorations />
      <PageHeader
        icon="pixelarticons:timeline"
        title="ACTIVITY_LOG"
        status={`TODAY'S SCORE: ${today.total}%`}
        color="pink"
      />
      <SummaryCards
        summaryRef={summaryRef}
        today={today}
        emotionIcons={emotionIcons}
        emotionColors={emotionColors}
      />
      <div className="relative z-10 flex-1 grid grid-cols-12 gap-6 overflow-hidden">
        <ActivityTimeline timelineRef={timelineRef} items={activityTimeline} />
        <HistoryCalendar
          calendarRef={calendarRef}
          summaries={dailySummaries}
          emotionIcons={emotionIcons}
          emotionColors={emotionColors}
        />
      </div>
    </div>
  );
}

export function Activity() {
  return (
    <PageDecorationsProvider color="pink">
      <ActivityContent />
    </PageDecorationsProvider>
  );
}
