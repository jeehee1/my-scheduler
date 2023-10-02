import { DUMMY_MONTHLY_DATA } from "../../data/DUMMY_MONTHLY_DATA";
import classes from "./ShowDate.module.css";

const date = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

const ShowDate = () => {
  const monthlySchedules = DUMMY_MONTHLY_DATA;

  const displayedDate = [];

  

  for (let d = 0; d < 7; d++) {
    displayedDate.push(
      <div className={classes.date} key={date[d]}>
        {date[d]}
      </div>
    );
  }

  return <div>{displayedDate}</div>;
};

export default ShowDate;
