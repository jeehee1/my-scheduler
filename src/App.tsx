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
import Scheduler from "./pages/Scheduler";
import ErrorPage from "./pages/Error";

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
        element: <Authentication />,
      },
      {
        path: "schedules",
        children: [
          {
            path: "daily",
            element: <Scheduler />,
          },
          {
            path: "monthly",
            element: <p>월별 스케쥴 입니다.</p>,
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
