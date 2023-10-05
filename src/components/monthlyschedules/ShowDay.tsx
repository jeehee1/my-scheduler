import classes from "./ShowDay.module.css";
import { day } from "../../utils/dateInfo";

const ShowDay = () => {

  const displayedDate = [];

  for (let d = 0; d < 7; d++) {
    displayedDate.push(
      <div className={classes.day} key={day[d]}>
        {day[d]}
      </div>
    );
  }

  return <div className={classes.dates}>{displayedDate}</div>;
};

export default ShowDay;