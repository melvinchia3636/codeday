import { SelectInput } from "../../../components/SelectInput";
import { DateInput } from "../../../components/DateInput";
import { NumberInput } from "../../../components/NumberInput";
import { Icon } from "@iconify/react";
import { useUserProfile } from "../../../contexts/UserProfileContext";
import { useInputAnimations } from "../hooks/useProfileAnimations";
import { useProfileAnimationRefs } from "../contexts/ProfileAnimationsContext";

const genderOptions = [
  { value: "male", label: "MALE" },
  { value: "female", label: "FEMALE" },
  { value: "other", label: "OTHER" },
  { value: "prefer_not_to_say", label: "CLASSIFIED" },
];

const bmiCategories = [
  {
    min: 0,
    max: 18.5,
    label: "UNDERWEIGHT",
    color: "cyan",
    icon: "pixelarticons:warning",
  },
  {
    min: 18.5,
    max: 25,
    label: "NORMAL",
    color: "green",
    icon: "pixelarticons:check",
  },
  {
    min: 25,
    max: 30,
    label: "OVERWEIGHT",
    color: "yellow",
    icon: "pixelarticons:alert",
  },
  {
    min: 30,
    max: 100,
    label: "OBESE",
    color: "red",
    icon: "pixelarticons:close",
  },
];

function getBmiCategory(bmi: number) {
  if (bmi <= 0) return null;
  return (
    bmiCategories.find((c) => bmi >= c.min && bmi < c.max) || bmiCategories[3]
  );
}

function getBmiPosition(bmi: number): number {
  if (bmi <= 0) return 0;

  const clamped = Math.max(10, Math.min(40, bmi));
  return ((clamped - 10) / 30) * 100;
}

