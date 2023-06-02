import { useState } from "react";
import classes from "./Schedule.module.css";
import ShowScheduleInfo from "./ShowScheduleInfo";
import ShowTimeSchedule from "./ShowTimeSchedule";
import { DUMMY_SCHEDULE } from "../data/DUMMY_DATA";
import Card from "../layout/Card";
import Title from "../layout/Title";

const Schedules = () => {
  const [storedSchedules, setStoredSchedules] = useState(DUMMY_SCHEDULE)
  let tableBody = [];
  const minArray = [0, 10, 20, 30, 40, 50];
  let showMinute = [];
  for (let m = 0; m < 6; m++) {
    showMinute.push(
      <th key={minArray[m]}>
        <div>{minArray[m] + 10}</div>
      </th>
    );
  }
  for (let time = 6; time < 25; time++) {
    tableBody.push(
      <tr key={time}>
        <th key={time} className={classes["time-cell"]}>
          {time}
        </th>
        {minArray.map((min) => (
          <ShowTimeSchedule
            key={time + min / 100}
            timeInfo={{
              time: time + min / 100,
              schedule:
                storedSchedules.schedules.find(
                  (o) =>
                    o.startTime <= time + min / 100 &&
                    o.endTime > time + min / 100
                ) || null,
            }}
          />
        ))}
      </tr>
    );
  }

  return (
    <>
      <Title>Schedules</Title>
      <Card>
        <table className={classes.table}>
          <thead>
            <tr className={classes.min}>
              <th></th>
              {showMinute}
            </tr>
          </thead>
          <tbody className={classes["table-body"]}>{tableBody}</tbody>
        </table>
      </Card>
    </>
  );
};

export default Schedules;
