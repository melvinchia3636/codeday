import { forwardRef } from "react";
import { Icon } from "@iconify/react";

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  icon?: string;
  iconColor?: string;
  unit?: string;
  error?: string;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    { label, icon, iconColor = "pink", unit, error, className = "", ...props },
    ref
  ) => {
    return (
      <div className="w-full">
        <label className="flex items-center gap-2 text-xs text-pink-400/70 tracking-widest mb-2">
          {icon && (
            <Icon icon={icon} className={`w-3 h-3 text-${iconColor}-400`} />
          )}
          {!icon && <span className="w-1.5 h-1.5 bg-pink-400" />}
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            type="number"
            className={`
              w-full bg-zinc-800/80 border-2 border-pink-500/40 px-4 py-3 
              text-white text-xl font-bold focus:outline-none transition-all
              focus:border-pink-400 focus:shadow-[0_0_15px_rgba(236,72,153,0.3)]
              [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
              ${unit ? "pr-20" : ""}
              ${error ? "border-red-500" : ""}
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

NumberInput.displayName = "NumberInput";
