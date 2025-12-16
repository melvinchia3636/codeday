import type { RefObject } from "react";
import { Icon } from "@iconify/react";

interface SettingItem {
  icon: string;
  label: string;
  value: string | number;
  unit: string;
  color: string;
}

interface SettingsPanelProps {
  settingsRef: RefObject<HTMLDivElement | null>;
  items: SettingItem[];
  handleInputFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleInputBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export function SettingsPanel({
  settingsRef,
  items,
  handleInputFocus,
  handleInputBlur,
}: SettingsPanelProps) {
  return (
    <div
      ref={settingsRef}
      className="col-span-4 bg-zinc-900/80 border-2 border-pink-500/50 p-6 backdrop-blur-sm shadow-[0_0_30px_rgba(236,72,153,0.2)] relative"
      style={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(236,72,153,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
      <div className="relative">
        <h3 className="text-xl font-bold text-pink-400 tracking-[0.2em] mb-6 flex items-center gap-3 border-b border-pink-500/30 pb-3">
          <Icon icon="pixelarticons:sliders" className="w-6 h-6" />
          USER_SETTINGS
        </h3>
        <div className="space-y-5">
          {items.map((item, i) => (
            <div key={i} className="setting-item" style={{ opacity: 0 }}>
              <label className="flex items-center gap-2 text-xs text-pink-400/70 tracking-widest mb-2">
                <Icon
                  icon={item.icon}
                  className={`w-4 h-4 text-${item.color}-400`}
                />
                {item.label}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type={typeof item.value === "number" ? "number" : "text"}
                  defaultValue={item.value}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  className="flex-1 bg-zinc-800/80 border border-pink-500/40 px-4 py-2.5 text-white focus:outline-none transition-all"
                />
                {item.unit && (
                  <span className="text-pink-400/60 text-xs tracking-wider w-12">
                    {item.unit}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
