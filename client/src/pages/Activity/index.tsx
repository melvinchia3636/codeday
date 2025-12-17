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
import { useUserProfile } from "../../contexts/UserProfileContext";

const emotionIcons: Record<string, string> = {
  happy: "pixelarticons:mood-happy",
  neutral: "pixelarticons:mood-neutral",
  tsundere: "pixelarticons:mood-sad",
  angry: "pixelarticons:mood-angry",
  yandere: "pixelarticons:heart",
};

const emotionColors: Record<string, string> = {
  happy: "cyan",
  neutral: "pink",
  tsundere: "fuchsia",
  angry: "red",
  yandere: "pink",
};

function ActivityContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const { data: workouts = [] } = useWorkoutsQuery();
  const { data: meals = [] } = useTodayMealsQuery();
  const { data: waterLogs = [] } = useTodayLogsQuery();
  const { settings } = useUserProfile();

  // Build activity timeline from real data (TODAY only)
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

    // Add workouts (filter to today only)
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

    // Add meals (already filtered to today by useTodayMealsQuery)
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

    // Add water logs (already filtered to today by useTodayLogsQuery)
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

    // Sort descending (newest first)
    return items.sort((a, b) => b.timestamp - a.timestamp);
  }, [workouts, meals, waterLogs]);

  // Run animations with itemsCount dependency
  useActivityAnimations({
    containerRef,
    summaryRef,
    timelineRef,
    calendarRef,
    itemsCount: activityTimeline.length,
  });

  // Calculate today's summary from real data
  const today = useMemo(() => {
    // Calculate diet score (simplified - based on meals logged)
    // Raw score can exceed 100, but display is capped
    const mealsLogged = meals.length;
    const rawDietScore = mealsLogged * 25;

    // Calculate hydration score
    const totalWater = waterLogs.reduce((sum, w) => sum + (w.amountMl || 0), 0);
    const waterGoal = settings?.hydroTargetMl || 2500;
    const rawHydroScore = Math.round((totalWater / waterGoal) * 100);
    const hydroScore = Math.min(100, rawHydroScore);

    // Calculate effort score (based on workouts)
    const totalWorkoutTime = workouts.reduce(
      (sum, w) => sum + (w.durationMin || 0),
      0
    );
    const rawEffortScore = Math.round((totalWorkoutTime / 60) * 100);
    const effortScore = Math.min(100, rawEffortScore);

    // Diminishing returns function: scores above 100 have reduced impact
    // Returns 100 + log10(excess) * 10, capped at 120
    const applyDiminishingReturns = (raw: number) => {
      if (raw <= 100) return raw;
      const excess = raw - 100;
      // Logarithmic diminishing returns: excess of 100 gives ~20 points, excess of 1000 gives ~30
      const bonus = Math.log10(excess + 1) * 10;
      return Math.min(120, 100 + bonus);
    };

    // Apply diminishing returns for total score calculation
    const adjustedDiet = applyDiminishingReturns(rawDietScore);
    const adjustedHydro = applyDiminishingReturns(rawHydroScore);
    const adjustedEffort = applyDiminishingReturns(rawEffortScore);

    // Overall score using adjusted values, capped at 100
    const totalScore = Math.min(
      100,
      Math.round((adjustedDiet + adjustedHydro + adjustedEffort) / 3)
    );

    // Determine emotion based on score
    let emotion = "neutral";
    if (totalScore >= 80) emotion = "happy";
    else if (totalScore >= 60) emotion = "neutral";
    else if (totalScore >= 40) emotion = "tsundere";
    else emotion = "angry";

    return {
      date: new Date().toISOString().split("T")[0],
      diet: rawDietScore, // Allow exceeding 100% for display
      hydro: hydroScore,
      effort: effortScore,
      total: totalScore,
      emotion,
    };
  }, [meals, waterLogs, workouts, settings]);

  // Daily summaries placeholder (would need historical data endpoint)
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
