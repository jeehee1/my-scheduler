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
            {`${info.startTime} ~ ${info.endTime}`}
          </p>
          <p className={classes.schedule}>{info.schedule}</p>
        </div>
      )}
    </>
  );
};

export default ShowScheduleInfo;
