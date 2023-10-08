import { useContext, useEffect, useState } from "react";
import classes from "./ShowCalendar.module.css";
import { MonthContext } from "../../context/month-context";
import ShowCalendarDetail from "./ShowCalendarDetail";
import ShowDay from "./ShowDay";

const ShowCalendar = ({
  schedules,
  deleteSchedule,
}: {
  schedules: {
    id: string;
    date: string;
    schedule: string;
    location: string;
    members: string[];
  }[];
  deleteSchedule: (id: string) => void;
}) => {
  const monthCtx = useContext(MonthContext);

  // 해당 월의 캘린더 시작 startNum
  const startMonth = new Date(
    monthCtx.searchMonth.year,
    monthCtx.searchMonth.month - 1,
    1
  );
  // 월 0, 화 1, 수 3, ..., 토 5, 일 6
  const startNum = startMonth.getDay() === 0 ? 6 : startMonth.getDay() - 1;
  //해당 월의 첫번째 일
  console.log(`${monthCtx.searchMonth.month}월의 첫번째 : ` + startNum);

  //선택 월의 마지막 일의 위치
  const lastDate = new Date(
    monthCtx.searchMonth.year,
    monthCtx.searchMonth.month,
    0
  );

  //선택 월의 마지막 일의 캘린더 num
  let lastDateNum: number = 0;
  if (monthCtx.searchMonth.year !== 0 && monthCtx.searchMonth.month !== 0) {
    lastDateNum = lastDate.getDate() + startNum;
    console.log("lastDateNum: " + lastDateNum);
  }

  //오늘 날짜의 위치 - 0부터 시작
  const todayNum = new Date().getDate() + startNum - 1;
  console.log("현재 날짜의 위치 : " + todayNum);

  // 캘린더에 지정된 숫자에 표시할 데이터 배열 저장
  const calendarData: {
    calNum: number;
    schedule: {
      id: string;
      date: string;
      schedule: string;
      location: string;
      members: string[];
    };
  }[] = [];

  // 스케쥴 정보를 캘린더 Num과 매핑하여 calendarData 배열로 변환
  for (let schedule = 0; schedule < schedules.length; schedule++) {
    const number = new Date(schedules[schedule].date).getDate() + startNum - 1;
    calendarData.push({
      calNum: number,
      schedule: {
        ...schedules[schedule],
        id: schedules[schedule].id,
      },
    });
  }

  // 화면에 표시되는 캘린더 calendarComp
  const calendarComp = [];

  //달력 형식 생성
  for (let r = 0; r < lastDateNum / 7; r++) {
    let calendarRow = [];
    for (let c = 0; c < 7; c++) {
      calendarRow.push(
        <div className={classes.column} key={"c" + c}>
          {/* 캘린더 칸의 일 표시 및 오늘 날짜 표시 */}
          {r * 7 + c - startNum + 1 > 0 &&
          r * 7 + c - startNum + 1 <= lastDate.getDate() ? (
            <div
              className={`${classes.date} ${
                monthCtx.searchMonth.month - 1 === new Date().getMonth() &&
                r * 7 + c === todayNum
                  ? classes.today
                  : ""
              }`}
            >
              {r * 7 + c - startNum + 1}
            </div>
          ) : null}
          {/* 해당 일의 스케쥴 정보 컴포넌트 */}
          <div className={classes.schedules}>
            {calendarData
              .filter((data) => data.calNum === r * 7 + c)
              .map((schedule) => (
                <ShowCalendarDetail
                  schedule={schedule}
                  deleteSchedule={deleteSchedule}
                />
              ))}
          </div>
        </div>
      );
    }
    calendarComp.push(
      <div className={classes.row} key={"r" + r}>
        {calendarRow}
      </div>
    );
  }

  return (
    <>
      <div className={classes["selected-month"]}>
        <h1>{`${monthCtx.searchMonth.year} / ${monthCtx.searchMonth.month}`}</h1>
      </div>
      <ShowDay />
      <div>{calendarComp}</div>;
    </>
  );
};

export default ShowCalendar;
