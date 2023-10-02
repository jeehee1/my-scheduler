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
  return (
    <div>
      {schedules.map((data) => (
        <div>{data.schedule.schedule}</div>
      ))}
    </div>
  );
};

export default ShowCalendarDetail;
