import type { RefObject } from "react";
import { Icon } from "@iconify/react";

interface WorkoutType {
  id: string;
  icon: string;
  label: string;
  color: string;
}

interface WorkoutTypesProps {
  typesRef: RefObject<HTMLDivElement | null>;
  types: WorkoutType[];
}

export function WorkoutTypes({ typesRef, types }: WorkoutTypesProps) {
  return (
    <div
      ref={typesRef}
      className="relative z-10 flex gap-3 mb-6 justify-center"
    >
      {types.map((t) => (
        <button
          key={t.id}
          className={`type-btn px-6 py-3 bg-${t.color}-500/10 border border-${t.color}-500/40 text-${t.color}-400 font-bold tracking-widest text-sm hover:bg-${t.color}-500/20 hover:border-${t.color}-400 transition-all flex items-center gap-2`}
          style={{ opacity: 0 }}
        >
          <Icon icon={t.icon} className="w-5 h-5" />
          {t.label}
        </button>
      ))}
    </div>
  );
}
