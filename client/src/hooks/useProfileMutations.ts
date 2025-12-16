import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileApi } from "../lib/profile";
import type { UpdateUserData, UpdateSettingsData } from "../lib/profile";
import { profileQueryKeys } from "./useProfileQueries";

/**
 * Mutation hook for updating user data
 */
export function useUpdateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserData) => profileApi.updateUserData(data),
    onSuccess: () => {
      // Invalidate profile query to refetch
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.profile() });
    },
  });
}

/**
 * Mutation hook for updating settings
 */
export function useUpdateSettingsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateSettingsData) => profileApi.updateSettings(data),
    onSuccess: () => {
      // Invalidate settings query to refetch
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.settings() });
    },
  });
}

/**
 * Combined hook for saving both profile and settings
 */
export function useSaveProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userData,
      settingsData,
    }: {
      userData: UpdateUserData;
      settingsData: UpdateSettingsData;
    }) => {
      await Promise.all([
        profileApi.updateUserData(userData),
        profileApi.updateSettings(settingsData),
      ]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.all });
    },
  });
}
