import classes from "./AuthForm.module.css";
import { NavLink, Form, useSearchParams } from "react-router-dom";

const AuthForm = () => {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  return (
    <div className={classes["login-form"]}>
      <p className={classes.title}>{isLogin ? "로그인" : "회원가입"}</p>
      <Form method="POST">
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="text" />
        </div>
        <div>
          <label htmlFor="pwd">비밀번호</label>
          <input id="pwd" name="pwd" type="password" />
        </div>
        <div className={classes['navi-btns']}>
          <NavLink to={isLogin ? "/auth?mode=signup" : "/auth?mode=login"}>
            {isLogin ? "회원이 아니신가요?" : "회원이신가요?"}
          </NavLink>
          <button className={classes['auth-btn']}>{isLogin ? "로그인" : "가입하기"}</button>
        </div>
      </Form>
    </div>
  );
};

export default AuthForm;
