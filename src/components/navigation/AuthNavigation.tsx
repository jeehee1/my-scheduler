import classes from "./AuthNavigation.module.css";
import { NavLink } from "react-router-dom";

const AuthNavigation = () => {
  const pathname = window.location.pathname;
  return (
    <div className={classes.auth}>
      <ul>
        <li>
          <NavLink to={"auth?mode=signup"}>
            <button className={classes.join}>회원가입</button>
          </NavLink>
        </li>
        <li>
          <NavLink to={"auth?mode=login"}>
            <button className={classes.login}>로그인</button>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AuthNavigation;
