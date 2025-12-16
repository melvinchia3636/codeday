import { forwardRef } from "react";
import { Icon } from "@iconify/react";

export interface DateInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  icon?: string;
  iconColor?: string;
  error?: string;
}

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  (
    { label, icon, iconColor = "pink", error, className = "", ...props },
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
        <input
          ref={ref}
          type="date"
          className={`
            w-full bg-zinc-800/80 border-solid border-2 border-pink-500/40 px-4 py-3 
            text-white text-xl font-bold focus:outline-none transition-all
            focus:border-pink-400 focus:shadow-[0_0_15px_rgba(236,72,153,0.3)]
            [color-scheme:dark] appearance-none
            ${error ? "border-red-500" : ""}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="text-red-400 text-xs mt-1 tracking-wide">{error}</p>
        )}
      </div>
    );
  }
);

DateInput.displayName = "DateInput";
