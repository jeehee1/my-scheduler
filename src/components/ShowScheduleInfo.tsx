import { useState } from "react";
import classes from "./ShowScheduleInfo.module.css";

const ShowScheduleInfo = ({
  info,
}: {
  info: {
    startTime: number;
    endTime: number;
    schedule: string;
    color: string;
  } | null;
}) => {
  const [activeInfo, setActiveInfo] = useState(false);
  if (!info) {
    return null;
  }
  return (
    <div
      className={activeInfo?`${classes.info} ${classes.active}`:classes.info}
      onMouseOver={() => setActiveInfo(true)}
      onMouseLeave={() => setActiveInfo(false)}
    >
      <p className={classes.time}>
        {info.startTime} ~ {info.endTime}
      </p>
      <p className={classes.schedule}>{info.schedule}</p>
    </div>
  );
};

export default ShowScheduleInfo;
