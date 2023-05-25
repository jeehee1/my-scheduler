import classes from "./Schedule.module.css";
import ShowTimeSchedule from "./ShowTimeSchedule";

const DUMMY_SCHEDULE = {
  date: new Date("2023-05-24"),
  schedules: [
    {
      startTime: 9.4,
      endTime: 12.0,
      schedule: "Study",
      color: "yellow",
    },
    {
      startTime: 12.0,
      endTime: 12.4,
      schedule: "Lunch",
      color: "blue",
    },
    {
      startTime: 13.0,
      endTime: 15.0,
      schedule: "Study",
      color: "yellow",
    },
  ],
};

const Schedules = () => {
  let tableBody = [];
  const minArray = [0, 10, 20, 30, 40, 50];
  let minBody = [];
  for (let m = 0; m < 6; m++) {
    minBody.push(<th><div>{minArray[m] + 10}</div></th>);
  }
  for (let time = 6; time < 25; time++) {
    tableBody.push(
      <tr>
        <th>{time}</th>
        {minArray.map((min) => (
          <ShowTimeSchedule
            timeInfo={{
              time: time + min / 100,
              schedule:
                DUMMY_SCHEDULE.schedules.find(
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
    <div className={classes["time-table"]}>
      <table className={classes.table}>
        <thead>
          <tr className={classes.min}>
            <th></th>
            {minBody}
          </tr>
        </thead>
        <tbody className={classes['table-body']}>{tableBody}</tbody>
      </table>
    </div>
  );
};

export default Schedules;
