//   colorTable should be [{time: 9.4, color: 'yellow', 'content:'something'}, {time:9.5, color: 'yellow', 'content:'something'}]

const ShowTimeSchedule = ({
  timeInfo,
}: {
  timeInfo: {
    time: number;
    schedule: {
      startTime: number;
      endTime: number;
      schedule: string;
      color: string;
    } | null;
  };
}) => {
  const info = [
    { time: 9.4, color: "yellow", content: "something" },
    { time: 9.5, color: "yellow", content: "something" },
  ];

  const foundInfo = info.find((o) => o.time === timeInfo.time) || {
    color: "none",
  };
  return (
    <td
      style={{
        backgroundColor: timeInfo.schedule
          ? timeInfo.schedule.color
          : undefined,
      }}
    >
      {timeInfo.schedule ? timeInfo.schedule.schedule : ""}
    </td>
  );
};

export default ShowTimeSchedule;
