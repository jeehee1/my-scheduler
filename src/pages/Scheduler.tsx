import classes from "./Scheduler.module.css";
import Diet from "../components/dailyschedules/Diet";
import Goal from "../components/dailyschedules/Goal";
import Schedules from "../components/dailyschedules/Schedules";
import { useContext } from "react";
import { ModeContext } from "../context/mode-context";
import EditMessage from "../layout/EditMessage";
import Todos from "../components/dailyschedules/Todos";
import SearchDate from "../components/dailyschedules/SearchDate";
import { useRouteLoaderData } from "react-router-dom";

const defaultEditingState = {
  editingTodos: false,
  editingGoal: false,
  editingSchedules: false,
  editingDiet: false,
};

const Scheduler = () => {
  const modeCtx = useContext(ModeContext);
  const userToken = useRouteLoaderData("root") || "";
  const validToken = userToken.toString();

  return (
    <>
      <SearchDate />
      {modeCtx.editMode && (
        <button
          className={`${classes["edit-btn"]} ${classes.cancel}`}
          onClick={modeCtx.changeViewMode}
        >
          이렇게 저장할래요!
        </button>
      )}
      <div className={classes.edit}>
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
            <Goal user={validToken} />
          </div>
          <div className={classes["content-chunck"]}>
            <Schedules user={validToken} />
          </div>
        </div>
        <div className={classes["column"]}>
          <div className={classes["content-chunck"]}>
            <Todos user={validToken} />
          </div>
          <div className={classes["content-chunck"]}>
            <Diet user={validToken} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Scheduler;
