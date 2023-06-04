import classes from "./Goal.module.css";
import Card from "../layout/Card";
import Title from "../layout/Title";
import { useContext, useEffect, useRef, useState } from "react";
import { ModeContext } from "../context/mode-context";

const Goal = ({
  goal,
  updateGoal,
}: {
  goal: string;
  updateGoal: (newGoal: string) => void;
}) => {
  const modeCtx = useContext(ModeContext);
  const goalRef = useRef<HTMLTextAreaElement>(null);
  const [editGoal, setEditGoal] = useState<boolean>(false);

  const updateGoalHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateGoal(goalRef.current?.value || "");
    setEditGoal(false);
  };

  useEffect(() => {
    if (modeCtx.editMode===false) setEditGoal(false);
  }, [modeCtx.editMode]);

  return (
    <>
      <Title>Goal</Title>
      <div onClick={() => setEditGoal(true)}>
        <Card editting={editGoal}>
          <div className={classes.goal}>
            <span>Today's Goal</span>
            {editGoal ? (
              <form onSubmit={updateGoalHandler}>
                <textarea id="goal" defaultValue={goal} ref={goalRef} />
                <button className={classes["submit-btn"]}>
                  이걸로 정할래요
                </button>
              </form>
            ) : (
              <p>{goal}</p>
            )}
          </div>
        </Card>
      </div>
    </>
  );
};

export default Goal;
