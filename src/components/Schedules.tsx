import classes from "./Schedules.module.css";
import ShowTimeSchedule from "./ShowTimeSchedule";
import Card from "../layout/Card";
import Title from "../layout/Title";
import { Schedule } from "../types/SchedulerType";
import EditMessage from "../layout/EditMessage";
import { useState } from "react";

const Schedules = ({ schedules }: { schedules: Schedule[] }) => {
  const [editSchedules, setEditSchedules] = useState<boolean>(false);

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
                schedules?.find(
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
      <div onClick={() => setEditSchedules(true)}>
        <Card editting={editSchedules}>
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
      </div>
    </>
  );
};

export default Schedules;