export function UserInfoCards() {
  const { profileForm, setProfileForm, formBmi } = useUserProfile();
  const { handleInputFocus, handleInputBlur } = useInputAnimations();
  const { userInfoRef } = useProfileAnimationRefs();

  const bmiCategory = getBmiCategory(formBmi);
  const bmiPosition = getBmiPosition(formBmi);

  const colorClasses = {
    cyan: {
      text: "text-cyan-400",
      border: "border-cyan-500",
      bg: "bg-cyan-500",
      glow: "shadow-[0_0_20px_rgba(34,211,238,0.6)]",
    },
    green: {
      text: "text-green-400",
      border: "border-green-500",
      bg: "bg-green-500",
      glow: "shadow-[0_0_20px_rgba(34,197,94,0.6)]",
    },
    yellow: {
      text: "text-yellow-400",
      border: "border-yellow-500",
      bg: "bg-yellow-500",
      glow: "shadow-[0_0_20px_rgba(234,179,8,0.6)]",
    },
    red: {
      text: "text-red-400",
      border: "border-red-500",
      bg: "bg-red-500",
      glow: "shadow-[0_0_20px_rgba(239,68,68,0.6)]",
    },
  };

  const colors = bmiCategory
    ? colorClasses[bmiCategory.color as keyof typeof colorClasses]
    : colorClasses.cyan;

  return (
    <div ref={userInfoRef} className="space-y-3">
      <div
        className="info-card bg-zinc-900/70 border border-pink-500/30 p-4 backdrop-blur-sm hover:border-cyan-400/50 transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
        style={{ opacity: 0 }}
      >
        <SelectInput
          label="GENDER"
          icon="pixelarticons:human"
          iconColor="pink"
          options={genderOptions}
          value={profileForm.gender}
          onChange={(e) =>
            setProfileForm((prev) => ({
              ...prev,
              gender: e.target.value as typeof profileForm.gender,
            }))
          }
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
      </div>

      <div
        className="info-card bg-zinc-900/70 border border-pink-500/30 p-4 backdrop-blur-sm hover:border-cyan-400/50 transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
        style={{ opacity: 0 }}
      >
        <DateInput
          label="BIRTH_DATE"
          icon="pixelarticons:calendar"
          iconColor="pink"
          value={profileForm.dob}
          onChange={(e) =>
            setProfileForm((prev) => ({ ...prev, dob: e.target.value }))
          }
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
      </div>

      <div
        className="info-card bg-zinc-900/70 border border-pink-500/30 p-4 backdrop-blur-sm hover:border-cyan-400/50 transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
        style={{ opacity: 0 }}
      >
        <NumberInput
          label="HEIGHT"
          icon="pixelarticons:scale"
          iconColor="pink"
          unit="CM"
          value={profileForm.heightCm || ""}
          onChange={(e) =>
            setProfileForm((prev) => ({
              ...prev,
              heightCm: parseFloat(e.target.value) || 0,
            }))
          }
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder="0"
        />
      </div>

      <div
        className="info-card bg-zinc-900/70 border border-pink-500/30 p-4 backdrop-blur-sm hover:border-cyan-400/50 transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
        style={{ opacity: 0 }}
      >
        <NumberInput
          label="WEIGHT"
          icon="pixelarticons:heart"
          iconColor="pink"
          unit="KG"
          step={0.1}
          value={profileForm.weightKg || ""}
          onChange={(e) =>
            setProfileForm((prev) => ({
              ...prev,
              weightKg: parseFloat(e.target.value) || 0,
            }))
          }
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder="0"
        />
      </div>

      {/* Enhanced BMI Section */}
      <div
        className={`info-card relative bg-zinc-900/70 border ${
          bmiCategory ? colors.border : "border-cyan-500/30"
        } p-4 backdrop-blur-sm transition-all overflow-hidden`}
        style={{ opacity: 0 }}
      >
        {/* Animated background glow */}
        {bmiCategory && (
          <div
            className={`absolute inset-0 ${colors.bg}/5 animate-pulse pointer-events-none`}
          />
        )}

        <div className="relative z-10 w-full">
          {/* Header with BMI value */}
          <div className="flex items-center justify-between mb-4">
            <label
              className={`flex items-center gap-2 text-xs ${colors.text} tracking-widest`}
            >
              <Icon icon="pixelarticons:chart" className="w-4 h-4" />
              BMI_INDEX
            </label>
            <div
              className={`flex items-center gap-2 ${colors.text} font-bold text-lg`}
            >
              {formBmi > 0 ? formBmi.toFixed(1) : "N/A"}
              {bmiCategory && (
                <Icon
                  icon={bmiCategory.icon}
                  className={`w-5 h-5 ${colors.text} animate-pulse`}
                />
              )}
            </div>
          </div>

          {/* BMI Category Badge */}
          {bmiCategory && (
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 mb-4 border ${colors.border} ${colors.bg}/20 ${colors.glow}`}
            >
              <span className={`w-2 h-2 ${colors.bg} animate-pulse`} />
              <span
                className={`text-xs font-bold tracking-widest ${colors.text}`}
              >
                STATUS: {bmiCategory.label}
              </span>
            </div>
          )}

          {/* BMI Range Bar */}
          <div className="relative mt-2">
            {/* Category labels */}
            <div className="flex justify-between text-[9px] tracking-wider mb-1">
              <span className="text-cyan-400/60">UNDER</span>
              <span className="text-green-400/60">NORMAL</span>
              <span className="text-yellow-400/60">OVER</span>
              <span className="text-red-400/60">OBESE</span>
            </div>

            {/* Gradient bar background */}
            <div className="relative h-3 bg-zinc-800/80 border border-zinc-700 overflow-hidden">
              {/* Gradient segments */}
              <div className="absolute inset-0 flex">
                <div className="w-[28%] h-full bg-linear-to-r from-cyan-600/60 to-cyan-400/60" />
                <div className="w-[22%] h-full bg-linear-to-r from-green-600/60 to-green-400/60" />
                <div className="w-[17%] h-full bg-linear-to-r from-yellow-600/60 to-yellow-400/60" />
                <div className="flex-1 h-full bg-linear-to-r from-red-600/60 to-red-800/60" />
              </div>

              {/* Indicator needle */}
              {formBmi > 0 && (
                <div
                  className="absolute top-0 h-full w-1 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                  style={{
                    left: `${bmiPosition}%`,
                    transition: "left 0.5s ease-out",
                  }}
                >
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-b-[6px] border-l-transparent border-r-transparent border-b-white" />
                </div>
              )}

              {/* Scanline effect */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.3)_50%)] bg-size-[100%_4px] pointer-events-none" />
            </div>

            {/* Range values */}
            <div className="flex justify-between text-[8px] text-zinc-500 mt-1">
              <span>10</span>
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
              <span>40+</span>
            </div>
          </div>

          {/* Status indicator */}
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-zinc-700/50">
            <span className="text-[10px] text-zinc-500 tracking-wider">
              CALCULATING...
            </span>
            <span className={`text-[10px] tracking-wider ${colors.text}`}>
              LIVE_ANALYSIS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
