import classes from "./TypeNavigation.module.css";
import { NavLink } from "react-router-dom";

const TypeNavigation = () => {
  return (
    <div className={classes["type-nav"]}>
      <ul>
        <li className={classes.monthly}>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            to={"/schedules/monthly"}
          >
            Monthly
          </NavLink>
        </li>
        <li className={classes.daily}>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            to={"/schedules/daily"}
          >
            Daily
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default TypeNavigation;
