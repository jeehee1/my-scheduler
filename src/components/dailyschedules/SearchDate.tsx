import classes from "./SearchDate.module.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useContext, useState } from "react";
import { format, getMonth, getYear } from "date-fns";
import { DateContext } from "../../context/date-context";

const YEARS = Array.from({ length: 30 }, (v, i) => getYear(new Date()) - 3 + i);

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const SearchDate = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const dateCtx = useContext(DateContext);

  const searchDateHandler = (event: React.FormEvent) => {
    event.preventDefault();
    dateCtx.changeDate(format(selectedDate, "yyyy-MM-dd"));
  };

  return (
    <form onSubmit={searchDateHandler}>
      <div className={classes["search-date"]}>
        <DatePicker
          className={classes["date-picker"]}
          formatWeekDay={(day) => day.substring(0, 1)}
          dateFormat="yyyy/MM/dd"
          shouldCloseOnSelect
          showYearDropdown
          scrollableYearDropdown
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className={classes["calendar-header"]}>
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
              >
                {"<"}
              </button>
              <select
                value={getYear(date)}
                onChange={({ target: { value } }) =>
                  changeYear(parseInt(value))
                }
              >
                {YEARS.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <select
                value={MONTHS[getMonth(date)]}
                onChange={({ target: { value } }) =>
                  changeMonth(MONTHS.indexOf(value))
                }
              >
                {MONTHS.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
              >
                {">"}
              </button>
            </div>
          )}
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date!)}
        />
        <button className={classes["search-btn"]}>Search</button>
      </div>
    </form>
  );
};

export default SearchDate;
