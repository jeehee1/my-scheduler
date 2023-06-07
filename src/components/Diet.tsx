import classes from "./Diet.module.css";
import Card from "../layout/Card";
import Title from "../layout/Title";
import { useContext, useEffect, useRef, useState } from "react";
import { JSX } from "react/jsx-runtime";
import { ModeContext } from "../context/mode-context";

const Diet = ({ diet }: { diet: { [key: string]: string } }) => {
  const modeCtx = useContext(ModeContext);
  const breakfastRef = useRef<HTMLInputElement>(null);
  const lunchRef = useRef<HTMLInputElement>(null);
  const dinnerRef = useRef<HTMLInputElement>(null);
  const snacksRef = useRef<HTMLInputElement>(null);

  const type = ["breakfast", "lunch", "dinner", "snacks"];
  const [dietList, setDietList] = useState<JSX.Element>();
  const [loadedDiet, setLoadedDiet] = useState<{
    id: string;
    diet: { [key: string]: string };
  }>();
  let showDiet: JSX.Element;
  const [editDietMode, setEditDietMode] = useState<boolean>(false);
  const fetchDiet = async () => {
    const response = await fetch(
      "https://my-scheduler-9a484-default-rtdb.firebaseio.com/my-scheduler/2023-06-05/diet.json"
    );
    const data = await response.json();
    if (data) {
      setLoadedDiet({
        id: Object.keys(data)[0],
        diet: data[Object.keys(data)[0]],
      });
    }
  };

  useEffect(() => {
    fetchDiet();
  }, []);

  useEffect(() => {
    if (!editDietMode) {
      //뷰모드
      if (loadedDiet) {
        showDiet = (
          <>
            <div className={classes.diet}>
              <span className={classes.type}>Breakfast</span>
              <p>{loadedDiet.diet["breakfast"]}</p>
            </div>
            <div className={classes.diet}>
              <span className={classes.type}>Lunch</span>
              <p>{loadedDiet.diet["lunch"]}</p>
            </div>
            <div className={classes.diet}>
              <span className={classes.type}>Dinner</span>
              <p>{loadedDiet.diet["dinner"]}</p>
            </div>
            <div className={classes.diet}>
              <span className={classes.type}>Snacks</span>
              <p>{loadedDiet.diet["snacks"]}</p>
            </div>
          </>
        );
      } else {
        showDiet = <p>아직 저장된 식단이 없습니다.</p>;
      }
    }

    if (editDietMode) {
      //에딧 모드
      showDiet = (
        <form onSubmit={submitDietHandler}>
          <div className={classes.diet}>
            <label htmlFor="breakfast" className={classes.type}>
              Breakfast
            </label>
            <input
              type="text"
              ref={breakfastRef}
              id="breakfast"
              defaultValue={loadedDiet && loadedDiet.diet.breakfast}
            />
          </div>
          <div className={classes.diet}>
            <label className={classes.type} htmlFor="lunch">
              Lunch
            </label>
            <input
              type="text"
              ref={lunchRef}
              id="lunch"
              defaultValue={loadedDiet && loadedDiet.diet.lunch}
            />
          </div>
          <div className={classes.diet}>
            <label className={classes.type} htmlFor="dinner">
              Dinner
            </label>
            <input
              type="text"
              ref={dinnerRef}
              id="dinner"
              defaultValue={loadedDiet && loadedDiet.diet.dinner}
            />
          </div>
          <div className={classes.diet}>
            <label className={classes.type} htmlFor="snacks">
              Snacks
            </label>
            <input
              type="text"
              ref={snacksRef}
              id="snacks"
              defaultValue={loadedDiet && loadedDiet.diet.snacks}
            />
          </div>
          <button>저장!</button>
        </form>
      );
    }

    setDietList(showDiet);
  }, [loadedDiet, editDietMode]);

  const submitDietHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch(
      loadedDiet
        ? `https://my-scheduler-9a484-default-rtdb.firebaseio.com/my-scheduler/2023-06-05/diet/${loadedDiet.id}.json`
        : "https://my-scheduler-9a484-default-rtdb.firebaseio.com/my-scheduler/2023-06-05/diet.json",
      {
        method: loadedDiet ? "PUT" : "POST",
        body: JSON.stringify({
          breakfast: breakfastRef.current?.value,
          lunch: lunchRef.current?.value,
          dinner: dinnerRef.current?.value,
          snacks: snacksRef.current?.value,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    console.log(data);

    setLoadedDiet({
      id: loadedDiet ? loadedDiet.id : Object.keys(data)[0],
      diet: {
        breakfast: breakfastRef.current?.value || "",
        lunch: lunchRef.current?.value || "",
        dinner: dinnerRef.current?.value || "",
        snacks: snacksRef.current?.value || "",
      },
    });
    console.log(loadedDiet);
    setEditDietMode(false);
  };

  return (
    <>
      <Title>Diet Plan</Title>
      <div onClick={() => modeCtx.editMode && setEditDietMode(true)}>
        <Card>{dietList}</Card>
      </div>
    </>
  );
};

export default Diet;
