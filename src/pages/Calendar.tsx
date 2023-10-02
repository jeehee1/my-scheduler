import { useContext, useState } from "react";
import SearchMonth from "../components/monthlyschedules/SearchMonth";
import ShowDate from "../components/monthlyschedules/ShowDate";
import { MonthContext } from "../context/month-context";
import ShowCalendar from "../components/monthlyschedules/ShowCalendar";

const Calendar = () => {
  const monthCtx = useContext(MonthContext);

  console.log(monthCtx.searchMonth);

  return (
    <>
      <div>
        <SearchMonth />
        <h3>{monthCtx.searchMonth.year}</h3>
        <h3>{monthCtx.searchMonth.month}</h3>
        <ShowDate />
        <ShowCalendar />
      </div>
    </>
  );
};

export default Calendar;
