import { Dashboard } from "./pages/Dashboard";
import { NotFound } from "./pages/NotFound";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Profile } from "./pages/Profile";
import { Workouts } from "./pages/Workouts";
import { Nutrition } from "./pages/Nutrition";
import { Hydration } from "./pages/Hydration";
import { Activity } from "./pages/Activity";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/workouts",
    element: <Workouts />,
  },
  {
    path: "/nutrition",
    element: <Nutrition />,
  },
  {
    path: "/hydration",
    element: <Hydration />,
  },
  {
    path: "/activity",
    element: <Activity />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <main className="bg-zinc-950 p-4 flex flex-col min-h-dvh text-white">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
