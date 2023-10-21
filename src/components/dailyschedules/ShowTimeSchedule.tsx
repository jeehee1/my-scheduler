import { MouseEvent, useContext, useState } from "react";
import ShowScheduleInfo from "./ShowScheduleInfo";
import { ModeContext } from "../../context/mode-context";
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
  const modeCtx = useContext(ModeContext);
  const [showInfo, setShowInfo] = useState(false);
  const showScheduleHandler = (event: MouseEvent) => {
    event.preventDefault();
    setShowInfo(true);
  };
  return (
    <>
      {!isEditing && (
        // 스케줄 정보 표시
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
