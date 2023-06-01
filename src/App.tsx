import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Todos from "./components/Todos";
import Schedules from "./components/Schedules";
import Diet from "./components/Diet";
import Goal from "./components/Goal";
import SearchDate from "./components/SearchDate";

function App() {
  return (
    <div className="App">
      <main>
        <div>
          <SearchDate />
        </div>
        <div className="content">
          <div className="first-column">
            <Goal />
            <Schedules />
          </div>
          <div className="second-column">
            <Todos />
            <Diet />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
