import { Icon } from "@iconify/react";

interface ActionButtonsProps {
  handleButtonHover: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleButtonLeave: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function ActionButtons({
  handleButtonHover,
  handleButtonLeave,
}: ActionButtonsProps) {
  return (
    <div className="relative z-10 mt-6 flex justify-end gap-4">
      <button
        onMouseEnter={handleButtonHover}
        onMouseLeave={handleButtonLeave}
        className="px-8 py-3 border-2 border-pink-500/50 text-pink-400 font-bold tracking-widest uppercase text-sm hover:border-cyan-400 hover:text-cyan-400 transition-all flex items-center gap-2"
      >
        <Icon icon="pixelarticons:close" className="w-5 h-5" />
        RESET_CHANGES
      </button>
      <button
        onMouseEnter={handleButtonHover}
        onMouseLeave={handleButtonLeave}
        className="px-8 py-3 bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white font-bold tracking-widest uppercase text-sm hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] transition-all flex items-center gap-2"
      >
        <Icon icon="pixelarticons:save" className="w-5 h-5" />
        SAVE_PROFILE
      </button>
    </div>
  );
}
