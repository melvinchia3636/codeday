import { useState } from "react";
import { Icon } from "@iconify/react";
import { ConfirmModal } from "../../../components/ConfirmModal";
import { resetLogsModalConfig } from "../../../components/confirmModalConfigs";
import { useHydrationAnimationRefs } from "../contexts/HydrationAnimationsContext";
import { useHydration } from "../../../contexts/HydrationContext";
import {
  useLucyToast,
  type HydrationAction,
} from "../../../contexts/LucyToastContext";

const quickAmounts = [100, 250, 350, 500];

export function QuickAdd() {
  const { logRef } = useHydrationAnimationRefs();
  const {
    addWater,
    resetToday,
    isAddingWater,
    isResetting,
    isLoading,
    logsCount,
    totalWater,
    targetWater,
  } = useHydration();
  const { showToast } = useLucyToast();

  const [customAmount, setCustomAmount] = useState(250);
  const [showResetModal, setShowResetModal] = useState(false);

  // Determine hydration action based on current state
  const getHydrationAction = (amountToAdd: number): HydrationAction => {
    const newTotal = totalWater + amountToAdd;

    // First log of the day
    if (logsCount === 0) return "first_time";

    // Would exceed 120% of target (overdrinking)
    if (newTotal > targetWater * 1.2) return "overdrink_time";

    // Just reached the goal (was below, now at or above)
    if (totalWater < targetWater && newTotal >= targetWater)
      return "reached_time";

    // Subsequent normal log
    return "subsequent_time";
  };

  const handleQuickAdd = (amount: number) => {
    if (!isAddingWater && !isLoading) {
      const action = getHydrationAction(amount);
      addWater(amount);
      showToast("logged_hydration", action);
    }
  };

  const handleCustomAdd = () => {
    if (!isAddingWater && !isLoading && customAmount > 0) {
      const action = getHydrationAction(customAmount);
      addWater(customAmount);
      showToast("logged_hydration", action);
    }
  };

  const handleResetClick = () => {
    setShowResetModal(true);
  };

  const handleResetConfirm = () => {
    resetToday();
    setShowResetModal(false);
  };

  const handleResetCancel = () => {
    setShowResetModal(false);
  };

  const isDisabled = isAddingWater || isLoading;

  return (
    <>
      <div
        ref={logRef}
        className="col-span-4 bg-zinc-900/80 border-2 border-cyan-500/50 p-5 backdrop-blur-sm flex flex-col"
        style={{ opacity: 0 }}
      >
        <h3 className="text-lg font-bold text-cyan-400 tracking-[0.2em] mb-4 flex items-center gap-2 border-b border-cyan-500/30 pb-2">
          <Icon icon="pixelarticons:plus" className="w-5 h-5" />
          QUICK_ADD
        </h3>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {quickAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => handleQuickAdd(amount)}
              disabled={isDisabled}
              className="p-4 bg-cyan-500/10 border-2 border-cyan-500/40 text-cyan-400 font-bold tracking-widest hover:bg-cyan-500/20 hover:border-cyan-400 transition-all flex flex-col items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon icon="pixelarticons:drop" className="w-8 h-8" />
              <span>{amount} ml</span>
            </button>
          ))}
        </div>
        <div className="mt-auto">
          <label className="text-xs text-cyan-400/70 tracking-widest mb-2 block">
            CUSTOM_AMOUNT (ML)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(Number(e.target.value))}
              min={1}
              max={2000}
              className="flex-1 bg-zinc-800/80 border border-cyan-500/40 px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
            />
            <button
              onClick={handleCustomAdd}
              disabled={isDisabled || customAmount <= 0}
              className="px-6 py-3 bg-linear-to-r from-cyan-500 to-pink-500 text-white font-bold tracking-widest hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon icon="pixelarticons:plus" className="w-5 h-5" />
            </button>
          </div>
        </div>
        <button
          onClick={handleResetClick}
          disabled={isDisabled || isResetting}
          className="mt-4 px-4 py-2 border border-pink-500/40 text-pink-400 text-sm tracking-widest hover:bg-pink-500/10 hover:border-pink-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon
            icon="pixelarticons:redo"
            className="w-4 h-4 inline-block mr-2"
          />
          RESET_TODAY
        </button>
      </div>

      <ConfirmModal
        isVisible={showResetModal}
        onConfirm={handleResetConfirm}
        onCancel={handleResetCancel}
        isLoading={isResetting}
        config={resetLogsModalConfig}
      />
    </>
  );
}
