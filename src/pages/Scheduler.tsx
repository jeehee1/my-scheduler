import classes from "./Scheduler.module.css";
import Diet from "../components/Diet";
import Goal from "../components/Goal";
import Schedules from "../components/Schedules";
import Todos from "../components/Todos";
import { useContext, useEffect, useReducer, useState } from "react";
import { ModeContext } from "../context/mode-context";
import { DUMMY_DATA } from "../data/DUMMY_DATA";
import EditMessage from "../layout/EditMessage";

const defaultEditingState = {
  editingTodos: false,
  editingGoal: false,
  editingSchedules: false,
  editingDiet: false,
};

const Scheduler = () => {
  const modeCtx = useContext(ModeContext);
  const [storedData, setStoredData] = useState(DUMMY_DATA);
  const [editing, setEditing] = useState<{
    editingTodos: boolean;
    editingGoal: boolean;
    editingSchedules: boolean;
    editingDiet: boolean;
  }>({
    editingTodos: false,
    editingGoal: false,
    editingSchedules: false,
    editingDiet: false,
  });

  const updateGoalHandler = (newGoal: string) => {
    setStoredData({ ...storedData, goal: newGoal });
  };

  useEffect(() => {}, [modeCtx.editMode]);

  return (
    <>
      <div className={classes.edit}>
        {modeCtx.editMode && (
          <button
            className={`${classes["edit-btn"]} ${classes.cancel}`}
            onClick={modeCtx.changeViewMode}
          >
            이제 됐어요!
          </button>
        )}
        {!modeCtx.editMode && (
          <button
            className={classes["edit-btn"]}
            onClick={modeCtx.changeEditMode}
          >
            계획을 수정하고 싶어요
          </button>
        )}
        {modeCtx.editMode && <EditMessage />}
      </div>
      <div className={classes.content}>
        <div className={classes["column"]}>
          <div className={classes["content-chunck"]}>
            <Goal goal={storedData.goal} updateGoal={updateGoalHandler} />
          </div>
          <div className={classes["content-chunck"]}>
            <Schedules schedules={storedData.schedules} />
          </div>
        </div>
        <div className={classes["column"]}>
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
