import { useContext, useEffect, useState } from "react";
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
        members: [string];
      }[] = [];
      for (const key in data) {
        transformedSchedules.push({ id: key, ...data[key] });
      }
      setLoadedSchedules(transformedSchedules);
    }
  }, [data, identifier]);

  const updateMonthlyScheduleHandler = (
    id: string,
    schedule: monthlySchedule
  ) => {
    setLoadedSchedules([...loadedSchedules, { id: id, ...schedule }]);
  };

  return (
    <>
      <div>
        <SearchMonth />
        <UpdateCalendar updateSchedules = {updateMonthlyScheduleHandler}/>
        {loadedSchedules.length > 0 && <ShowCalendar schedules={loadedSchedules} />}
      </div>
    </>
  );
};

export default Calendar;
