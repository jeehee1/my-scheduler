import { monthlySchedule } from "../../types/SchedulerType";
import classes from "./ShowCalendarDetail.module.css";
import { useRef, useState } from "react";

const ShowCalendarDetail = ({
  schedule,
  deleteSchedule,
  updateSchedule,
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
  updateSchedule: (id: string, editedSchedule: monthlySchedule) => void;
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [formMessage, setFormMessage] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const scheduleRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const membersRef = useRef<HTMLInputElement>(null);

  const saveUpdatedScheduleHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (!scheduleRef.current) {
      setFormMessage("스케줄을 입력해주세요");
      return;
    } else if (!locationRef.current) {
      setFormMessage("장소를 입력해주세요");
      return;
    }
    const newSchedule = {
      date: schedule.schedule.date,
      schedule: scheduleRef.current!.value,
      location: locationRef.current!.value,
      members:
        membersRef.current?.value.split(",").map((member) => member.trim()) ||
        [],
    };
    updateSchedule(schedule.schedule.id, newSchedule);
    setIsEditing(false);
  };

  // 스케줄 수정 폼
  const editingComp = (
    <form className={classes['monthly-update-form']}>
      <div>
        <label htmlFor="schedule">스케줄</label>
        <input
          type="text"
          id="schedule"
          ref={scheduleRef}
          defaultValue={schedule.schedule.schedule}
        />
      </div>
      <div>
        <label htmlFor="location">장소</label>
        <input
          type="text"
          id="location"
          ref={locationRef}
          defaultValue={schedule.schedule.location}
        />
      </div>
      <div>
        <label htmlFor="members">멤버</label>
        <input
          type="text"
          id="members"
          ref={membersRef}
          defaultValue={schedule.schedule.members?.join(", ").trim()}
        />
      </div>
      {formMessage && <p>{formMessage}</p>}
      <button
        className={`yellow-btn ${classes["sm-btn"]}`}
        onClick={() => setIsEditing(false)}
      >
        돌아가기
      </button>
      <button
        className={`purple-btn ${classes["sm-btn"]}`}
        onClick={saveUpdatedScheduleHandler}
      >
        저장
      </button>
    </form>
  );

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
          {!isEditing && (
            <>
              <p className={classes.content}>{schedule.schedule.schedule}</p>
              <p className={classes.location}>{schedule.schedule.location}</p>
              <p className={classes.members}>
                {schedule.schedule.members?.map((member) => (
                  <span>{member}</span>
                ))}
              </p>
              <div>
                <button
                  className={`purple-btn ${classes["sm-btn"]}`}
                  onClick={() => setIsEditing(true)}
                >
                  수정
                </button>
                <button
                  className={`yellow-btn ${classes["sm-btn"]}`}
                  onClick={() => {
                    deleteSchedule(schedule.schedule.id);
                  }}
                >
                  삭제
                </button>
              </div>
            </>
          )}
          {isEditing && editingComp}
        </div>
      )}
    </>
  );
};

export default ShowCalendarDetail;
