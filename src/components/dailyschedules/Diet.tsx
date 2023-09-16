import classes from "./Diet.module.css";
import Card from "../../layout/Card";
import Title from "../../layout/Title";
import { useContext, useEffect, useRef, useState } from "react";
import { JSX } from "react/jsx-runtime";
import { ModeContext } from "../../context/mode-context";
import useHttp from "../../hooks/use-http";
import { DateContext } from "../../context/date-context";

const Diet = ({ user }: { user: string }) => {
  const modeCtx = useContext(ModeContext);
  const dateCtx = useContext(DateContext);
  const breakfastRef = useRef<HTMLInputElement>(null);
  const lunchRef = useRef<HTMLInputElement>(null);
  const dinnerRef = useRef<HTMLInputElement>(null);
  const snacksRef = useRef<HTMLInputElement>(null);

  const { sendRequest, loading, error, data, identifier, extra } = useHttp();

  const [dietList, setDietList] = useState<JSX.Element>();
  const [loadedDiet, setLoadedDiet] = useState<{
    id: string;
    diet: { [key: string]: string };
  } | null>();
  let showDiet: JSX.Element;
  const [editDietMode, setEditDietMode] = useState<boolean>(false);
  console.log(loadedDiet);

  useEffect(() => {
    if (!modeCtx.editMode) {
      setEditDietMode(false);
    }
  }, [modeCtx.editMode]);

  useEffect(() => {
    console.log("get");
    sendRequest(
      process.env.REACT_APP_DATABASE_URL +
        `/my-scheduler/${user}/${dateCtx.selectedDate}/diet.json`,
      "GET",
      null,
      null,
      "GET_DIET"
    );
  }, [dateCtx.selectedDate]);

  useEffect(() => {
    switch (identifier) {
      case "GET_DIET":
        console.log();
        console.log("data: " + data);
        if (!loading && !loading && !error) {
          console.log(data);
          setLoadedDiet(
            data
              ? {
                  id: Object.keys(data)[0],
                  diet: data[Object.keys(data)[0]],
                }
              : null
          );
        }
        break;
      case "SAVE_DIET":
        if (data && !loading && !error) {
          setLoadedDiet({
            id: loadedDiet ? loadedDiet.id : Object.keys(data)[0],
            diet: {
              breakfast: extra.breakfast,
              lunch: extra.lunch,
              dinner: extra.dinner,
              snacks: extra.snacks,
            },
          });
          setEditDietMode(false);
        }
        break;
      default:
        break;
    }
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
              defaultValue={loadedDiet ? loadedDiet.diet.breakfast : ""}
              required
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
              defaultValue={loadedDiet ? loadedDiet.diet.lunch : ""}
              required
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
              defaultValue={loadedDiet ? loadedDiet.diet.dinner : ""}
              required
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
              defaultValue={loadedDiet ? loadedDiet.diet.snacks : ""}
              required
            />
          </div>
          <button className="normal-btn">저장!</button>
        </form>
      );
    }

    setDietList(showDiet);
  }, [loadedDiet, editDietMode]);

  const submitDietHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await sendRequest(
      loadedDiet
        ? process.env.REACT_APP_DATABASE_URL +
            `/my-scheduler/${user}/${dateCtx.selectedDate}/diet/${loadedDiet.id}.json`
        : process.env.REACT_APP_DATABASE_URL +
            `/my-scheduler//${user}/${dateCtx.selectedDate}/diet.json`,
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
        <Card editting={editDietMode}>
          {!loading && !error && dietList}
          {loading && !error && <p>Loading...</p>}
          {error && <p>데이터를 불러올 수 없습니다</p>}
        </Card>
      </div>
      {editDietMode && (
        <button
          type="button"
          className="normal-btn cancel-btn"
          onClick={() => {
            setEditDietMode(false);
          }}
        >
          돌아가기
        </button>
      )}
    </>
  );
};

export default Diet;
