import { z } from 'zod';

/**
 * User validation schemas using Zod
 */

// Create user schema
export const createUserSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must not exceed 50 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must not exceed 100 characters'),
  passwordConfirm: z.string(),
  name: z.string().min(1).max(100).optional(),
  emailVisibility: z.boolean().optional(),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords don't match",
  path: ['passwordConfirm'],
});

// Update user schema
export const updateUserSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must not exceed 50 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
    .optional(),
  email: z.string().email('Invalid email address').optional(),
  name: z.string().min(1).max(100).optional(),
  emailVisibility: z.boolean().optional(),
  oldPassword: z.string().optional(),
  password: z.string().min(8, 'Password must be at least 8 characters').optional(),
  passwordConfirm: z.string().optional(),
}).refine(
  (data) => {
    if (data.password && data.password !== data.passwordConfirm) {
      return false;
    }
    return true;
  },
  {
    message: "Passwords don't match",
    path: ['passwordConfirm'],
  }
);

// Login schema
export const loginSchema = z.object({
  identity: z.string().min(1, 'Username or email is required'),
  password: z.string().min(1, 'Password is required'),
});

// Query params schema
export const queryParamsSchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  perPage: z.coerce.number().int().positive().max(100).optional().default(20),
  sort: z.string().optional(),
  filter: z.string().optional(),
});

// ID parameter schema
export const idParamSchema = z.object({
  id: z.string().min(1, 'ID is required'),
});

// Email schema
export const emailSchema = z.object({
  email: z.string().email('Invalid email address'),
});

// Password reset schema
export const passwordResetSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  passwordConfirm: z.string(),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords don't match",
  path: ['passwordConfirm'],
});

// Verification token schema
export const verificationTokenSchema = z.object({
  token: z.string().min(1, 'Token is required'),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type QueryParamsInput = z.infer<typeof queryParamsSchema>;
export type IdParamInput = z.infer<typeof idParamSchema>;
export type EmailInput = z.infer<typeof emailSchema>;
export type PasswordResetInput = z.infer<typeof passwordResetSchema>;
export type VerificationTokenInput = z.infer<typeof verificationTokenSchema>;
