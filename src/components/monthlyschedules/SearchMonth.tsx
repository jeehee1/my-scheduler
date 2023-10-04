import classes from "./SearchMonth.module.css";
import { useContext, useState } from "react";
import Select from "react-select";
import { SingleValue, ActionMeta } from "react-select/dist/declarations/src";
import { MonthContext } from "../../context/month-context";
import { yearOptions, monthOptions } from "../../utils/dateInfo";

const SearchMonth = () => {
  const monthCtx = useContext(MonthContext);

  const [selectedYear, setSelectedYear] = useState<
    SingleValue<{
      value: number;
      label: string;
    }>
  >({ value: 0, label: "년도를 선택해주세요" });
  const [selectedMonth, setSelectedMonth] = useState<
    SingleValue<{
      value: number;
      label: string;
    }>
  >({
    value: 0,
    label: "월을 선택해주세요",
  });

  const searchMonthSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    monthCtx.setMonth(selectedYear!.value, selectedMonth!.value);
  };

  console.log(selectedYear);
  console.log(selectedMonth);
  console.log(monthCtx.searchMonth);

  return (
    <div>
      <form onSubmit={searchMonthSubmitHandler}>
        <div className={classes.select}>
          <Select
            className={classes["year-select"]}
            defaultValue={selectedYear}
            onChange={(
              newValue: SingleValue<{ value: number; label: string }>,
              actionMeta: ActionMeta<{ value: number; label: string }>
            ) => {
              setSelectedYear(newValue);
            }}
            options={yearOptions}
          />
          <Select
            className={classes["month-select"]}
            defaultValue={selectedMonth}
            onChange={(
              newValue: SingleValue<{ value: number; label: string }>,
              actionMeta: ActionMeta<{ value: number; label: string }>
            ) => {
              setSelectedMonth(newValue);
            }}
            options={monthOptions}
          />
          {/* Search 버튼 클릭시 context의 월 변경하고 해당 월의 달력 불러오기 */}
          <button className={classes["search-btn"]}>Search</button>
        </div>
      </form>
    </div>
  );
};

export default SearchMonth;
