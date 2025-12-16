import { useQuery } from "@tanstack/react-query";
import { profileApi } from "../lib/profile";
import { auth } from "../lib/auth";

export const profileQueryKeys = {
  all: ["profile"] as const,
  userData: () => [...profileQueryKeys.all, "user-data"] as const,
  profile: () => [...profileQueryKeys.all, "me"] as const,
  settings: () => [...profileQueryKeys.all, "settings"] as const,
  weightTarget: () => [...profileQueryKeys.all, "weight-target"] as const,
};

/**
 * Query hook for fetching current user's data (users collection)
 * Used for profile form: gender, dob, heightCm, weightKg
 */
export function useUserDataQuery() {
  return useQuery({
    queryKey: profileQueryKeys.userData(),
    queryFn: profileApi.getUserData,
    enabled: auth.isAuthenticated(),
  });
}

/**
 * Query hook for fetching current user's settings
 */
export function useSettingsQuery() {
  return useQuery({
    queryKey: profileQueryKeys.settings(),
    queryFn: profileApi.getSettings,
    enabled: auth.isAuthenticated(),
  });
}

/**
 * Query hook for fetching current user's weight target
 */
export function useWeightTargetQuery() {
  return useQuery({
    queryKey: profileQueryKeys.weightTarget(),
    queryFn: profileApi.getWeightTarget,
    enabled: auth.isAuthenticated(),
  });
}
