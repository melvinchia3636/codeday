import { useRef } from "react";
import { useActivityAnimations } from "./hooks/useActivityAnimations";
import { PageDecorationsProvider } from "../../contexts/PageDecorationsContext";
import { PageDecorations } from "../../components/PageDecorations";
import { PageHeader } from "../../components/PageHeader";
import { SummaryCards } from "./components/SummaryCards";
import { ActivityTimeline } from "./components/ActivityTimeline";
import { HistoryCalendar } from "./components/HistoryCalendar";

const dailySummaries = [
  {
    date: "2024-12-16",
    diet: 85,
    hydro: 67,
    effort: 78,
    total: 77,
    emotion: "happy",
  },
  {
    date: "2024-12-15",
    diet: 92,
    hydro: 100,
    effort: 90,
    total: 94,
    emotion: "happy",
  },
  {
    date: "2024-12-14",
    diet: 70,
    hydro: 80,
    effort: 60,
    total: 70,
    emotion: "neutral",
  },
  {
    date: "2024-12-13",
    diet: 45,
    hydro: 40,
    effort: 30,
    total: 38,
    emotion: "tsundere",
  },
  {
    date: "2024-12-12",
    diet: 88,
    hydro: 95,
    effort: 85,
    total: 89,
    emotion: "happy",
  },
];

const activityTimeline = [
  {
    id: 1,
    type: "workout",
    title: "Running",
    desc: "45 min • 420 kcal",
    time: "08:30",
    icon: "pixelarticons:human-run",
    color: "pink",
  },
  {
    id: 2,
    type: "water",
    title: "Hydration",
    desc: "500 ml",
    time: "10:00",
    icon: "pixelarticons:drop",
    color: "cyan",
  },
  {
    id: 3,
    type: "meal",
    title: "Lunch",
    desc: "630 kcal • Chicken, Rice",
    time: "12:15",
    icon: "pixelarticons:coin",
    color: "fuchsia",
  },
  {
    id: 4,
    type: "water",
    title: "Hydration",
    desc: "350 ml",
    time: "14:45",
    icon: "pixelarticons:drop",
    color: "cyan",
  },
  {
    id: 5,
    type: "workout",
    title: "Strength Training",
    desc: "60 min • 380 kcal",
    time: "17:00",
    icon: "pixelarticons:trophy",
    color: "pink",
  },
  {
    id: 6,
    type: "meal",
    title: "Dinner",
    desc: "720 kcal • Salmon, Vegetables",
    time: "19:30",
    icon: "pixelarticons:coin",
    color: "fuchsia",
  },
  {
    id: 7,
    type: "water",
    title: "Hydration",
    desc: "400 ml",
    time: "21:00",
    icon: "pixelarticons:drop",
    color: "cyan",
  },
];

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

  useActivityAnimations({
    containerRef,
    summaryRef,
    timelineRef,
    calendarRef,
  });

  const today = dailySummaries[0];

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
