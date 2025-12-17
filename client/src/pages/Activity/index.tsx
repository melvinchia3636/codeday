import { useRef, useMemo } from "react";
import { useActivityAnimations } from "./hooks/useActivityAnimations";
import { PageDecorationsProvider } from "../../contexts/PageDecorationsContext";
import { PageDecorations } from "../../components/PageDecorations";
import { PageHeader } from "../../components/PageHeader";
import { SummaryCards } from "./components/SummaryCards";
import { ActivityTimeline } from "./components/ActivityTimeline";
import { HistoryCalendar } from "./components/HistoryCalendar";
import { useWorkoutsQuery } from "../../hooks/useWorkoutQueries";
import { useMealsQuery } from "../../hooks/useMealQueries";
import { useAllLogsQuery } from "../../hooks/useHydrationQueries";
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

const getDateString = (dateStr: string) => {
  const date = new Date(dateStr);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function ActivityContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const { data: workouts = [] } = useWorkoutsQuery();
  const { data: meals = [] } = useMealsQuery();
  const { data: waterLogs = [] } = useAllLogsQuery();

  const {
    nutritionScore,
    hydrationScore,
    workoutScore,
    totalScore: contextTotalScore,
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
      dateStr: string;
    }[] = [];

    let idCounter = 1;

    const formatTime = (date: Date) =>
      date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "UTC",
      });

    workouts.forEach((w) => {
      const date = new Date(w.timestamp);
      items.push({
        id: idCounter++,
        type: "workout",
        title: w.type,
        desc: `${w.durationMin} min • ${w.caloriesBurned} kcal`,
        time: formatTime(date),
        icon: "pixelarticons:human-run",
        color: "pink",
        timestamp: date.getTime(),
        dateStr: getDateString(w.timestamp),
      });
    });

    meals.forEach((m) => {
      const date = new Date(m.timestamp);
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
        dateStr: getDateString(m.timestamp),
      });
    });

    waterLogs.forEach((w) => {
      const dateValue = w.timestamp || w.timestamp || new Date().toISOString();
      const date = new Date(dateValue);
      items.push({
        id: idCounter++,
        type: "water",
        title: "Hydration",
        desc: `${w.amountMl} ml`,
        time: formatTime(date),
        icon: "pixelarticons:drop",
        color: "cyan",
        timestamp: date.getTime(),
        dateStr: getDateString(dateValue),
      });
    });

    return items.sort((a, b) => b.timestamp - a.timestamp);
  }, [workouts, meals, waterLogs]);

  const groupedActivities = useMemo(() => {
    const formatDateLabel = (dateStr: string) => {
      const date = new Date(dateStr);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      const todayStr = getDateString(today.toISOString());
      const yesterdayStr = getDateString(yesterday.toISOString());

      if (dateStr === todayStr) return "TODAY";
      if (dateStr === yesterdayStr) return "YESTERDAY";

      return date
        .toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
        .toUpperCase();
    };

    const groups: Record<string, typeof activityTimeline> = {};

    activityTimeline.forEach((item) => {
      if (!groups[item.dateStr]) {
        groups[item.dateStr] = [];
      }
      groups[item.dateStr].push(item);
    });

    return Object.entries(groups)
      .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
      .map(([dateStr, items]) => ({
        dateStr,
        dateLabel: formatDateLabel(dateStr),
        items,
      }));
  }, [activityTimeline]);

  const emotion = levelToEmotion[yandereLevel];
  const todayDateStr = new Date().toISOString().split("T")[0];

  const dailySummaries = useMemo(() => {
    return groupedActivities.map((group) => {
      const dayMeals = group.items.filter((i) => i.type === "meal");
      const dayWorkouts = group.items.filter((i) => i.type === "workout");
      const dayWater = group.items.filter((i) => i.type === "water");

      const dietScore = Math.min(100, Math.round((dayMeals.length / 4) * 100));

      const hydroScore = Math.min(100, Math.round((dayWater.length / 8) * 100));

      const effortScore = Math.min(
        100,
        Math.round((dayWorkouts.length / 2) * 100)
      );

      const totalScore = Math.round((dietScore + hydroScore + effortScore) / 3);

      let dayEmotion = "yandere";
      if (totalScore >= 80) dayEmotion = "in love";
      else if (totalScore >= 60) dayEmotion = "friendly";
      else if (totalScore >= 40) dayEmotion = "tsundere";

      if (group.dateStr === todayDateStr) {
        return {
          date: group.dateStr,
          diet: nutritionScore,
          hydro: hydrationScore,
          effort: workoutScore,
          total: contextTotalScore,
          emotion,
        };
      }

      return {
        date: group.dateStr,
        diet: dietScore,
        hydro: hydroScore,
        effort: effortScore,
        total: totalScore,
        emotion: dayEmotion,
      };
    });
  }, [
    groupedActivities,
    todayDateStr,
    nutritionScore,
    hydrationScore,
    workoutScore,
    contextTotalScore,
    emotion,
  ]);

  useActivityAnimations({
    containerRef,
    summaryRef,
    timelineRef,
    calendarRef,
    itemsCount: activityTimeline.length,
    summariesCount: dailySummaries.length,
  });

  const todaySummary = dailySummaries.find((s) => s.date === todayDateStr) || {
    date: todayDateStr,
    diet: nutritionScore,
    hydro: hydrationScore,
    effort: workoutScore,
    total: contextTotalScore,
    emotion,
  };

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
        status={`TODAY'S SCORE: ${todaySummary.total}%`}
        color="pink"
      />
      <SummaryCards
        summaryRef={summaryRef}
        today={todaySummary}
        emotionIcons={emotionIcons}
        emotionColors={emotionColors}
      />
      <div className="relative z-10 flex-1 grid grid-cols-12 gap-6 overflow-hidden">
        <ActivityTimeline
          timelineRef={timelineRef}
          groupedItems={groupedActivities}
        />
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
