import { useContext, useEffect, useState } from "react";
import classes from "./Card.module.css";
import { ModeContext } from "../context/mode-context";

const Card = ({ children }: { children: any }) => {
  const modeCtx = useContext(ModeContext);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(false);
  }, [modeCtx.editMode]);

  return (
    <>
      {!modeCtx.editMode && (
        <div
          onMouseOver={() => {
            setIsActive(true);
          }}
          onMouseOut={() => {
            setIsActive(false);
          }}
          className={
            isActive ? `${classes.card} ${classes.active}` : classes.card
          }
        >
          {children}
        </div>
      )}
      {modeCtx.editMode && <div className={classes.card}>{children}</div>}
    </>
  );
};

export default Card;
