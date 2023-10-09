import { useCallback, useContext, useEffect, useState } from "react";
import SearchMonth from "../components/monthlyschedules/SearchMonth";
import { MonthContext } from "../context/month-context";
import ShowCalendar from "../components/monthlyschedules/ShowCalendar";
import UpdateCalendar from "../components/monthlyschedules/UpdateCalendar";
import useHttp from "../hooks/use-http";
import { monthlySchedule } from "../types/SchedulerType";

const Calendar = () => {
  const monthCtx = useContext(MonthContext);
  const [loadedSchedules, setLoadedSchedules] = useState<
    {
      id: string;
      date: string;
      schedule: string;
      location: string;
      members: string[];
    }[]
  >([]);
  const { loading, error, sendRequest, data, identifier, extra } = useHttp();
  console.log(monthCtx.searchMonth);

  useEffect(() => {
    sendRequest(
      process.env.REACT_APP_DATABASE_URL +
        `/monthly/${monthCtx.searchMonth.year}-${
          monthCtx.searchMonth.month < 10
            ? "0" + monthCtx.searchMonth.month
            : monthCtx.searchMonth.month
        }.json`,
      "GET",
      null,
      null,
      "GET_MONTHLY_SCHEDULES"
    );
  }, [monthCtx.searchMonth]);

  useEffect(() => {
    if (identifier === "GET_MONTHLY_SCHEDULES") {
      const transformedSchedules: {
        id: string;
        date: string;
        schedule: string;
        location: string;
        members: string[];
      }[] = [];
      for (const key in data) {
        transformedSchedules.push({ id: key, ...data[key] });
      }
      setLoadedSchedules(transformedSchedules);
    }
    if (identifier === "DELETE_MONTHLY_SCHEDULE") {
      setLoadedSchedules(
        loadedSchedules.filter((schedule) => schedule.id !== extra)
      );
    }
    if (identifier === "UPDATE_MONTHLY_SCHEDULE") {
      const existedSchedules = loadedSchedules.filter(
        (schedule) => schedule.id !== extra.id
      );
      const updatedSchedule = { id: extra.id, ...extra.editedSchedule };
      setLoadedSchedules([...existedSchedules, updatedSchedule]);
    }
  }, [data, identifier, extra]);
  console.log(loadedSchedules);

  const updateMonthlyScheduleHandler = (
    id: string,
    schedule: monthlySchedule
  ) => {
    setLoadedSchedules([
      ...loadedSchedules,
      { id: extra.id, ...extra.editedSchedule },
    ]);
  };

  // 스케쥴 삭제 핸들러
  const deleteMonthlyScheduleHandler = useCallback(
    (id: string) => {
      sendRequest(
        process.env.REACT_APP_DATABASE_URL +
          `/monthly/${monthCtx.searchMonth.year}-${
            monthCtx.searchMonth.month < 10
              ? "0" + monthCtx.searchMonth.month
              : monthCtx.searchMonth.month
          }/${id}.json`,
        "DELETE",
        null,
        id,
        "DELETE_MONTHLY_SCHEDULE"
      );
    },
    [sendRequest, process.env.REACT_APP_DATABASE_URL, monthCtx.searchMonth]
  );

  // 기존 스케줄 수정 함수
  const updateScheduleHandler = useCallback(
    (id: string, editedSchedule: monthlySchedule) => {
      console.log(id);
      console.log(editedSchedule);
      sendRequest(
        process.env.REACT_APP_DATABASE_URL +
          `/monthly/${monthCtx.searchMonth.year}-${
            monthCtx.searchMonth.month < 10
              ? "0" + monthCtx.searchMonth.month
              : monthCtx.searchMonth.month
          }/${id}.json`,
        "PATCH",
        editedSchedule,
        { id: id, editedSchedule: editedSchedule },
        "UPDATE_MONTHLY_SCHEDULE"
      );
    },
    [sendRequest, process.env.REACT_APP_DATABASE_URL, monthCtx.searchMonth]
  );

  return (
    <>
      <div>
        <SearchMonth />
        <UpdateCalendar updateSchedules={updateMonthlyScheduleHandler} />
        {loadedSchedules.length > 0 && (
          <ShowCalendar
            schedules={loadedSchedules}
            deleteSchedule={deleteMonthlyScheduleHandler}
            updateSchedule={updateScheduleHandler}
          />
        )}
      </div>
    </>
  );
};

export default Calendar;
