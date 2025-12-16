import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useUserDataQuery,
  useSettingsQuery,
  useWeightTargetQuery,
  profileQueryKeys,
} from "../hooks/useProfileQueries";
import {
  useSaveProfileMutation,
  useUpdateUserMutation,
  useUpdateSettingsMutation,
} from "../hooks/useProfileMutations";
import type {
  UserData,
  UserSettings,
  WeightTarget,
  UpdateUserData,
  UpdateSettingsData,
} from "../lib/profile";

// Form data types
export interface ProfileFormData {
  gender: "male" | "female" | "other" | "prefer_not_to_say";
  dob: string;
  heightCm: number;
  weightKg: number;
}

export interface SettingsFormData {
  dietCalorieTarget: number;
  hydroTargetMl: number;
  hydroIntervalMin: number;
  expectedMealsPerDay: number;
  timezone: string;
}

interface UserProfileContextType {
  // User data from users collection
  userData: UserData | null | undefined;
  isUserDataLoading: boolean;
  userDataError: Error | null;

  // Settings
  settings: UserSettings | null | undefined;
  isSettingsLoading: boolean;
  settingsError: Error | null;

  // Weight target
  weightTarget: WeightTarget | null | undefined;
  isWeightTargetLoading: boolean;

  // Combined loading state
  isLoading: boolean;

  // Form state for editing
  profileForm: ProfileFormData;
  setProfileForm: React.Dispatch<React.SetStateAction<ProfileFormData>>;
  settingsForm: SettingsFormData;
  setSettingsForm: React.Dispatch<React.SetStateAction<SettingsFormData>>;

  // Mutations
  updateUserData: (data: UpdateUserData) => Promise<UserData>;
  updateSettings: (data: UpdateSettingsData) => Promise<UserSettings>;
  saveProfile: () => Promise<void>;
  isSaving: boolean;

  // Reset form to server values
  resetForm: () => void;

  // Utilities
  refetchAll: () => void;
  invalidateAll: () => void;

  // Computed values
  bmi: number;
  formBmi: number; // BMI based on form values (for live preview)
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(
  undefined
);

interface UserProfileProviderProps {
  children: ReactNode;
}

/**
 * Calculate BMI from height and weight
 */
function calculateBMI(heightCm?: number, weightKg?: number): number {
  if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) return 0;
  const heightM = heightCm / 100;
  return Math.round((weightKg / (heightM * heightM)) * 10) / 10;
}

/**
 * Format date string for HTML date input (YYYY-MM-DD)
 * PocketBase returns dates like "2000-01-15 00:00:00.000Z"
 */
function formatDateForInput(dateString?: string): string {
  if (!dateString) return "";
  // Try to extract YYYY-MM-DD from the beginning of the string
  const match = dateString.match(/^(\d{4}-\d{2}-\d{2})/);
  if (match) return match[1];
  // Fallback: try to parse as Date and format
  try {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return date.toISOString().split("T")[0];
    }
  } catch {
    // Ignore parsing errors
  }
  return "";
}

const defaultProfileForm: ProfileFormData = {
  gender: "prefer_not_to_say",
  dob: "",
  heightCm: 0,
  weightKg: 0,
};

const defaultSettingsForm: SettingsFormData = {
  dietCalorieTarget: 2000,
  hydroTargetMl: 2000,
  hydroIntervalMin: 60,
  expectedMealsPerDay: 3,
  timezone: "UTC",
};

