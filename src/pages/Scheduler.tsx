import classes from "./Scheduler.module.css";
import Diet from "../components/Diet";
import Goal from "../components/Goal";
import Schedules from "../components/Schedules";
import Todos from "../components/Todos";
import { useContext, useEffect, useState } from "react";
import { ModeContext } from "../context/mode-context";
import { DUMMY_DATA } from "../data/DUMMY_DATA";
import EditMessage from "../layout/EditMessage";

const Scheduler = () => {
  const modeCtx = useContext(ModeContext);
  const [storedData, setStoredData] = useState(DUMMY_DATA);

  const updateGoalHandler = (newGoal: string) => {
    setStoredData({ ...storedData, goal: newGoal });
  };

  return (
    <>
      {!modeCtx.editMode && (
        <div className={classes.edit}>
          <button
            className={classes["edit-btn"]}
            onClick={modeCtx.changeEditMode}
          >
            계획을 수정하고 싶어요
          </button>
          <div className={classes.sign}>{"◀ Click!"}</div>
        </div>
      )}
      {modeCtx.editMode && <EditMessage />}
      <div className={classes.content}>
        <div className={classes["first-column"]}>
          <div className={classes["content-chunck"]}>
            <Goal goal={storedData.goal} updateGoal={updateGoalHandler} />
          </div>
          <div className={classes["content-chunck"]}>
            <Schedules schedules={storedData.schedules} />
          </div>
        </div>
        <div className={classes["second-column"]}>
          <div className={classes["content-chunck"]}>
            <Todos todos={storedData.todos} />
          </div>
          <div className={classes["content-chunck"]}>
            <Diet diet={storedData.diet} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Scheduler;
