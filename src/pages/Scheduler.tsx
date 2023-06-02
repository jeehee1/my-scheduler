import classes from "./Scheduler.module.css";
import Diet from "../components/Diet";
import Goal from "../components/Goal";
import Schedules from "../components/Schedules";
import Todos from "../components/Todos";

const Scheduler = () => {
  return (
    <div className={classes.content}>
      <div className={classes["first-column"]}>
        <Goal />
        <Schedules />
      </div>
      <div className={classes["second-column"]}>
        <Todos />
        <Diet />
        <div>
          <button className={classes["edit-btn"]}>Edit</button>
          <div className={classes.sign}> {"◀ Click!"}</div>
        </div>
      </div>
    </div>
  );
};

export default Scheduler;
