import { useContext, useState } from "react";
import SearchMonth from "../components/monthlyschedules/SearchMonth";
import { MonthContext } from "../context/month-context";
import ShowCalendar from "../components/monthlyschedules/ShowCalendar";
import UpdateCalendar from "../components/monthlyschedules/UpdateCalendar";

const Calendar = () => {
  const monthCtx = useContext(MonthContext);

  console.log(monthCtx.searchMonth);

  return (
    <>
      <div>
        <SearchMonth />
        <UpdateCalendar />
        <ShowCalendar />
      </div>
    </>
  );
};

export default Calendar;