export function UserProfileProvider({ children }: UserProfileProviderProps) {
  const queryClient = useQueryClient();

  // Query hooks
  const {
    data: userData,
    isLoading: isUserDataLoading,
    error: userDataError,
    refetch: refetchUserData,
  } = useUserDataQuery();

  const {
    data: settings,
    isLoading: isSettingsLoading,
    error: settingsError,
    refetch: refetchSettings,
  } = useSettingsQuery();

  const {
    data: weightTarget,
    isLoading: isWeightTargetLoading,
    refetch: refetchWeightTarget,
  } = useWeightTargetQuery();

  // Form state
  const [profileForm, setProfileForm] =
    useState<ProfileFormData>(defaultProfileForm);
  const [settingsForm, setSettingsForm] =
    useState<SettingsFormData>(defaultSettingsForm);

  // Initialize form from server data
  useEffect(() => {
    if (userData) {
      console.log(userData);
      setProfileForm({
        gender: userData.gender || "prefer_not_to_say",
        dob: formatDateForInput(userData.dob),
        heightCm: userData.heightCm || 0,
        weightKg: userData.weightKg || 0,
      });
    }
  }, [userData]);

  useEffect(() => {
    if (settings) {
      setSettingsForm({
        dietCalorieTarget: settings.dietCalorieTarget || 2000,
        hydroTargetMl: settings.hydroTargetMl || 2000,
        hydroIntervalMin: settings.hydroIntervalMin || 60,
        expectedMealsPerDay: settings.expectedMealsPerDay || 3,
        timezone: settings.timezone || "UTC",
      });
    }
  }, [settings]);

  // Mutation hooks
  const updateUserMutation = useUpdateUserMutation();
  const updateSettingsMutation = useUpdateSettingsMutation();
  const saveProfileMutation = useSaveProfileMutation();

  // Combined loading state
  const isLoading =
    isUserDataLoading || isSettingsLoading || isWeightTargetLoading;
  const isSaving =
    updateUserMutation.isPending ||
    updateSettingsMutation.isPending ||
    saveProfileMutation.isPending;

  // Mutation functions
  const updateUserData = async (data: UpdateUserData): Promise<UserData> => {
    return updateUserMutation.mutateAsync(data);
  };

  const updateSettings = async (
    data: UpdateSettingsData
  ): Promise<UserSettings> => {
    return updateSettingsMutation.mutateAsync(data);
  };

  // Save using current form state
  const saveProfile = async (): Promise<void> => {
    await saveProfileMutation.mutateAsync({
      userData: {
        gender: profileForm.gender,
        dob: profileForm.dob,
        heightCm: profileForm.heightCm,
        weightKg: profileForm.weightKg,
      },
      settingsData: {
        dietCalorieTarget: settingsForm.dietCalorieTarget,
        hydroTargetMl: settingsForm.hydroTargetMl,
        hydroIntervalMin: settingsForm.hydroIntervalMin,
        expectedMealsPerDay: settingsForm.expectedMealsPerDay,
        timezone: settingsForm.timezone,
      },
    });
  };

  // Reset form to server values
  const resetForm = () => {
    if (userData) {
      setProfileForm({
        gender: userData.gender || "prefer_not_to_say",
        dob: formatDateForInput(userData.dob),
        heightCm: userData.heightCm || 0,
        weightKg: userData.weightKg || 0,
      });
    }
    if (settings) {
      setSettingsForm({
        dietCalorieTarget: settings.dietCalorieTarget || 2000,
        hydroTargetMl: settings.hydroTargetMl || 2000,
        hydroIntervalMin: settings.hydroIntervalMin || 60,
        expectedMealsPerDay: settings.expectedMealsPerDay || 3,
        timezone: settings.timezone || "UTC",
      });
    }
  };

  // Utility functions
  const refetchAll = () => {
    refetchUserData();
    refetchSettings();
    refetchWeightTarget();
  };

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: profileQueryKeys.all });
  };

  // Computed BMI (from saved data)
  const bmi = calculateBMI(userData?.heightCm, userData?.weightKg);
  // Form BMI (from current form values, for live preview)
  const formBmi = calculateBMI(profileForm.heightCm, profileForm.weightKg);

  const value: UserProfileContextType = {
    userData,
    isUserDataLoading,
    userDataError: userDataError as Error | null,
    settings,
    isSettingsLoading,
    settingsError: settingsError as Error | null,
    weightTarget,
    isWeightTargetLoading,
    isLoading,
    profileForm,
    setProfileForm,
    settingsForm,
    setSettingsForm,
    updateUserData,
    updateSettings,
    saveProfile,
    isSaving,
    resetForm,
    refetchAll,
    invalidateAll,
    bmi,
    formBmi,
  };

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile(): UserProfileContextType {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }
  return context;
}
