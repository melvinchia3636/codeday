//TODO 888888888888888888888888888888888888888888888888888888888888888888888888
//TODO 南无阿弥陀佛南无阿弥陀佛南无阿弥陀佛南无阿弥陀佛南无阿弥陀佛南无阿弥陀佛88
//TODO                       _oo0oo_                               8南8
//TODO                      o8888888o                              8无8
//TODO                      88" . "88                              8阿8
//TODO                      (| ^_^ |)                              8弥8
//TODO                      0\  =  /0                              8陀8
//TODO                    ___/`---'\___                            8佛8
//TODO                  .' \\|     |// '.                          8南8
//TODO                 / \\|||  :  |||// \                         8无8
//TODO                / _||||| -:- |||||- \                        8阿8
//TODO               |   | \\\  -  /// |   |                       8弥8
//TODO               | \_|  ''\---/''  |_/ |                       8陀8
//TODO               \  .-\__  '-'  ___/-. /                       8佛8
//TODO             ___'. .'  /--.--\  `. .'___                     8南8
//TODO          ."" '<  `.___\_<|>_/___.' >' "".                   8无8
//TODO         | | :  `- \`.;`\ _ /`;.`/ - ` : | |                 8阿8
//TODO         \  \ `-.   \_ __\ /__ _/   .-` /  /                 8弥8
//TODO     =====`-.____`.___ \_____/___.-`___.-'=====              8陀8
//TODO                       `=---='                               8南8
//TODO     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^      8无8
//TODO               佛祖保佑                  永无BUG                8阿8
//TODO               系统稳定      |            天天盈利                8弥8
//TODO                      \    |    /                             8陀8
//TODO                       \   |   /                              8佛8
//TODO                        =======                               8南8
//TODO                      ====上香=====                            8无8
//TODO                        =========                             8阿8
//TODO 南无阿弥陀佛南无阿弥陀佛南无阿弥陀佛南无阿弥陀佛南无阿弥陀佛南无阿弥陀佛88
//TODO 888888888888888888888888888888888888888888888888888888888888888888888888

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
import { MobileBlockScreen } from "./components/MobileBlockScreen";

const router = createBrowserRouter([
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

  {
    element: <GuestLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },

  { path: "*", element: <NotFound /> },
]);

function App() {
  return (
    <AuthProvider>
      <UserProfileProvider>
        <MobileBlockScreen />
        <main className="bg-zinc-950 p-4 flex flex-col h-dvh text-white">
          <RouterProvider router={router} />
        </main>
      </UserProfileProvider>
    </AuthProvider>
  );
}

export default App;
