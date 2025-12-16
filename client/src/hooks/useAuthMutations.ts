import { useMutation } from "@tanstack/react-query";
import { auth } from "../lib/auth";
import type { LoginCredentials, SignupData } from "../lib/auth";

/**
 * Mutation hook for login
 */
export function useLoginMutation() {
  return useMutation({
    mutationFn: (credentials: LoginCredentials) => auth.login(credentials),
  });
}

/**
 * Mutation hook for signup
 */
export function useSignupMutation() {
  return useMutation({
    mutationFn: (data: SignupData) => auth.signup(data),
  });
}
