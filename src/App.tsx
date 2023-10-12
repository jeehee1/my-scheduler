import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import RootLayout from "./pages/Root";
import Authentication from "./pages/Authentication";
import { action as authAction } from "./pages/Authentication";
import { action as logoutAction } from "./pages/Logout";
import { tokenLoader } from "./utils/auth";
import Scheduler from "./pages/Scheduler";
import ErrorPage from "./pages/Error";
import Calendar from "./pages/Calendar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <Navigate to={"/schedules/daily"} />,
      },
      {
        path: "schedules",
        children: [
          {
            index: true,
            path: "daily",
            element: <Scheduler />,
          },
          {
            path: "monthly",
            element: <Calendar />,
          },
        ],
      },
      {
        path: "auth",
        element: <Authentication />,
        action: authAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
