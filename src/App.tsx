import "./App.css";
import SearchDate from "./components/SearchDate";
import ModeContextProvider from "./context/mode-context";
import Scheduler from "./pages/Scheduler";

function App() {
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

export default App;
