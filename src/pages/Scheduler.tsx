import classes from "./Scheduler.module.css";
import Diet from "../components/Diet";
import Goal from "../components/Goal";
import Schedules from "../components/Schedules";
import Todos from "../components/Todos";
import { useContext, useState } from "react";
import { ModeContext } from "../context/mode-context";
import { DUMMY_DATA } from "../data/DUMMY_DATA";

const Scheduler = () => {
  const modeCtx = useContext(ModeContext);
  const [storedData, setStoredData] = useState(DUMMY_DATA);

  return (
    <div className={classes.content}>
      <div className={classes["first-column"]}>
        <Goal goal={storedData.goal}/>
        <Schedules schedules={storedData.schedules}/>
      </div>
      <div className={classes["second-column"]}>
        <Todos todos={storedData.todos}/>
        <Diet diet={storedData.diet}/>
        <div>
          <button className={classes["edit-btn"]} onClick={modeCtx.editMode}>
            {modeCtx.mode === "edit" ? "Edit" : "Submit"}
          </button>
          <div className={classes.sign}>{"◀ Click!"}</div>
        </div>
      </div>
    </div>
  );
};

export default Scheduler;
