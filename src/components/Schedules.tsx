import classes from "./Schedules.module.css";
import ShowTimeSchedule from "./ShowTimeSchedule";
import Card from "../layout/Card";
import Title from "../layout/Title";
import { useContext, useEffect, useState } from "react";
import { ModeContext } from "../context/mode-context";
import { typeSchedule } from "../types/SchedulerType";
import useHttp from "../hooks/use-http";
import EditSchedules from "./EditSchedule";
import { DateContext } from "../context/date-context";

const Schedules = () => {
  const modeCtx = useContext(ModeContext);
  const dateCtx = useContext(DateContext);
  const [editSchedulesMode, setEditSchedulesMode] = useState<boolean>(false);
  const { sendRequest, error, loading, data, extra, identifier } = useHttp();
  let tableBody = [];
  const minArray = [0, 10, 20, 30, 40, 50];
  let showMinute = [];

  // 로드된 스케쥴 저장
  const [loadedSchedules, setLoadedSchedules] = useState<
    typeSchedule[] | null
  >();

  // 스케쥴 업데이트 정보 - 수정중, 등록할 스케쥴과 겹치는 스케쥴, 클릭한 시간, 등록 가능여부
  const [updatingSchedule, setUpdatingSchedule] = useState<{
    editing: boolean;
    time: number;
  }>({ editing: false, time: 0 });

  // 전체 에딧모드가 아니면 에딧 관련 정보 리셋
  useEffect(() => {
    if (!modeCtx.editMode) {
      setEditSchedulesMode(false);
      setUpdatingSchedule({ editing: false, time: 0 });
    }
  }, [modeCtx.editMode]);

  // 페이지 로드 시 저장된 스케쥴 불러오기
  useEffect(() => {
    sendRequest(
      process.env.REACT_APP_DATABASE_URL +
        `/${dateCtx.selectedDate}/schedules.json`,
      "GET",
      null,
      null,
      "GET_SCHEDULES"
    );
  }, [dateCtx.selectedDate]);

  // 케이스에 따른 loadedSchedule 변화 저장
  useEffect(() => {
    switch (identifier) {
      case "GET_SCHEDULES":
        console.log("GET SCHEDULES");
        if (!loading && !error) {
          if (data) {
            let schedulesArray = [];
            for (const key in data) {
              schedulesArray.push({ id: key, ...data[key] });
            }
            setLoadedSchedules(schedulesArray);
          } else {
            setLoadedSchedules(null);
          }
        }
        break;
      case "ADD_SCHEDULE":
        console.log("ADD_SCHEDULE");
        console.log(data, extra);
        if (!loading && data && !error) {
          setLoadedSchedules(
            loadedSchedules
              ? [...loadedSchedules, { id: data.name, ...extra }]
              : [{ id: data.name, ...extra }]
          );
        }
        break;
      case "DELETE_SCHEDULE":
        console.log("DELETE_SCHEDULE");
        console.log(data, extra);
        if (!loading && !error) {
          console.log(loadedSchedules);
          setLoadedSchedules((loadedSchedules) =>
            loadedSchedules?.filter((schedule) => schedule.id !== extra)
          );
        }
        break;
      default:
        break;
    }
  }, [data, identifier, error, loading, extra]);
  console.log(loadedSchedules);

  // 스케쥴 업데이트
  const addScheduleHandler = (newSchedule: {
    startTime: string;
    endTime: string;
    color: string;
    schedule: string;
  }) => {
    console.log("AddSchedule");
    sendRequest(
      process.env.REACT_APP_DATABASE_URL +
        `/${dateCtx.selectedDate}/schedules.json`,
      "POST",
      newSchedule,
      newSchedule,
      "ADD_SCHEDULE"
    );
    setUpdatingSchedule({ editing: false, time: 0 });
  };

  //스케쥴 삭제
  const deleteScheduleHandler = (deletingSchedules: string[]) => {
    if (deletingSchedules) {
      for (let i = 0; i < deletingSchedules.length; i++) {
        sendRequest(
          process.env.REACT_APP_DATABASE_URL +
            `/${dateCtx.selectedDate}/schedules/${deletingSchedules[i]}.json`,
          "DELETE",
          null,
          deletingSchedules[i],
          "DELETE_SCHEDULE"
        );
      }
    }
  };

  // 스케쥴 수정 시작 - 마우스 클릭 시간 셋팅
  const startEditingHandler = (clickedTime: number) =>
    setUpdatingSchedule({
      editing: true,
      time: clickedTime,
    });

  for (let m = 0; m < 6; m++) {
    showMinute.push(
      <th key={minArray[m]}>
        <div>{minArray[m] + 10}</div>
      </th>
    );
  }
  for (let time = 6; time < 25; time++) {
    tableBody.push(
      <tr key={time}>
        <th key={time} className={classes["time-cell"]}>
          {time}
        </th>
        {minArray.map((min) => (
          <ShowTimeSchedule
            key={time * 100 + min}
            selectedTime={time * 100 + min}
            timeInfo={{
              time: time * 100 + min,
              schedule: loadedSchedules
                ? loadedSchedules.find(
                    (schedule) =>
                      parseInt(
                        schedule.startTime.slice(0, 2) +
                          schedule.startTime.slice(3, 5)
                      ) <=
                        time * 100 + min &&
                      parseInt(
                        schedule.endTime.slice(0, 2) +
                          schedule.endTime.slice(3, 5)
                      ) >
                        time * 100 + min
                  ) || null
                : null,
            }}
            isEditing={editSchedulesMode}
            startEditing={startEditingHandler}
          />
        ))}
      </tr>
    );
  }

  return (
    <>
      <Title>Schedules</Title>
      <div onClick={() => modeCtx.editMode && setEditSchedulesMode(true)}>
        <Card>
          {loading && <p>Loading...</p>}
          {!loading && (
            <>
              {editSchedulesMode && <p>표를 클릭해서 시간을 선택해주세요.</p>}
              <table className={classes.table}>
                <thead>
                  <tr className={classes.min}>
                    <th></th>
                    {showMinute}
                  </tr>
                </thead>
                <tbody className={classes["table-body"]}>{tableBody}</tbody>
              </table>
              {editSchedulesMode && updatingSchedule?.editing && (
                <EditSchedules
                  loadedSchedules={loadedSchedules || null}
                  timeNum={updatingSchedule.time}
                  addSchedule={addScheduleHandler}
                  deleteSchedule={deleteScheduleHandler}
                  cancelEdit={() => {
                    setEditSchedulesMode(false);
                    setUpdatingSchedule({ editing: false, time: 0 });
                  }}
                />
              )}
            </>
          )}
        </Card>
      </div>
    </>
  );
};

export default Schedules;
