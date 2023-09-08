import classes from "./AuthForm.module.css";
import { NavLink, Form, useSearchParams } from "react-router-dom";

const AuthForm = () => {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  return (
    <div className={classes["login-form"]}>
      <p>{isLogin ? "로그인" : "회원가입"}</p>
      <Form method="POST">
        <div className={classes.email}>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="text" />
        </div>
        <div className={classes.pwd}>
          <label htmlFor="pwd">비밀번호</label>
          <input id="pwd" name="pwd" type="password" />
        </div>
        <NavLink to={isLogin ? "/auth?mode=signup" : "/auth?mode=login"}>
          {isLogin ? "회원이 아니신가요?" : "회원이신가요?"}
        </NavLink>
        <button>{isLogin ? "로그인" : "가입하기"}</button>
      </Form>
    </div>
  );
};

export default AuthForm;
