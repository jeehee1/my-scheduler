import classes from "./EditSchedule.module.css";
import { FormEvent, useEffect, useRef, useState } from "react";
import { typeSchedule } from "../types/SchedulerType";

const EditSchedules = ({
  loadedSchedules,
  timeNum,
  addSchedule,
  deleteSchedule,
}: {
  loadedSchedules: typeSchedule[] | null;
  timeNum: number;
  addSchedule: (newSchedule: {
    startTime: string;
    endTime: string;
    color: string;
    schedule: string;
  }) => void;
  deleteSchedule: (scheduleIds: string[]) => void;
}) => {
  // 시간 선택 input을 위한 배열 생성
  const [timeArray, setTimeArray] = useState<{
    timeArr: string[];
    minArr: string[];
  }>({ timeArr: [], minArr: [] });

  useEffect(() => {
    const timeArr = [];
    for (let i = 6; i < 24; i++) {
      timeArr.push(`${i}`);
    }
    const minArr = ["00", "10", "20", "30", "40", "50"];
    setTimeArray({ timeArr: timeArr, minArr: minArr });
  }, []);

  // 클릭시 시간 셋팅
  useEffect(() => {
    const hourStr = `${Math.floor(timeNum / 100)}`;
    const minStr = `${timeNum % 100}`;
    setStartTime({
      time: hourStr,
      min: minStr,
    });
    setEndTime({
      time: hourStr,
      min: minStr,
    });
  }, [timeNum]);

  //시작시간과 종료시간 값 저장
  const [startTime, setStartTime] = useState<{ time: string; min: string }>({
    time: "",
    min: "",
  });
  const [endTime, setEndTime] = useState<{ time: string; min: string }>({
    time: "",
    min: "",
  });
  const [color, setColor] = useState<string>("");
  const scheduleRef = useRef<HTMLInputElement>(null);
  const [updatingAble, setUpdatingAble] = useState<{
    existedSchedules: typeSchedule[] | null;
    isAble: boolean;
  }>({ existedSchedules: null, isAble: true });
  console.log(startTime);
  console.log(endTime);
  console.log(color);
  console.log(scheduleRef.current?.value);

  // form submit할 때 데이터 정리하여 상위 컴포넌트의 스케쥴 업데이트 함수 실행
  const submitNewScheduleHandler = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    console.log("clicked!");

    const startTimeNum =
      parseInt(startTime.time) * 100 +
      parseInt(
        startTime.min.length === 1 ? startTime.min + "0" : startTime.min
      );
    const endTimeNum =
      parseInt(endTime.time) * 100 +
      parseInt(endTime.min.length === 1 ? endTime.min + "0" : endTime.min);
    let duplicatedSchedules = [];

    console.log(startTimeNum);
    console.log(endTimeNum);
    console.log(
      parseInt(
        loadedSchedules![0].startTime.slice(0, 2) +
          loadedSchedules![0].startTime.slice(3, 5)
      )
    );

    // 시간이 중첩되는 경우
    if (loadedSchedules) {
      let i = 0;
      while (i < loadedSchedules!.length) {
        if (
          (parseInt(
            loadedSchedules[i].startTime.slice(0, 2) +
              loadedSchedules[i].startTime.slice(3, 5)
          ) <= startTimeNum &&
            parseInt(
              loadedSchedules[i].endTime.slice(0, 2) +
                loadedSchedules[i].endTime.slice(3, 5)
            ) > startTimeNum) ||
          (parseInt(
            loadedSchedules[i].startTime.slice(0, 2) +
              loadedSchedules[i].startTime.slice(3, 5)
          ) < endTimeNum &&
            parseInt(
              loadedSchedules[i].endTime.slice(0, 2) +
                loadedSchedules[i].endTime.slice(3, 5)
            ) >= endTimeNum) ||
          (parseInt(
            loadedSchedules[i].startTime.slice(0, 2) +
              loadedSchedules[i].startTime.slice(3, 5)
          ) >= startTimeNum &&
            parseInt(
              loadedSchedules[i].endTime.slice(0, 2) +
                loadedSchedules[i].endTime.slice(3, 5)
            ) <= endTimeNum)
        ) {
          duplicatedSchedules.push(loadedSchedules[i]);
        }
        i++;
      }
    }
    console.log(duplicatedSchedules);
    console.log(updatingAble.isAble);
    // 시간이 중첩되면 삭제메시지 표시
    if (duplicatedSchedules.length) {
      setUpdatingAble({ isAble: false, existedSchedules: duplicatedSchedules });
    } else {
      setUpdatingAble({ isAble: true, existedSchedules: null });

      // 중첩이 안될경우 스케쥴 등록 진행
      // 시간 데이터베이스 형식으로 변환
      const newStartTime =
        getTimeFormatted(startTime.time) +
        ":" +
        getTimeFormatted(startTime.min);
      const newEndTime =
        getTimeFormatted(endTime.time) + ":" + getTimeFormatted(endTime.min);

      addSchedule({
        startTime: newStartTime,
        endTime: newEndTime,
        color: color,
        schedule: scheduleRef.current!.value,
      });
    }
  };

  const getTimeFormatted = (time: string) => {
    return time.length === 1 ? "0" + time : time;
  };

  const deleteAndAddSchedule = () => {
    const newStartTime =
      getTimeFormatted(startTime.time) + ":" + getTimeFormatted(startTime.min);
    const newEndTime =
      getTimeFormatted(endTime.time) + ":" + getTimeFormatted(endTime.min);

    const deleteIds = [];
    for (let i = 0; i < updatingAble.existedSchedules!.length; i++) {
      if (updatingAble.existedSchedules) {
        deleteIds.push(updatingAble.existedSchedules[i].id);
      }
    }
    deleteSchedule(deleteIds);
    addSchedule({
      startTime: newStartTime,
      endTime: newEndTime,
      color: color,
      schedule: scheduleRef.current!.value,
    });
  };

  return (
    <div className={classes["edit-form"]}>
      {updatingAble.isAble && (
        <div>
          <button>x</button>
          <form onSubmit={submitNewScheduleHandler}>
            <div className={classes.time}>
              <label htmlFor="start-time">시작 시간</label>
              <select
                value={startTime.time}
                onChange={(e) =>
                  setStartTime({ ...startTime, time: e.target.value })
                }
              >
                {timeArray.timeArr.map((time) => (
                  <option value={time}>{time}</option>
                ))}
              </select>
              <select
                value={startTime.min}
                onChange={(e) =>
                  setStartTime({ ...startTime, min: e.target.value })
                }
              >
                {timeArray.minArr.map((min) => (
                  <option value={min}>{min}</option>
                ))}
              </select>
              <label htmlFor="start-time">종료 시간</label>
              <select
                value={endTime.time}
                onChange={(e) =>
                  setEndTime({ ...startTime, time: e.target.value })
                }
              >
                {timeArray.timeArr.map((time) => (
                  <option value={time}>{time}</option>
                ))}
              </select>
              <select
                value={endTime.min}
                onChange={(e) =>
                  setEndTime({ ...startTime, min: e.target.value })
                }
              >
                {timeArray.minArr.map((min) => (
                  <option value={min}>{min}</option>
                ))}
              </select>
            </div>
            <div className={classes.schedule}>
              <label htmlFor="schedule">어떤 일을 하시겠어요?</label>
              <input type="text" id="schedule" ref={scheduleRef} />
            </div>
            <div className={classes.color}>
              <label htmlFor="color">색상을 선택해주세요.</label>
              <input
                id="color"
                type="color"
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            {updatingAble.isAble && <button>저장!</button>}
          </form>
        </div>
      )}
      {!updatingAble.isAble && (
        <div className={classes.confirm}>
          <p>
            해당 시간에 이미 스케쥴이 존재합니다.
            <br />
            삭제 후 등록할까요?
          </p>
          <ul className={classes["existed-schedules"]}>
            {updatingAble.existedSchedules!.map((schedule) => (
              <li>
                <p
                  className={classes["time-desc"]}
                >{`${schedule.startTime} ~ ${schedule.endTime}`}</p>
                <p className={classes["schedule-desc"]}>{schedule.schedule}</p>
              </li>
            ))}
          </ul>
          <button
            className="normal-btn"
            onClick={() =>
              setUpdatingAble({ isAble: true, existedSchedules: null })
            }
          >
            다시 생각해볼래요.
          </button>
          <form onSubmit={deleteAndAddSchedule}>
            <button className="normal-btn">괜찮아요 등록해주세요.</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditSchedules;
