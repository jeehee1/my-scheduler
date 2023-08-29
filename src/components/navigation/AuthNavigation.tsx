import classes from "./AuthNavigation.module.css";

const AuthNavigation = () => {
  return (
    <div className={classes.auth}>
      <button className={classes.join}>회원가입</button>
      <button className={classes.login}>로그인</button>
    </div>
  );
};

export default AuthNavigation;
