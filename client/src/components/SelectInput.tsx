import { forwardRef } from "react";
import { Icon } from "@iconify/react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectInputProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label: string;
  icon?: string;
  iconColor?: string;
  options: SelectOption[];
  error?: string;
}

export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  (
    {
      label,
      icon,
      iconColor = "pink",
      options,
      error,
      className = "",
      ...props
    },
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
          <select
            ref={ref}
            className={`
              w-full bg-zinc-800/80 border-2 border-pink-500/40 px-4 py-3 pr-10
              text-white text-xl font-bold focus:outline-none transition-all
              focus:border-pink-400 focus:shadow-[0_0_15px_rgba(236,72,153,0.3)]
              appearance-none cursor-pointer
              ${error ? "border-red-500" : ""}
              ${className}
            `}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <Icon
              icon="pixelarticons:chevron-down"
              className="w-5 h-5 text-pink-400/70"
            />
          </div>
        </div>
        {error && (
          <p className="text-red-400 text-xs mt-1 tracking-wide">{error}</p>
        )}
      </div>
    );
  }
);

SelectInput.displayName = "SelectInput";
