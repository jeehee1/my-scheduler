import { NavLink } from "react-router-dom";

const TypeNavigation = () => {
  return (
    <div>
      <ul>
        <li>
          <NavLink to={"/schedules?type=monthly"}>월별</NavLink>
        </li>
        <li>
          <NavLink to={"/schedules?type=daily"}>일별</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default TypeNavigation;
