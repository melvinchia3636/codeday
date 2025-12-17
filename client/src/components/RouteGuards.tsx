import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import {
  YandereLevelProvider,
  useYandereLevel,
} from "../contexts/YandereLevelContext";
import { LucyToastProvider } from "../contexts/LucyToastContext";
import type { ReactNode } from "react";

interface RouteGuardProps {
  children?: ReactNode;
}

/**
 * Wrapper that applies global yandere level 3 effects (shake + red overlay)
 */
function YandereEffectsWrapper({ children }: { children: ReactNode }) {
  const { yandereLevel } = useYandereLevel();
  const isYandereMode = yandereLevel === 3;

  return (
    <div
      className={`relative w-full h-full flex flex-col ${
        isYandereMode ? "animate-shake" : ""
      }`}
    >
      {/* Bloody red overlay for yandere mode */}
      {isYandereMode && (
        <>
          <div className="fixed inset-0 bg-red-900/20 pointer-events-none z-40 animate-pulse" />
          <div className="fixed inset-0 bg-linear-to-b from-red-900/30 via-transparent to-red-900/30 pointer-events-none z-40" />
          {/* Blood drips at top */}
          <div className="fixed top-0 left-0 right-0 h-2 bg-red-600/60 pointer-events-none z-40">
            <div className="absolute top-0 left-1/4 w-4 h-8 bg-red-600/60 rounded-b-full animate-pulse" />
            <div
              className="absolute top-0 left-1/2 w-3 h-6 bg-red-600/50 rounded-b-full animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
            <div
              className="absolute top-0 right-1/4 w-5 h-10 bg-red-600/70 rounded-b-full animate-pulse"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute top-0 right-1/3 w-2 h-5 bg-red-600/40 rounded-b-full animate-pulse"
              style={{ animationDelay: "1.5s" }}
            />
          </div>
          {/* Vignette effect */}
          <div
            className="fixed inset-0 pointer-events-none z-40"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 40%, rgba(127, 29, 29, 0.5) 100%)",
            }}
          />
        </>
      )}
      {children}

      {/* Yandere mode shake animation styles */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          10% { transform: translate(-2px, -1px) rotate(-0.5deg); }
          20% { transform: translate(2px, 1px) rotate(0.5deg); }
          30% { transform: translate(-1px, 2px) rotate(-0.3deg); }
          40% { transform: translate(1px, -1px) rotate(0.3deg); }
          50% { transform: translate(-1px, 1px) rotate(-0.2deg); }
          60% { transform: translate(2px, 0) rotate(0.2deg); }
          70% { transform: translate(-2px, -2px) rotate(-0.4deg); }
          80% { transform: translate(1px, 2px) rotate(0.4deg); }
          90% { transform: translate(-1px, -1px) rotate(-0.1deg); }
        }
        .animate-shake {
          animation: shake 0.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

/**
 * Layout that protects all child routes - requires authentication.
 */
export function ProtectedLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-pink-500 text-lg tracking-widest animate-pulse">
          LOADING_AUTH...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <YandereLevelProvider>
      <LucyToastProvider>
        <YandereEffectsWrapper>
          <Outlet />
        </YandereEffectsWrapper>
      </LucyToastProvider>
    </YandereLevelProvider>
  );
}

/**
 * Layout for auth pages - redirects to dashboard if already logged in.
 */
export function GuestLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-cyan-500 text-lg tracking-widest animate-pulse">
          CHECKING_SESSION...
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    const from = (location.state as { from?: Location })?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
}

/**
 * Wrapper component for individual route protection (if needed).
 */
export function ProtectedRoute({ children }: RouteGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-pink-500 text-lg tracking-widest animate-pulse">
          LOADING_AUTH...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
