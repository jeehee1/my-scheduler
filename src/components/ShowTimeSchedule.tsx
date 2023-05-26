//   colorTable should be [{time: 9.4, color: 'yellow', 'content:'something'}, {time:9.5, color: 'yellow', 'content:'something'}]

import { MouseEvent, useState } from "react";
import ShowScheduleInfo from "./ShowScheduleInfo";

const ShowTimeSchedule = ({
  timeInfo,
}: {
  timeInfo: {
    time: number;
    schedule: {
      startTime: number;
      endTime: number;
      schedule: string;
      color: string;
    } | null;
  };
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const showScheduleHandler = (event: MouseEvent) => {
    event.preventDefault();
    setShowInfo(true);
    console.log(event.screenX + window.scrollX, event.screenY + window.scrollY);
  };

  return (
    <>
      <td
        onMouseOver={showScheduleHandler}
        onMouseLeave={() => {
          setShowInfo(false);
        }}
        style={{
          backgroundColor: timeInfo.schedule
            ? timeInfo.schedule.color
            : undefined,
        }}
      >
        {showInfo && <ShowScheduleInfo info={timeInfo.schedule} />}
      </td>
    </>
  );
};

export default ShowTimeSchedule;
