import classes from "./Goal.module.css";
import Card from "../layout/Card";
import { DUMMY_GOAL } from "../data/DUMMY_DATA";
import Title from "../layout/Title";

const Goal = () => {
  return (
    <>
      <Title>Goal</Title>
      <Card>
        <div className={classes.goal}>
          <span>Today's Goal</span>
          <p>{DUMMY_GOAL.goal}</p>
        </div>
      </Card>
    </>
  );
};

export default Goal;
