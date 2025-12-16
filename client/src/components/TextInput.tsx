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
        <div className="flex items-center gap-2">
          <input
            ref={ref}
            type="text"
            className={`
              flex-1 bg-zinc-800/80 border border-pink-500/40 px-4 py-2.5 
              text-white placeholder-zinc-500 focus:outline-none transition-all
              focus:border-pink-500 focus:shadow-[0_0_15px_rgba(236,72,153,0.3)]
              ${error ? "border-red-500" : ""}
              ${className}
            `}
            {...props}
          />
          {unit && (
            <span className="text-pink-400/60 text-xs tracking-wider min-w-[3rem]">
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
