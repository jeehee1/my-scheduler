import { useContext, useEffect, useState } from "react";
import classes from "./Card.module.css";
import { ModeContext } from "../context/mode-context";

const Card = ({ children, editting }: { children: any , editting: boolean}) => {
  const modeCtx = useContext(ModeContext);

  // 마우스가 해당 컴포넌트 위에 위치한 경우 isActive가 true 값으로 설정
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
          // isActive 마우스 위치 && !editting 수정중이 아닌 경우 sping 효과
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
