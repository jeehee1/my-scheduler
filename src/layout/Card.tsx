import { useContext, useEffect, useState } from "react";
import classes from "./Card.module.css";
import { ModeContext } from "../context/mode-context";

const Card = ({ children, editting }: { children: any; editting: boolean }) => {
  const modeCtx = useContext(ModeContext);

  return (
    <>
      {modeCtx.editMode && (
        <div
          // 에딧 모드이고 수정중이 아닌경우 - mouse hover시 spring 효과
          className={`${classes.card} ${
            modeCtx.editMode && !editting ? classes.active : ""
          }`}
        >
          {children}
        </div>
      )}
      {!modeCtx.editMode && <div className={classes.card}>{children}</div>}
    </>
  );
};

export default Card;
