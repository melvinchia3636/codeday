import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import {
  auth,
  type User,
  type LoginCredentials,
  type SignupData,
  type AuthData,
  ApiClientError,
} from "../lib/auth";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<AuthData>;
  loginSilent: (credentials: LoginCredentials) => Promise<AuthData>;
  applyAuthData: (authData: AuthData) => void;
  signup: (data: SignupData) => Promise<User>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load auth state from localStorage on mount
  useEffect(() => {
    const storedUser = auth.getUser();
    const storedToken = auth.getToken();

    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }

    setIsLoading(false);
  }, []);

  const login = useCallback(
    async (credentials: LoginCredentials): Promise<AuthData> => {
      setError(null);
      setIsLoading(true);

      try {
        const authData = await auth.login(credentials);
        setUser(authData.user);
        setToken(authData.token);
        return authData;
      } catch (err) {
        const message =
          err instanceof ApiClientError
            ? err.message
            : "Login failed. Please try again.";
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Login without updating state - for deferred state update after animation
  const loginSilent = useCallback(
    async (credentials: LoginCredentials): Promise<AuthData> => {
      setError(null);

      try {
        const authData = await auth.login(credentials);
        // Don't update state - caller will do it later
        return authData;
      } catch (err) {
        const message =
          err instanceof ApiClientError
            ? err.message
            : "Login failed. Please try again.";
        setError(message);
        throw err;
      }
    },
    []
  );

  // Apply auth data to state (after loading animation completes)
  const applyAuthData = useCallback((authData: AuthData) => {
    setUser(authData.user);
    setToken(authData.token);
  }, []);

  const signup = useCallback(async (data: SignupData): Promise<User> => {
    setError(null);
    // Note: Don't set isLoading here as it interferes with GuestLayout

    try {
      const newUser = await auth.signup(data);
      return newUser;
    } catch (err) {
      const message =
        err instanceof ApiClientError
          ? err.message
          : "Signup failed. Please try again.";
      setError(message);
      throw err;
    }
  }, []);

  const logout = useCallback(() => {
    auth.logout();
    setUser(null);
    setToken(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
    error,
    login,
    loginSilent,
    applyAuthData,
    signup,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
