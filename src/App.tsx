import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from "react-router-dom";
import "./App.css";
import Scheduler from "./pages/Scheduler";
import RootLayout from "./pages/Root";
import Authentication from "./pages/Authentication";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    children: [
      {
        index: true,
        element: <Authentication />,
      },
      {
        path: "auth",
        element: <Authentication />,
      },
      {
        path: "schedule",
        element: <Scheduler />,
      },
    ],
  },
]);

function App() {
  const authMode = useParams();

  return <RouterProvider router={router} />;
}

export default App;
