//   colorTable should be [{time: 9.4, color: 'yellow', 'content:'something'}, {time:9.5, color: 'yellow', 'content:'something'}]

import { MouseEvent, useContext, useState } from "react";
import ShowScheduleInfo from "./ShowScheduleInfo";
import { ModeContext } from "../../context/mode-context";
import EditSchedules from "./EditSchedule";
import { typeSchedule } from "../../types/SchedulerType";

const ShowTimeSchedule = ({
  timeInfo,
  isEditing,
  startEditing,
  selectedTime,
}: {
  timeInfo: {
    time: number;
    schedule: typeSchedule | null;
  };
  isEditing: boolean;
  startEditing: (clickedTime: number) => void;
  selectedTime: number;
}) => {
  timeInfo.schedule &&console.log(timeInfo)
  const modeCtx = useContext(ModeContext);
  const [showInfo, setShowInfo] = useState(false);
  const showScheduleHandler = (event: MouseEvent) => {
    event.preventDefault();
    setShowInfo(true);
  };
  return (
    <>
      {!isEditing && (
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
          {!modeCtx.editMode && !isEditing && showInfo && (
            <ShowScheduleInfo info={timeInfo.schedule} />
          )}
        </td>
      )}
      {isEditing && (
        <td
          onClick={() => {
            startEditing(selectedTime);
          }}
          style={{
            backgroundColor: timeInfo.schedule
              ? timeInfo.schedule.color
              : undefined,
          }}
        ></td>
      )}
    </>
  );
};

export default ShowTimeSchedule;
