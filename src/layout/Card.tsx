import { useContext, useEffect, useState } from "react";
import classes from "./Card.module.css";
import { ModeContext } from "../context/mode-context";

const Card = ({ children, editting }: { children: any , editting: boolean}) => {
  const modeCtx = useContext(ModeContext);
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      {modeCtx.editMode && (
        <div
          onMouseOver={() => {
            setIsActive(true);
          }}
          onMouseOut={() => {
            setIsActive(false);
          }}
          className={
            isActive && !editting ? `${classes.card} ${classes.active}` : classes.card
          }
        >
          {children}
        </div>
      )}
      {!modeCtx.editMode && <div className={classes.card}>{children}</div>}
    </>
  );
};

export default Card;
