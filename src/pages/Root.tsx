import "./App.css";
import SearchDate from "../components/SearchDate";
import ModeContextProvider from "../context/mode-context";
import Scheduler from "./Scheduler";
import AuthNavigation from "../components/navigation/AuthNavigation";

function RootLayout() {
  return (
    <ModeContextProvider>
      <div className="App">
        <main>
          <div>
            <SearchDate />
          </div>
          <Scheduler />
        </main>
      </div>
    </ModeContextProvider>
  );
}

export default RootLayout;
