import classes from "./UpdateCalendar.module.css";
import { useEffect, useRef, useState } from "react";
import {
  monthOptions,
  yearOptions,
  getDateOptions,
} from "../../utils/dateInfo";
import Select from "react-select";
import { SingleValue } from "react-select";
import useHttp from "../../hooks/use-http";
import { monthlySchedule } from "../../types/SchedulerType";

const UpdateCalendar = ({
  addSchedule,
}: {
  addSchedule: (yearMonth: string, schedule: monthlySchedule) => void;
}) => {
  const { loading, error, data, sendRequest, extra, identifier } = useHttp();
  const [formMessage, setFormMessage] = useState<String>();
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    year: 0,
    month: 0,
    date: 0,
  });
  const scheduleRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const membersRef = useRef<HTMLInputElement>(null);

  const submitScheduleHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      selectedDate.date === 0 ||
      selectedDate.month === 0 ||
      selectedDate.year === 0
    ) {
      setFormMessage("날짜를 입력해주세요");
      return;
    } else if (scheduleRef.current?.value === "") {
      setFormMessage("스케쥴을 입력해주세요");
      return;
    } else if (locationRef.current?.value === "") {
      setFormMessage("장소를 입력해주세요");
      return;
    } else {
      setFormMessage("");

      const newDate = `${selectedDate.year}-${
        selectedDate.month < 10 ? "0" + selectedDate.month : selectedDate.month
      }-${
        selectedDate.date < 10 ? "0" + selectedDate.date : selectedDate.date
      }`;
      const newMembers = membersRef.current!.value
        ? membersRef.current!.value.split(",").map((member) => member.trim())
        : [];
      console.log(newDate);

      const newSchedule: monthlySchedule = {
        date: newDate,
        schedule: scheduleRef.current!.value,
        location: locationRef.current!.value,
        members: newMembers,
      };

      addSchedule(newDate.slice(0, 7), newSchedule);
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (identifier === "UPDATE_SCHEDULE") {
      addSchedule(data.name, { ...extra });
    }
  }, [data, identifier]);

  return (
    <div>
      <div className={classes["add-btn"]}>
        <button className="purple-btn" onClick={() => setIsUpdating(true)}>
          스케쥴 추가하기
        </button>
      </div>
      {isUpdating && (
        <div className={classes["monthly-form"]}>
          <form onSubmit={submitScheduleHandler}>
            {/* 년월일 선택 */}
            <div>
              <label>날짜를 선택해주세요</label>
              <Select
                className={classes.select}
                options={yearOptions}
                onChange={(
                  newValue: SingleValue<{ value: number; label: string }>
                ) => {
                  setSelectedDate({
                    year: newValue?.value || 0,
                    month: selectedDate.month,
                    date: selectedDate.date,
                  });
                }}
              />
              <Select
                className={classes.select}
                options={monthOptions}
                onChange={(
                  newValue: SingleValue<{ value: number; label: string }>
                ) => {
                  setSelectedDate({
                    year: selectedDate.year,
                    month: newValue?.value || 0,
                    date: selectedDate.date,
                  });
                }}
              />
              {selectedDate.year !== 0 && selectedDate.month !== 0 && (
                <Select
                  className={classes.select}
                  options={getDateOptions(
                    selectedDate.year,
                    selectedDate.month
                  )}
                  onChange={(
                    newValue: SingleValue<{ value: number; label: string }>
                  ) =>
                    setSelectedDate({
                      year: selectedDate.year,
                      month: selectedDate.month,
                      date: newValue?.value || 0,
                    })
                  }
                />
              )}
            </div>
            <div>
              <label htmlFor="schedule">스케쥴 내용</label>
              <input id="schedule" type="text" ref={scheduleRef} />
            </div>
            <div>
              <label htmlFor="location">장소</label>
              <input id="location" type="text" ref={locationRef} />
            </div>
            <div>
              <label htmlFor="with">with</label>
              <input
                id="with"
                type="text"
                placeholder=",로 구분해주세요"
                ref={membersRef}
              />
            </div>
            <p>{formMessage}</p>
            <div>
              <button className="purple-btn">저장하기</button>
              <button
                className="yellow-btn"
                onClick={() => setIsUpdating(false)}
              >
                닫기
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateCalendar;
