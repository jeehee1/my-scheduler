import classes from "./Goal.module.css";
import Card from "../layout/Card";
import Title from "../layout/Title";
import { useContext, useEffect, useRef, useState } from "react";
import { ModeContext } from "../context/mode-context";
import { typeGoal } from "../types/SchedulerType";

const Goal = ({ goal }: { goal: string }) => {
  const modeCtx = useContext(ModeContext);
  const goalRef = useRef<HTMLTextAreaElement>(null);
  const [loadedGoal, setLoadedGoal] = useState<typeGoal>({ id: "", goal: "" });
  const [editGoalMode, setEditGoalMode] = useState<boolean>(false);

  const fetchGoal = async () => {
    const response = await fetch(
      "https://my-scheduler-9a484-default-rtdb.firebaseio.com/my-scheduler/2023-06-05/goal.json"
    );
    const data = await response.json();
    let goalObj = { id: "", goal: "" };
    for (let key in data) {
      goalObj = {
        id: key,
        goal: data[key],
      };
    }
    setLoadedGoal(goalObj);
    console.log("fetched goal:");
    console.log(data);
    return data;
  };

  useEffect(() => {
    const fetchedGoal = fetchGoal();
  }, []);

  const updateGoalHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch(
      "https://my-scheduler-9a484-default-rtdb.firebaseio.com/my-scheduler/2023-06-05/goal.json",
      {
        method: "POST",
        body: JSON.stringify(goalRef.current?.value),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();

    setLoadedGoal({
      ...loadedGoal,
      goal: `${goalRef.current?.value}`,
    });
    setEditGoalMode(false);
  };

  return (
    <>
      <Title>Goal</Title>
      <div onClick={() => setEditGoalMode(true)}>
        <Card>
          <div className={classes.goal}>
            <span>Today's Goal</span>
            {modeCtx.editMode && editGoalMode ? (
              <form onSubmit={updateGoalHandler}>
                <textarea
                  id="goal"
                  defaultValue={loadedGoal.goal}
                  ref={goalRef}
                />
                <button className={classes['submit-btn']}>저장!</button>
              </form>
            ) : (
              <p>{loadedGoal.goal}</p>
            )}
          </div>
        </Card>
      </div>
    </>
  );
};

export default Goal;
