import classes from "./Goal.module.css";
import Card from "../layout/Card";
import Title from "../layout/Title";
import { useContext, useEffect, useRef, useState } from "react";
import { ModeContext } from "../context/mode-context";
import { typeGoal } from "../types/SchedulerType";
import useHttp from "../hooks/use-http";
import { DateContext } from "../context/date-context";
import EditGoal from "./EditGoal";

const Goal = () => {
  const modeCtx = useContext(ModeContext);
  const dateCtx = useContext(DateContext);
  const { sendRequest, identifier, loading, error, data, extra } = useHttp();
  const [loadedGoal, setLoadedGoal] = useState<typeGoal | null>();
  const [editGoalMode, setEditGoalMode] = useState<boolean>(false);

  useEffect(() => {
    if (!modeCtx.editMode) {
      setEditGoalMode(false);
    }
  }, [modeCtx.editMode]);

  useEffect(() => {
    sendRequest(
      process.env.REACT_APP_DATABASE_URL + `/${dateCtx.selectedDate}/goal.json`,
      "GET",
      null,
      null,
      "GET_GOAL"
    );
  }, [sendRequest, dateCtx.selectedDate]);

  useEffect(() => {
    switch (identifier) {
      case "GET_GOAL":
        if (!loading && !error) {
          setLoadedGoal(
            data
              ? {
                  id: Object.keys(data)[0],
                  goal: data[Object.keys(data)[0]],
                }
              : null
          );
        }
        break;
      case "SAVE_GOAL":
        if (data && !loading && !error) {
          setLoadedGoal({
            id: loadedGoal ? loadedGoal.id : data.name,
            goal: extra,
          });
          setEditGoalMode(false);
        }
        break;
      default:
        break;
    }
  }, [loading, identifier, data, extra, error]);

  const updateGoalHandler = (newGoal: string) => {
    console.log("edit goal");
    sendRequest(
      loadedGoal
        ? process.env.REACT_APP_DATABASE_URL +
            `/${dateCtx.selectedDate}/goal/${loadedGoal.id}.json`
        : process.env.REACT_APP_DATABASE_URL +
            `/${dateCtx.selectedDate}/goal.json`,
      loadedGoal ? "PUT" : "POST",
      newGoal,
      newGoal,
      "SAVE_GOAL"
    );
  };

  return (
    <>
      <Title>Goal</Title>

      <div onClick={() => modeCtx.editMode && setEditGoalMode(true)}>
        <Card editting={editGoalMode}>
          {!loading && (
            <div className={classes.goal}>
              <span>Today's Goal</span>
              {editGoalMode && (
                <EditGoal
                  goal={loadedGoal?.goal || null}
                  updateGoal={updateGoalHandler}
                />
              )}
              {!editGoalMode && (
                <p>
                  {loadedGoal
                    ? loadedGoal.goal
                    : "아직 저장된 목표가 없습니다."}
                </p>
              )}
            </div>
          )}
          {loading && <p>Loading...</p>}
        </Card>
      </div>
      {editGoalMode && (
        <button
          className="normal-btn cancel-btn"
          onClick={() => setEditGoalMode(false)}
        >
          돌아가기
        </button>
      )}
    </>
  );
};

export default Goal;
