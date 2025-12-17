import { Dashboard } from "./pages/Dashboard";
import { NotFound } from "./pages/NotFound";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Profile } from "./pages/Profile";
import { Workouts } from "./pages/Workouts";
import { Nutrition } from "./pages/Nutrition";
import { Hydration } from "./pages/Hydration";
import { Activity } from "./pages/Activity";
import { Chat } from "./pages/Chat";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { AuthProvider } from "./contexts/AuthContext";
import { UserProfileProvider } from "./contexts/UserProfileContext";
import { ProtectedLayout, GuestLayout } from "./components/RouteGuards";

const router = createBrowserRouter([
  // Protected routes - require authentication
  {
    element: <ProtectedLayout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/profile", element: <Profile /> },
      { path: "/workouts", element: <Workouts /> },
      { path: "/nutrition", element: <Nutrition /> },
      { path: "/hydration", element: <Hydration /> },
      { path: "/activity", element: <Activity /> },
      { path: "/chat", element: <Chat /> },
    ],
  },
  // Guest routes - redirect if already logged in
  {
    element: <GuestLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
  // Public routes
  { path: "*", element: <NotFound /> },
]);

function App() {
  return (
    <AuthProvider>
      <UserProfileProvider>
        <main className="bg-zinc-950 p-4 flex flex-col h-dvh text-white">
          <RouterProvider router={router} />
        </main>
      </UserProfileProvider>
    </AuthProvider>
  );
}

export default App;
