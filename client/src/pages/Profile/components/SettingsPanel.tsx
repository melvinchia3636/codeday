import { Icon } from "@iconify/react";
import { NumberInput } from "../../../components/NumberInput";
import { SelectInput } from "../../../components/SelectInput";
import { useUserProfile } from "../../../contexts/UserProfileContext";
import { useInputAnimations } from "../hooks/useProfileAnimations";
import { useProfileAnimationRefs } from "../contexts/ProfileAnimationsContext";

const timezoneOptions = [
  { value: "UTC", label: "UTC" },
  { value: "America/New_York", label: "America/New_York" },
  { value: "America/Los_Angeles", label: "America/Los_Angeles" },
  { value: "America/Chicago", label: "America/Chicago" },
  { value: "Europe/London", label: "Europe/London" },
  { value: "Europe/Paris", label: "Europe/Paris" },
  { value: "Europe/Berlin", label: "Europe/Berlin" },
  { value: "Asia/Tokyo", label: "Asia/Tokyo" },
  { value: "Asia/Singapore", label: "Asia/Singapore" },
  { value: "Asia/Shanghai", label: "Asia/Shanghai" },
  { value: "Asia/Kuala_Lumpur", label: "Asia/Kuala_Lumpur" },
  { value: "Australia/Sydney", label: "Australia/Sydney" },
];

export function SettingsPanel() {
  const { settingsForm, setSettingsForm } = useUserProfile();
  const { handleInputFocus, handleInputBlur } = useInputAnimations();
  const { settingsRef } = useProfileAnimationRefs();

  return (
    <div
      ref={settingsRef}
      className="col-span-4 bg-zinc-900/80 border-2 border-pink-500/50 p-6 backdrop-blur-sm shadow-[0_0_30px_rgba(236,72,153,0.2)] relative"
      style={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(236,72,153,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.05)_1px,transparent_1px)] bg-size-[20px_20px]" />
      <div className="relative">
        <h3 className="text-xl font-bold text-pink-400 tracking-[0.2em] mb-6 flex items-center gap-3 border-b border-pink-500/30 pb-3">
          <Icon icon="pixelarticons:sliders" className="w-6 h-6" />
          USER_SETTINGS
        </h3>
        <div className="space-y-5">
          <div className="setting-item" style={{ opacity: 0 }}>
            <NumberInput
              label="CALORIE_TARGET"
              icon="pixelarticons:coin"
              iconColor="pink"
              unit="KCAL"
              step={50}
              value={settingsForm.dietCalorieTarget || ""}
              onChange={(e) =>
                setSettingsForm((prev) => ({
                  ...prev,
                  dietCalorieTarget: parseFloat(e.target.value) || 0,
                }))
              }
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </div>

          <div className="setting-item" style={{ opacity: 0 }}>
            <NumberInput
              label="HYDRATION_TARGET"
              icon="pixelarticons:drop"
              iconColor="cyan"
              unit="ML"
              step={100}
              value={settingsForm.hydroTargetMl || ""}
              onChange={(e) =>
                setSettingsForm((prev) => ({
                  ...prev,
                  hydroTargetMl: parseFloat(e.target.value) || 0,
                }))
              }
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </div>

          <div className="setting-item" style={{ opacity: 0 }}>
            <NumberInput
              label="HYDRO_INTERVAL"
              icon="pixelarticons:clock"
              iconColor="fuchsia"
              unit="MIN"
              step={5}
              value={settingsForm.hydroIntervalMin || ""}
              onChange={(e) =>
                setSettingsForm((prev) => ({
                  ...prev,
                  hydroIntervalMin: parseFloat(e.target.value) || 0,
                }))
              }
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </div>

          <div className="setting-item" style={{ opacity: 0 }}>
            <NumberInput
              label="MEALS_PER_DAY"
              icon="pixelarticons:loader"
              iconColor="purple"
              unit="MEALS"
              step={1}
              value={settingsForm.expectedMealsPerDay || ""}
              onChange={(e) =>
                setSettingsForm((prev) => ({
                  ...prev,
                  expectedMealsPerDay: parseFloat(e.target.value) || 0,
                }))
              }
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </div>

          <div className="setting-item" style={{ opacity: 0 }}>
            <SelectInput
              label="TIMEZONE"
              icon="pixelarticons:clock"
              iconColor="cyan"
              options={timezoneOptions}
              value={settingsForm.timezone}
              onChange={(e) =>
                setSettingsForm((prev) => ({
                  ...prev,
                  timezone: e.target.value,
                }))
              }
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
