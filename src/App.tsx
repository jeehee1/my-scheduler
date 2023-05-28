import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Todos from "./components/Todos";
import Schedules from "./components/Schedules";
import Diet from "./components/Diet";
import Goal from "./components/Goal";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>This is test page</p>
      </header>
      <main>
        <div className='content'>
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
