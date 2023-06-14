import "./App.css";
import SearchDate from "./components/SearchDate";
import DateContextProvider from "./context/date-context";
import ModeContextProvider from "./context/mode-context";
import Scheduler from "./pages/Scheduler";

function App() {
  return (
    <DateContextProvider>
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
    </DateContextProvider>
  );
}

export default App;
