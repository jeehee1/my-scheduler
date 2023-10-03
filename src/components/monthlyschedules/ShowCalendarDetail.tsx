import { useState } from "react";

const ShowCalendarDetail = ({
  schedules,
}: {
  schedules: {
    calNum: number;
    schedule: {
      id: string;
      date: string;
      schedule: string;
      location: string;
      members: string[];
    };
  }[];
}) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <>
      {schedules.map((data) => (
        <>
          <div
            onClick={() => {
              setShowDetails(true);
            }}
          >
            {data.schedule.schedule}
          </div>
          {/* 스케쥴 디테일 팝업 박스 */}
          {showDetails && (
            <div style={{ position: "absolute", zIndex: "200", backgroundColor: "white"}}>
              <button onClick={() => setShowDetails(false)}>x</button>
              <h3>{data.schedule.date}</h3>
              <p>{data.schedule.schedule}</p>
              <p>{data.schedule.location}</p>
              <p>
                {data.schedule.members.map((member) => (
                  <span>{member}</span>
                ))}
              </p>
            </div>
          )}
        </>
      ))}
    </>
  );
};

export default ShowCalendarDetail;
