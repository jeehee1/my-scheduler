import { useState } from "react";
import classes from "./ShowScheduleInfo.module.css";
import { typeSchedule } from "../types/SchedulerType";

const ShowScheduleInfo = ({ info }: { info: typeSchedule | null }) => {
  const [activeInfo, setActiveInfo] = useState(false);

  return (
    <>
      {info && (
        <div
          className={
            activeInfo ? `${classes.info} ${classes.active}` : classes.info
          }
          onMouseOver={() => setActiveInfo(true)}
          onMouseLeave={() => setActiveInfo(false)}
        >
          <p className={classes.time}>
            {`${info.startTime.substring(0, 2)}:${info.startTime.substring(
              2,
              4
            )} ~ ${info.endTime.substring(0, 2)}:${info.endTime.substring(
              2,
              4
            )}`}
          </p>
          <p className={classes.schedule}>{info.schedule}</p>
        </div>
      )}
    </>
  );
};

export default ShowScheduleInfo;
