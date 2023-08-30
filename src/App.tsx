import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from "react-router-dom";
import "./App.css";
import SearchDate from "./components/SearchDate";
import AuthNavigation from "./components/navigation/AuthNavigation";
import DateContextProvider from "./context/date-context";
import ModeContextProvider from "./context/mode-context";
import Scheduler from "./pages/Scheduler";
import RootLayout from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    children: [
      {
        index: true,
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
