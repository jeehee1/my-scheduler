import classes from "./Schedules.module.css";
import ShowTimeSchedule from "./ShowTimeSchedule";
import Card from "../../layout/Card";
import Title from "../../layout/Title";
import { useCallback, useContext, useEffect, useState } from "react";
import { ModeContext } from "../../context/mode-context";
import { typeSchedule } from "../../types/SchedulerType";
import useHttp from "../../hooks/use-http";
import EditSchedules from "./EditSchedule";
import { DateContext } from "../../context/date-context";
import Spinner from "../../layout/Spinner";

const minArray = [0, 10, 20, 30, 40, 50];

const Schedules = ({ user }: { user: string }) => {
  const modeCtx = useContext(ModeContext);
  const dateCtx = useContext(DateContext);
  const [editSchedulesMode, setEditSchedulesMode] = useState<boolean>(false);
  const [tableBody, setTableBody] = useState<JSX.Element[]>([]);
  const {
    sendRequest,
    sendMultipleRequest,
    error,
    loading,
    data,
    extra,
    identifier,
  } = useHttp();

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
        `/my-scheduler/${user}/${dateCtx.selectedDate}/schedules.json`,
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
        if (!loading && !error && data) {
          setLoadedSchedules(
            loadedSchedules
              ? [...loadedSchedules, { id: data.name, ...extra }]
              : [{ id: data.name, ...extra }]
          );
        }
        break;
      case "DELETE_SCHEDULE":
        console.log("DELETE_SCHEDULE");
        if (!loading && !error && data && extra) {
          setLoadedSchedules((loadedSchedules) =>
            loadedSchedules!.filter((schedule) => schedule.id !== extra)
          );
        }
        break;
      case "MANIPULATE_SCHEDULE":
        // 데이터를 삭제하고 업데이트 하는 경우
        if (!loading && !error && data && extra.deleteIds) {
          const updatedSchedules =
            loadedSchedules?.filter(
              (schedule) => !extra.deleteIds.includes(schedule.id)
            ) || [];
          updatedSchedules.push({
            ...extra.newSchedule,
            id: data[data.length - 1].name,
          });
          setLoadedSchedules(updatedSchedules);
          // 데이터를 업데이트만 하는 경우
        } else if (!loading && !error && !extra.deleteIds) {
          loadedSchedules
            ? setLoadedSchedules([
                ...loadedSchedules,
                { ...extra.newSchedule, id: data[0].name },
              ])
            : setLoadedSchedules([{ ...extra.newSchedule, id: data[0].name }]);
        }
        break;
      default:
        break;
    }
  }, [data, identifier, error, loading, extra]);
  console.log(loadedSchedules);

  // 업데이트 스케줄 - 겹치는 시간의 스케줄은 삭제 처리
  const manipulateScheduleHandler = useCallback(
    (
      deleteIds: string[] | null,
      newSchedule: {
        startTime: string;
        endTime: string;
        color: string;
        schedule: string;
      }
    ) => {
      const updatingData = [];
      if (deleteIds) {
        for (const deleteId of deleteIds) {
          updatingData.push({
            url:
              process.env.REACT_APP_DATABASE_URL +
              `/my-scheduler/${user}/${dateCtx.selectedDate}/schedules/${deleteId}.json`,
            body: deleteId,
            method: "DELETE",
          });
        }
      }
      updatingData.push({
        url:
          process.env.REACT_APP_DATABASE_URL +
          `/my-scheduler/${user}/${dateCtx.selectedDate}/schedules.json`,
        body: newSchedule,
        method: "POST",
      });
      sendMultipleRequest(
        updatingData,
        { deleteIds: deleteIds, newSchedule: newSchedule },
        "MANIPULATE_SCHEDULE"
      );
    },
    [
      sendRequest,
      sendMultipleRequest,
      user,
      dateCtx.selectedDate,
      process.env.REACT_APP_DATABASE_URL,
    ]
  );

  // 스케쥴 수정 시작 - 마우스 클릭 시간 셋팅
  const startEditingHandler = useCallback(
    (clickedTime: number) =>
      setUpdatingSchedule({
        editing: true,
        time: clickedTime,
      }),
    [setUpdatingSchedule]
  );

  // 분을 JSX Element 배열로 생성
  const showMinute: JSX.Element[] = [];
  useEffect(() => {
    for (let m = 0; m < 6; m++) {
      showMinute.push(
        <th key={minArray[m]}>
          <div>{minArray[m] + 10}</div>
        </th>
      );
    }
  }, []);

  // JSX Element 배열 tableBody로 스케줄 테이블 Layout 생성
  useEffect(() => {
    const ScheduleTable: JSX.Element[] = [];
    for (let time = 6; time < 25; time++) {
      ScheduleTable.push(
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
    setTableBody(ScheduleTable);
  }, [loadedSchedules, editSchedulesMode, startEditingHandler]);

  return (
    <>
      <Title>Schedules</Title>
      <div onClick={() => modeCtx.editMode && setEditSchedulesMode(true)}>
        <Card editting={editSchedulesMode}>
          {loading && !error && <Spinner />}
          {!loading && !error && (
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
              {/* 스케줄 수정 모드 */}
              {editSchedulesMode && updatingSchedule?.editing && (
                <EditSchedules
                  loadedSchedules={loadedSchedules || null}
                  timeNum={updatingSchedule.time}
                  manipulateSchedule={manipulateScheduleHandler}
                  cancelEdit={() => {
                    setUpdatingSchedule({ editing: false, time: 0 });
                  }}
                />
              )}
            </>
          )}
          {error && <p>데이터를 불러올 수 없습니다</p>}
        </Card>
      </div>
    </>
  );
};

export default Schedules;
