//   colorTable should be [{time: 9.4, color: 'yellow', 'content:'something'}, {time:9.5, color: 'yellow', 'content:'something'}]

import { MouseEvent, useContext, useState } from "react";
import ShowScheduleInfo from "./ShowScheduleInfo";
import { ModeContext } from "../context/mode-context";
import EditSchedules from "./EditSchedule";
import { typeSchedule } from "../types/SchedulerType";

const ShowTimeSchedule = ({
  key,
  timeInfo,
  isEditing,
}: {
  key: number;
  timeInfo: {
    time: number;
    schedule: typeSchedule| null;
  };
  isEditing: boolean;
}) => {
  const modeCtx = useContext(ModeContext);
  const [showInfo, setShowInfo] = useState(false);
  const showScheduleHandler = (event: MouseEvent) => {
    event.preventDefault();
    setShowInfo(true);
  };
  console.log(timeInfo)
  const [showEdit, setShowEdit] = useState(false);
  const updateSchedulesHandler = (i: number) => {};
  // console.log(timeInfo);
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
          {!modeCtx.editMode && showInfo && (
            <ShowScheduleInfo info={timeInfo.schedule} />
          )}
        </td>
      )}
      {isEditing && (
        <td
          onClick={() => setShowEdit(true)}
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
          {/* {modeCtx.editMode && showInfo && (
          <EditSchedules />
        )} */}
        </td>
      )}
    </>
  );
};

export default ShowTimeSchedule;
