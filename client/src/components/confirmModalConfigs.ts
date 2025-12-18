import type { ConfirmModalConfig } from "./ConfirmModal";

// Pre-configured modal configs for common use cases
export const logoutModalConfig: ConfirmModalConfig = {
  title: "TERMINATE_SESSION",
  message: "Are you sure you want to disconnect from the neural network?",
  subMessage: "All active sessions will be terminated.",
  statusText: "CONFIRM_ACTION",
  icon: "pixelarticons:logout",
  confirmText: "DISCONNECT",
  cancelText: "CANCEL",
  theme: "danger",
  warningText: "WARNING",
  irreversibleText: "IRREVERSIBLE",
};

export const resetLogsModalConfig: ConfirmModalConfig = {
  title: "CLEAR_LOGS",
  message: "Are you sure you want to clear today's water logs?",
  subMessage: "This action cannot be undone.",
  statusText: "CONFIRM_RESET",
  icon: "pixelarticons:redo",
  confirmText: "CLEAR_ALL",
  cancelText: "CANCEL",
  theme: "warning",
  warningText: "WARNING",
  irreversibleText: "IRREVERSIBLE",
};

export const resetProfileModalConfig: ConfirmModalConfig = {
  title: "RESET_CHANGES",
  message: "Are you sure you want to discard all unsaved changes?",
  subMessage: "Your profile will revert to the last saved state.",
  statusText: "CONFIRM_RESET",
  icon: "pixelarticons:close",
  confirmText: "RESET",
  cancelText: "CANCEL",
  theme: "warning",
  warningText: "UNSAVED",
  irreversibleText: "CHANGES_LOST",
};

export const deleteWorkoutTypeModalConfig: ConfirmModalConfig = {
  title: "DELETE_WORKOUT_TYPE",
  message: "Are you sure you want to delete this workout type?",
  subMessage: "This action cannot be undone.",
  statusText: "CONFIRM_DELETE",
  icon: "pixelarticons:trash",
  confirmText: "DELETE",
  cancelText: "CANCEL",
  theme: "danger",
  warningText: "WARNING",
  irreversibleText: "IRREVERSIBLE",
};

export const deleteActivityModalConfig: ConfirmModalConfig = {
  title: "DELETE_ACTIVITY",
  message: "Are you sure you want to delete this activity log?",
  subMessage: "This action cannot be undone.",
  statusText: "CONFIRM_DELETE",
  icon: "pixelarticons:trash",
  confirmText: "DELETE",
  cancelText: "CANCEL",
  theme: "danger",
  warningText: "WARNING",
  irreversibleText: "IRREVERSIBLE",
};

export const deleteAccountModalConfig: ConfirmModalConfig = {
  title: "DELETE_ACCOUNT",
  message: "Are you sure you want to permanently delete your account?",
  subMessage: "All your data will be erased. This action cannot be undone.",
  statusText: "CONFIRM_DELETION",
  icon: "pixelarticons:trash",
  confirmText: "DELETE_FOREVER",
  cancelText: "CANCEL",
  theme: "danger",
  warningText: "DANGER",
  irreversibleText: "PERMANENT",
};
