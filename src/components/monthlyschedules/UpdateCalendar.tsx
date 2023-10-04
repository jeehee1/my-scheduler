import { useRef, useState } from "react";
import {
  monthOptions,
  yearOptions,
  getDateOptions,
} from "../../utils/dateInfo";
import Select from "react-select";
import { SingleValue } from "react-select";

const UpdateCalendar = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    year: 0,
    month: 0,
    date: 0,
  });
  const scheduleRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const membersRef = useRef<HTMLInputElement>(null);

  const submitScheduleHandler = (event:React.FormEvent) => {
    event.preventDefault();
    console.log(selectedDate)
    console.log(scheduleRef.current?.value)
    console.log(locationRef.current?.value)
    console.log(membersRef.current?.value)
  }

  return (
    <div>
      <button onClick={() => setIsUpdating(true)}>스케쥴 추가하기</button>
      {isUpdating && (
        <div>
          <form onSubmit={submitScheduleHandler}>
            {/* 년월일 선택 */}
            <div>
              <Select
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
              <input id="schedule" type="text" ref={scheduleRef}/>
            </div>
            <div>
              <label htmlFor="location">장소</label>
              <input id="location" type="text" ref={locationRef} />
            </div>
            <div>
              <label htmlFor="with">with</label>
              <input id="with" type="text" placeholder=",로 구분해주세요" ref={membersRef}/>
            </div>
            <div>
              <button>저장하기</button>
              <button onClick={() => setIsUpdating(false)}>닫기</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateCalendar;
