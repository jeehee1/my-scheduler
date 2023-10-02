import { FormEvent, useContext, useState } from "react";
import Select from "react-select";
import { SingleValue, ActionMeta } from "react-select/dist/declarations/src";
import { MonthContext } from "../../context/month-context";

type SelectOptionType = { label: string; value: number };

const yearOptions = [{ value: 0, label: "년도를 선택해주세요" }];
const monthOptions: [{ value: number; label: string }] = [
  { value: 0, label: "월을 선택해주세요" },
];

for (let y = 0; y < 30; y++) {
  yearOptions.push({ value: 2020 + y, label: `${2020 + y}년` });
}
for (let m = 0; m < 12; m++) {
  monthOptions.push({ value: m + 1, label: `${m + 1}월` });
}

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
        <label htmlFor="month"></label>
        <Select
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
        <button>Search</button>
      </form>
    </div>
  );
};

export default SearchMonth;
