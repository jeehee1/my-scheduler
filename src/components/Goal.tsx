import classes from "./Goal.module.css";
import Card from "../layout/Card";
import Title from "../layout/Title";
import { useContext, useRef, useState } from "react";
import { ModeContext } from "../context/mode-context";

const Goal = ({goal}:{goal: string}) => {
  const modeCtx = useContext(ModeContext);
  const todoRef = useRef<HTMLTextAreaElement>(null);

  console.log(modeCtx.mode);

  const updateGoalHandler = () => {};

  return (
    <>
      <Title>Goal</Title>
      <Card>
        <div className={classes.goal}>
          <span>Today's Goal</span>
          {modeCtx.mode === "edit" ? (
            <div>
              <form onSubmit={updateGoalHandler}>
                <textarea ref={todoRef} />
                <button className={classes["submit-btn"]}>Submit</button>
              </form>
            </div>
          ) : (
            <p>{goal}</p>
          )}
        </div>
      </Card>
    </>
  );
};

export default Goal;
