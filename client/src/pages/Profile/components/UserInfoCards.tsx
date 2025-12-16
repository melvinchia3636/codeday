import type { RefObject } from "react";
import { Icon } from "@iconify/react";

interface UserInfoItem {
  icon: string;
  label: string;
  value: string | number;
  dataValue?: number;
  decimal?: boolean;
}

interface UserInfoCardsProps {
  userInfoRef: RefObject<HTMLDivElement | null>;
  items: UserInfoItem[];
}

export function UserInfoCards({ userInfoRef, items }: UserInfoCardsProps) {
  return (
    <div ref={userInfoRef} className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="info-card bg-zinc-900/70 border border-pink-500/30 p-4 flex items-center gap-4 backdrop-blur-sm hover:border-cyan-400/50 transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
          style={{ opacity: 0 }}
        >
          <Icon icon={item.icon} className="w-6 h-6 text-pink-500" />
          <div className="flex-1">
            <p className="text-xs text-pink-400/60 tracking-widest">
              {item.label}
            </p>
            <p
              className={`text-lg font-bold text-white ${
                item.decimal ? "stat-value decimal" : ""
              }`}
              data-value={item.dataValue}
            >
              {item.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
