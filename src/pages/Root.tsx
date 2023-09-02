import { Outlet } from "react-router-dom";
import ModeContextProvider from "../context/mode-context";
import AuthNavigation from "../components/navigation/AuthNavigation";
import DateContextProvider from "../context/date-context";

function RootLayout() {
  return (
    <DateContextProvider>
      <ModeContextProvider>
        <div className="App">
          <main>
            <AuthNavigation />
            <Outlet />
          </main>
        </div>
      </ModeContextProvider>
    </DateContextProvider>
  );
}

export default RootLayout;
