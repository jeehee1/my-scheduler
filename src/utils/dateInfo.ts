const yearSelect = [{ value: 0, label: "년도를 선택해주세요" }];
const monthSelect: [{ value: number; label: string }] = [
  { value: 0, label: "월을 선택해주세요" },
];

// 년도와 월 select options 생성
for (let y = 0; y < 30; y++) {
  yearSelect.push({ value: 2020 + y, label: `${2020 + y}년` });
}
for (let m = 1; m <= 12; m++) {
  monthSelect.push({ value: m, label: `${m}월` });
}

export const yearOptions = yearSelect;
export const monthOptions = monthSelect;
export const day = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

// 년도와 월로 해당 월의 마지막 날짜 반환
export const getDateOptions = (year: number, month: number) => {
  const dateSelect = [{ value: 0, label: "일을 선택해주세요" }];
  const getLastDate = new Date(year, month, 0).getDate();
  for (let d = 1; d <= getLastDate; d++) {
    dateSelect.push({ value: d, label: `${d}일` });
  }
  return dateSelect;
};
