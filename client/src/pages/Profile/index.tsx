import { useRef } from "react";
import {
  useProfileAnimations,
  useInputAnimations,
  useButtonAnimations,
} from "./hooks/useProfileAnimations";
import { PageDecorations } from "./components/PageDecorations";
import { PageHeader } from "./components/PageHeader";
import { ProfileAvatar } from "./components/ProfileAvatar";
import { UserInfoCards } from "./components/UserInfoCards";
import { SettingsPanel } from "./components/SettingsPanel";
import { TargetsPanel } from "./components/TargetsPanel";
import { WaifuPanel } from "./components/WaifuPanel";
import { ActionButtons } from "./components/ActionButtons";

// Mock data based on class diagram
const userData = {
  id: "usr_001",
  name: "OPERATOR_01",
  email: "operator@nexus.io",
  gender: "prefer_not_to_say" as const,
  dob: "1995-03-15",
  height_cm: 175,
  weight_kg: 72.5,
  get_bmi: () => 23.7,
};

const userSettings = {
  diet_calorie_target: 2200,
  hydro_target_ml: 3000,
  hydro_interval_min: 45,
  expected_meals_per_day: 4,
  timezone: "Asia/Tokyo",
};

const userTargets = {
  target_weight_kg: 70,
  target_type: "lose" as const,
};

const waifuProfile = {
  id: "waifu_001",
  name: "ARIA-7",
  yandere_level: "medium" as "none" | "low" | "medium" | "high",
};

const genderLabels = {
  male: "MALE",
  female: "FEMALE",
  other: "OTHER",
  prefer_not_to_say: "CLASSIFIED",
};

const userInfoItems = [
  {
    icon: "pixelarticons:human",
    label: "GENDER",
    value: genderLabels[userData.gender],
  },
  { icon: "pixelarticons:calendar", label: "BIRTH_DATE", value: userData.dob },
  {
    icon: "pixelarticons:scale",
    label: "HEIGHT",
    value: `${userData.height_cm} CM`,
  },
  {
    icon: "pixelarticons:heart",
    label: "WEIGHT",
    value: `${userData.weight_kg} KG`,
    dataValue: userData.weight_kg,
    decimal: true,
  },
  {
    icon: "pixelarticons:speed-medium",
    label: "BMI_INDEX",
    value: userData.get_bmi().toFixed(1),
    dataValue: userData.get_bmi(),
    decimal: true,
  },
];

const settingsItems = [
  {
    icon: "pixelarticons:coin",
    label: "CALORIE_TARGET",
    value: userSettings.diet_calorie_target,
    unit: "KCAL",
    color: "pink",
  },
  {
    icon: "pixelarticons:drop",
    label: "HYDRATION_TARGET",
    value: userSettings.hydro_target_ml,
    unit: "ML",
    color: "cyan",
  },
  {
    icon: "pixelarticons:clock",
    label: "HYDRO_INTERVAL",
    value: userSettings.hydro_interval_min,
    unit: "MIN",
    color: "fuchsia",
  },
  {
    icon: "pixelarticons:loader",
    label: "MEALS_PER_DAY",
    value: userSettings.expected_meals_per_day,
    unit: "MEALS",
    color: "purple",
  },
  {
    icon: "pixelarticons:globe",
    label: "TIMEZONE",
    value: userSettings.timezone,
    unit: "",
    color: "cyan",
  },
];

export function Profile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const userInfoRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const targetsRef = useRef<HTMLDivElement>(null);
  const waifuRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement[]>([]);
  const cornersRef = useRef<HTMLDivElement[]>([]);
  const sideBarsRef = useRef<HTMLDivElement[]>([]);
  const particlesRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const glitchOverlayRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useProfileAnimations({
    containerRef,
    headerRef,
    avatarRef,
    userInfoRef,
    settingsRef,
    targetsRef,
    waifuRef,
    topLineRef,
    bottomLineRef,
    orbsRef,
    cornersRef,
    sideBarsRef,
    particlesRef,
    scanlineRef,
    glitchOverlayRef,
    gridRef,
  });

  const { handleInputFocus, handleInputBlur } = useInputAnimations();
  const { handleButtonHover, handleButtonLeave } = useButtonAnimations();

  return (
    <div
      ref={containerRef}
      className="flex-1 flex flex-col border-[8px] border-pink-500 p-6 shadow-[0_0_30px_rgba(236,72,153,0.5)] bg-gradient-to-br from-zinc-900 via-zinc-950 to-fuchsia-950/30 relative overflow-hidden"
      style={{ opacity: 0, perspective: "1500px" }}
    >
      <PageDecorations
        particlesRef={particlesRef}
        gridRef={gridRef}
        scanlineRef={scanlineRef}
        glitchOverlayRef={glitchOverlayRef}
        topLineRef={topLineRef}
        bottomLineRef={bottomLineRef}
        orbsRef={orbsRef}
        cornersRef={cornersRef}
        sideBarsRef={sideBarsRef}
      />

      <PageHeader headerRef={headerRef} userId={userData.id} />

      <div className="relative z-10 flex-1 grid grid-cols-12 gap-6 overflow-auto">
        <div className="col-span-4 flex flex-col gap-6">
          <ProfileAvatar
            avatarRef={avatarRef}
            name={userData.name}
            email={userData.email}
          />
          <UserInfoCards userInfoRef={userInfoRef} items={userInfoItems} />
        </div>

        <SettingsPanel
          settingsRef={settingsRef}
          items={settingsItems}
          handleInputFocus={handleInputFocus}
          handleInputBlur={handleInputBlur}
        />

        <div className="col-span-4 flex flex-col gap-6">
          <TargetsPanel
            targetsRef={targetsRef}
            currentWeight={userData.weight_kg}
            targetWeight={userTargets.target_weight_kg}
            targetType={userTargets.target_type}
          />
          <WaifuPanel
            waifuRef={waifuRef}
            name={waifuProfile.name}
            yandereLevel={waifuProfile.yandere_level}
          />
        </div>
      </div>

      <ActionButtons
        handleButtonHover={handleButtonHover}
        handleButtonLeave={handleButtonLeave}
      />
    </div>
  );
}
