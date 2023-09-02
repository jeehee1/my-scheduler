import classes from "./LogIn.module.css";

const SignUp = () => {
  return (
    <div className={classes["login-form"]}>
      <form>
        <div className={classes.email}>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" />
        </div>
        <div className={classes.pwd}>
          <label htmlFor="pwd">비밀번호</label>
          <input id="pwd" type="password" />
        </div>
        <a href="/">회원이신가요?</a>
        <button>가입</button>
      </form>
    </div>
  );
};

export default SignUp;
