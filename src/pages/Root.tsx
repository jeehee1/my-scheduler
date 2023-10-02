import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import ModeContextProvider from "../context/mode-context";
import AuthNavigation from "../components/navigation/AuthNavigation";
import DateContextProvider from "../context/date-context";
import { useEffect } from "react";
import { getTokenDuration } from "../utils/auth";
import TypeNavigation from "../components/navigation/TypeNavigation";
import MonthContextProvider from "../context/month-context";

function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();
  useEffect(() => {
    if (!token) {
      return;
    }
    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "POST" });
    }
    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      submit(null, { action: "/logout", method: "POST" });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <MonthContextProvider>
      <DateContextProvider>
        <ModeContextProvider>
          <div className="App">
            <main>
              <AuthNavigation />
              <TypeNavigation />
              <Outlet />
            </main>
          </div>
        </ModeContextProvider>
      </DateContextProvider>
    </MonthContextProvider>
  );
}

export default RootLayout;
