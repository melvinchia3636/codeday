import { forwardRef } from "react";
import { Icon } from "@iconify/react";

export interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  icon: string;
  iconColor?: string;
  unit?: string;
  error?: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    { label, icon, iconColor = "pink", unit, error, className = "", ...props },
    ref
  ) => {
    return (
      <div className="w-full">
        <label className="flex items-center gap-2 text-xs text-pink-400/70 tracking-widest mb-2">
          <Icon icon={icon} className={`w-4 h-4 text-${iconColor}-400`} />
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            type="text"
            className={`
              w-full bg-zinc-800/80 border-2 px-4 py-3 
              text-white text-xl font-bold placeholder-zinc-500 focus:outline-none transition-all
              focus:shadow-[0_0_15px_rgba(236,72,153,0.3)]
              ${
                error
                  ? "border-red-500! focus:border-red-400!"
                  : "border-pink-500/40 focus:border-pink-400"
              }
              ${unit ? "pr-20" : ""}
              ${className}
            `}
            {...props}
          />
          {unit && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-400/50 text-sm tracking-widest pointer-events-none">
              {unit}
            </span>
          )}
        </div>
        {error && (
          <p className="text-red-400 text-xs mt-1 tracking-wide">{error}</p>
        )}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";
