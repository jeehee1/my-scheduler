import classes from "./Goal.module.css";
import Card from "../layout/Card";
import { DUMMY_GOAL } from "../data/DUMMY_DATA";

const Goal = () => {
  return (
    <Card>
      <div className={classes.goal}>
        <span>Today's Goal</span>
        <p>{DUMMY_GOAL.goal}</p>
      </div>
    </Card>
  );
};

export default Goal;
