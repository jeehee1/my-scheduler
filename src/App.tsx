import "./App.css";
import SearchDate from "./components/SearchDate";
import Scheduler from "./pages/Scheduler";

function App() {
  return (
    <div className="App">
      <main>
        <div>
          <SearchDate />
        </div>
        <Scheduler />
      </main>
    </div>
  );
}

export default App;
