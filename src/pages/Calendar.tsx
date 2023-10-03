import { useContext, useState } from "react";
import SearchMonth from "../components/monthlyschedules/SearchMonth";
import { MonthContext } from "../context/month-context";
import ShowCalendar from "../components/monthlyschedules/ShowCalendar";

const Calendar = () => {
  const monthCtx = useContext(MonthContext);

  console.log(monthCtx.searchMonth);

  return (
    <>
      <div>
        <SearchMonth />
        <ShowCalendar />
      </div>
    </>
  );
};

export default Calendar;
