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

export function UserInfoCards() {
  const { profileForm, setProfileForm, formBmi } = useUserProfile();
  const { handleInputFocus, handleInputBlur } = useInputAnimations();
  const { userInfoRef } = useProfileAnimationRefs();

  return (
    <div ref={userInfoRef} className="space-y-3">
      {/* Gender */}
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

      {/* Birth Date */}
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

      {/* Height */}
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

      {/* Weight */}
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

      {/* BMI (read-only, calculated) */}
      <div
        className="info-card bg-zinc-900/70 border border-cyan-500/30 p-4 backdrop-blur-sm"
        style={{ opacity: 0 }}
      >
        <div className="w-full">
          <label className="flex items-center gap-2 text-xs text-cyan-400/70 tracking-widest mb-2">
            <Icon icon="pixelarticons:chart" className="w-4 h-4" />
            BMI_INDEX
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-zinc-800/80 border border-cyan-500/40 px-4 py-2.5 text-cyan-400 font-bold">
              {formBmi > 0 ? formBmi.toFixed(1) : "N/A"}
            </div>
            <span className="text-cyan-400/60 text-xs tracking-wider min-w-[3rem]">
              AUTO
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
