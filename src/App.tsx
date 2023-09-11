import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from "react-router-dom";
import "./App.css";
import RootLayout from "./pages/Root";
import Authentication from "./pages/Authentication";
import { action as authAction } from "./pages/Authentication";
import { action as logoutAction } from "./pages/Logout";
import { tokenLoader } from "./utils/auth";
import ScheduleLayout from "./pages/ScheduleLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <Authentication />,
      },
      {
        path: "schedules",
        element: <ScheduleLayout />,
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
