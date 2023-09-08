import classes from "./AuthNavigation.module.css";
import { Form, NavLink, useRouteLoaderData } from "react-router-dom";

const AuthNavigation = () => {
  const pathname = window.location.pathname;
  const token = useRouteLoaderData("root");
  const showLogout = token ? true : false;
  return (
    <div className={classes.auth}>
      {!showLogout && (
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
      )}
      {showLogout && (
        <ul>
          <li>
            <Form action="/logout" method="POST">
              <button className={classes.join}>로그아웃</button>
            </Form>
          </li>
        </ul>
      )}
    </div>
  );
};

export default AuthNavigation;
