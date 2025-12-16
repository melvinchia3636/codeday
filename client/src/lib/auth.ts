import { api, ApiClientError } from "./api";

export interface User {
  id: string;
  username: string;
  email: string;
  name?: string;
  avatar?: string;
  created: string;
  updated: string;
}

export interface AuthData {
  token: string;
  user: User;
}

export interface SignupData {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface LoginCredentials {
  identity: string; // username or email
  password: string;
}

const AUTH_TOKEN_KEY = "auth_token";
const AUTH_USER_KEY = "auth_user";

export const auth = {
  /**
   * Login with username/email and password
   */
  async login(credentials: LoginCredentials): Promise<AuthData> {
    const response = await api.post<AuthData>("/users/auth/login", credentials);

    // Store auth data
    localStorage.setItem(AUTH_TOKEN_KEY, response.data.token);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(response.data.user));

    return response.data;
  },

  /**
   * Create a new user account
   */
  async signup(data: SignupData): Promise<User> {
    const response = await api.post<User>("/users", data);
    return response.data;
  },

  /**
   * Logout - clear stored auth data
   */
  logout(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
  },

  /**
   * Get stored token
   */
  getToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },

  /**
   * Get stored user
   */
  getUser(): User | null {
    const userJson = localStorage.getItem(AUTH_USER_KEY);
    if (!userJson) return null;
    try {
      return JSON.parse(userJson);
    } catch {
      return null;
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};

export { ApiClientError };
