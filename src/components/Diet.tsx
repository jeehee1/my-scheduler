import classes from "./Diet.module.css";
import Card from "../layout/Card";
import Title from "../layout/Title";
import { useContext, useEffect, useRef, useState } from "react";
import { JSX } from "react/jsx-runtime";
import { ModeContext } from "../context/mode-context";
import useHttp from "../hooks/use-http";

const Diet = () => {
  const modeCtx = useContext(ModeContext);
  const breakfastRef = useRef<HTMLInputElement>(null);
  const lunchRef = useRef<HTMLInputElement>(null);
  const dinnerRef = useRef<HTMLInputElement>(null);
  const snacksRef = useRef<HTMLInputElement>(null);

  const { sendRequest, loading, error, data, identifier, extra } = useHttp();

  const type = ["breakfast", "lunch", "dinner", "snacks"];
  const [dietList, setDietList] = useState<JSX.Element>();
  const [loadedDiet, setLoadedDiet] = useState<{
    id: string;
    diet: { [key: string]: string };
  }>();
  let showDiet: JSX.Element;
  const [editDietMode, setEditDietMode] = useState<boolean>(false);

  useEffect(() => {
    // fetchDiet();
    console.log(process.env.REACT_APP_DATABASE_URL + "/2023-06-05/diet.json");
    sendRequest(
      process.env.REACT_APP_DATABASE_URL + "/2023-06-05/diet.json",
      "GET",
      null,
      null,
      "GET_DIET"
    );
  }, [sendRequest]);

  useEffect(() => {
    switch (identifier) {
      case "GET_DIET":
        if (!loading && data && !error) {
          setLoadedDiet({
            id: Object.keys(data)[0],
            diet: data[Object.keys(data)[0]],
          });
        }
        break;
      case "SAVE_DIET":
        if (!loading && data && !error) {
          setLoadedDiet({
            id: loadedDiet ? loadedDiet.id : Object.keys(data)[0],
            diet: {
              breakfast: extra.breakfast,
              lunch: extra.lunch,
              dinner: extra.dinner,
              snacks: extra.snacks,
            },
          });
          console.log(loadedDiet);
          setEditDietMode(false);
        }
        break;
      default:
        break;
    }

    console.log(data, loading, error);
  }, [data, loading, error, identifier]);

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
          <button className={classes["submit-btn"]}>저장!</button>
        </form>
      );
    }

    setDietList(showDiet);
  }, [loadedDiet, editDietMode]);

  const submitDietHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await sendRequest(
      loadedDiet
        ? process.env.REACT_APP_DATABASE_URL +
            `/2023-06-05/diet/${loadedDiet.id}.json`
        : process.env.REACT_APP_DATABASE_URL + "/2023-06-05/diet.json",
      loadedDiet ? "PUT" : "POST",
      {
        breakfast: breakfastRef.current?.value,
        lunch: lunchRef.current?.value,
        dinner: dinnerRef.current?.value,
        snacks: snacksRef.current?.value,
      },
      {
        breakfast: breakfastRef.current?.value,
        lunch: lunchRef.current?.value,
        dinner: dinnerRef.current?.value,
        snacks: snacksRef.current?.value,
      },
      "SAVE_DIET"
    );
  };

  return (
    <>
      <Title>Diet Plan</Title>
      <div onClick={() => modeCtx.editMode && setEditDietMode(true)}>
        <Card>
          {!loading && dietList}
          {loading && <p>Loading...</p>}
        </Card>
      </div>
    </>
  );
};

export default Diet;
