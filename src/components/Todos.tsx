import { useState } from "react";
import classes from "./Todos.module.css";

const Todos = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div className={classes.todos}>
      <ul>
        <li>
          <input
            type="checkbox"
            id="first"
            className={classes.check}
            onChange={() => {
              console.log("clicked");
              setChecked(!checked);
            }}
          />
          <label htmlFor="first"></label>
          <span
            className={
              checked
                ? `${classes.content} ${classes.checked}`
                : classes.content
            }
          >
            first List
          </span>
        </li>
        <li>
          <input type="checkbox" id="second" className={classes.check} />
          <label htmlFor="second"></label>
          <span
            className={
              checked
                ? `${classes.content} ${classes.checked}`
                : classes.content
            }
          >
            first List
          </span>
        </li>
        <li>
          <input type="checkbox" id="third" className={classes.check} />
          <label htmlFor="third"></label>
          <span
            className={
              checked
                ? `${classes.content} ${classes.checked}`
                : classes.content
            }
          >
            first List
          </span>
        </li>
        <li>
          <input type="checkbox" id="fourth" className={classes.check} />
          <label htmlFor="fourth"></label>
          <span
            className={
              checked
                ? `${classes.content} ${classes.checked}`
                : classes.content
            }
          >
            first List
          </span>{" "}
        </li>
      </ul>
    </div>
  );
};

export default Todos;
