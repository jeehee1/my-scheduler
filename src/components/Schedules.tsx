import classes from "./Schedules.module.css";
import ShowTimeSchedule from "./ShowTimeSchedule";
import Card from "../layout/Card";
import Title from "../layout/Title";
import { useContext, useEffect, useState } from "react";
import { ModeContext } from "../context/mode-context";
import { typeSchedule } from "../types/SchedulerType";
import useHttp from "../hooks/use-http";

const Schedules = () => {
  const modeCtx = useContext(ModeContext);
  const { sendRequest, error, loading, data, extra, identifier } = useHttp();
  const [editSchedulesMode, setEditSchedulesMode] = useState<boolean>(false);
  let tableBody = [];
  const minArray = [0, 10, 20, 30, 40, 50];
  let showMinute = [];

  const [loadedSchedules, setLoadedSchedules] = useState<typeSchedule[]>();

  useEffect(() => {
    sendRequest(
      process.env.REACT_APP_DATABASE_URL + "/2023-06-05/schedules.json",
      "GET",
      null,
      null,
      "GET_SCHEDULES"
    );
  }, []);

  useEffect(() => {
    switch (identifier) {
      case "GET_SCHEDULES":
        console.log("GET SCHEDULES");
        if (!loading && data && !error) {
          let schedulesArray = [];
          for (const key in data) {
            schedulesArray.push({ id: key, ...data[key] });
          }
          setLoadedSchedules(schedulesArray);
        }
        break;

      default:
        break;
    }
  }, [data, identifier, error, loading, extra]);
  console.log(loadedSchedules)
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
            key={time * 100 + min}
            timeInfo={{
              time: time * 100 + min,
              schedule:
                loadedSchedules?.find(
                  (schedule) =>
                    parseInt(schedule.startTime) <= time * 100 + min &&
                    parseInt(schedule.endTime) > time * 100 + min
                ) || null,
            }}
            isEditing={false}
          />
        ))}
      </tr>
    );
  }

  // for (let time = 6; time < 25; time++) {
  //   tableBody.push(
  //     <tr key={time}>
  //       <th key={time} className={classes["time-cell"]}>
  //         {time}
  //       </th>
  //       {minArray.map((min) => (
  //         <ShowTimeSchedule
  //           key={time + min / 100}
  //           timeInfo={{
  //             time: time + min / 100,
  //             schedule: null,
  //             // schedules?.find(
  //             //   (o) =>
  //             //     o.startTime <= time + min / 100 &&
  //             //     o.endTime > time + min / 100
  //             // ) || null,
  //           }}
  //           isEditing={editSchedulesMode}
  //         />
  //       ))}
  //     </tr>
  //   );
  // }

  return (
    <>
      <Title>Schedules</Title>
      <div onClick={() => modeCtx.editMode && setEditSchedulesMode(true)}>
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
      </div>
    </>
  );
};

export default Schedules;
