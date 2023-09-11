import { useSearchParams } from "react-router-dom";
import TypeNavigation from "../components/navigation/TypeNavigation";
import Scheduler from "./Scheduler";

const ScheduleLayout = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  return (
    <>
      <TypeNavigation />
      {type === "monthly" ? <p>It's monthly page.</p> : <Scheduler />}
    </>
  );
};

export default ScheduleLayout;
