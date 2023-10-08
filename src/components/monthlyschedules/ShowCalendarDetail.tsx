import classes from "./ShowCalendarDetail.module.css";
import { useState } from "react";

const ShowCalendarDetail = ({
  schedule,
  deleteSchedule,
}: {
  schedule: {
    calNum: number;
    schedule: {
      id: string;
      date: string;
      schedule: string;
      location: string;
      members: string[];
    };
  };
  deleteSchedule: (id: string) => void;
}) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <>
      <div
        className={classes.schedule}
        onClick={() => {
          setShowDetails(true);
        }}
      >
        {schedule.schedule.schedule}
      </div>
      {/* 스케쥴 디테일 팝업 박스 */}
      {showDetails && (
        <div className={classes.detail}>
          <div className={classes["close-btn"]}>
            <button onClick={() => setShowDetails(false)}>x</button>
          </div>
          <p className={classes.date}>{schedule.schedule.date}</p>
          <p className={classes.content}>{schedule.schedule.schedule}</p>
          <p className={classes.location}>{schedule.schedule.location}</p>
          <p className={classes.members}>
            {schedule.schedule.members?.map((member) => (
              <span>{member}</span>
            ))}
          </p>
          <div>
            <button>수정</button>
            <button
              onClick={() => {
                deleteSchedule(schedule.schedule.id);
              }}
            >
              삭제
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowCalendarDetail;
