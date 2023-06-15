import classes from "./Todos.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import Card from "../layout/Card";
import Title from "../layout/Title";
import { typeTodo } from "../types/SchedulerType";
import { ModeContext } from "../context/mode-context";
import useHttp from "../hooks/use-http";
import { DateContext } from "../context/date-context";

const Todos = () => {
  const dateCtx = useContext(DateContext);
  const modeCtx = useContext(ModeContext);
  const { sendRequest, data, error, loading, extra, identifier } = useHttp();
  const todoRef = useRef<HTMLInputElement>(null);
  const [loadedTodos, setLoadedTodos] = useState<{
    id: string | null;
    todos: typeTodo[];
  } | null>();
  const [editTodosMode, setEditTodosMode] = useState<boolean>(false);
  const [todosList, setTodosList] = useState<JSX.Element[]>([]);

  useEffect(() => {
    sendRequest(
      process.env.REACT_APP_DATABASE_URL +
        `/${dateCtx.selectedDate}/todos.json`,
      "GET",
      null,
      null,
      "GET_TODOS"
    );
  }, [dateCtx.selectedDate]);

  useEffect(() => {
    switch (identifier) {
      case "GET_TODOS":
        if (!loading && !error) {
          const todosData = data
            ? {
                id: Object.keys(data)[0],
                todos: data[Object.keys(data)[0]],
              }
            : null;
          setLoadedTodos(todosData);
        }
        break;
      case "CHECK_TODO":
        console.log(data);

        if (data && !loading && !error) {
          setLoadedTodos({ id: loadedTodos!.id, todos: extra });
        }
        break;
      case "SAVE_TODOS":
        if (data && !loading && !error) {
          const todosData = {
            id: loadedTodos ? loadedTodos.id : data,
            todos: extra,
          };
          setLoadedTodos(todosData);
        }
        break;
      default:
        break;
    }
  }, [data, identifier, loading, extra]);

  useEffect(() => {
    if (modeCtx.editMode === false) setEditTodosMode(false);
  }, [modeCtx.editMode]);

  // TODO 체크 기능 - 클릭시마다 데이터 연동
  const changeClickedHandler = (i: number) => {
    const checkedTodos = [...loadedTodos!.todos];
    const splicedTodo = checkedTodos!.splice(i, 1, {
      todo: loadedTodos!.todos[i].todo,
      checked: !loadedTodos!.todos[i].checked,
    });
    sendRequest(
      process.env.REACT_APP_DATABASE_URL +
        `/${dateCtx.selectedDate}/todos/${loadedTodos!.id}.json`,
      "PUT",
      checkedTodos,
      checkedTodos,
      "CHECK_TODO"
    );
  };

  useEffect(() => {
    // todo 리스트 뷰 모드
    console.log("loaded?");
    const todoList = [];
    if (!editTodosMode) {
      if (loadedTodos) {
        for (let i = 0; i < loadedTodos.todos.length; i++) {
          todoList.push(
            <li key={i}>
              <>
                {!modeCtx.editMode &&<><input
                  type="checkbox"
                  id={`${loadedTodos.todos[i].todo}`}
                  className={classes.check}
                  onChange={() => changeClickedHandler(i)}
                  checked={loadedTodos.todos[i].checked}
                />
                <label htmlFor={`${loadedTodos.todos[i].todo}`} />
                </>}
                <span
                  className={
                    loadedTodos.todos[i].checked
                      ? `${classes.content} ${classes.checked}`
                      : classes.content
                  }
                >
                  {loadedTodos.todos[i].todo}
                </span>
              </>
            </li>
          );
        }
        setTodosList(todoList);
      } else {
        todoList.push(<p>아직 등록된 Todo가 없습니다.</p>);
      }
    } else if (editTodosMode) {
      // todo리스트 에딧 모드
      // 데이터가 존재할때
      if (loadedTodos) {
        for (let i = 0; i < loadedTodos.todos.length; i++) {
          todoList.push(
            <li key={i} className={classes["edit-list"]}>
              <p>{loadedTodos.todos[i].todo}</p>
              <button
                className={classes["delete-btn"]}
                onClick={() => deleteTodoHandler(i)}
              >
                빼기
              </button>
            </li>
          );
        }
      }
    }
    setTodosList(todoList);
  }, [editTodosMode, loadedTodos, modeCtx.editMode]);

  const deleteTodoHandler = (i: number) => {
    const newTodos = [...loadedTodos!.todos];
    const deletedTodo = newTodos.splice(i, 1);
    console.log(deletedTodo);

    setLoadedTodos({
      id: loadedTodos!.id,
      todos: newTodos,
    });
  };
  console.log(loadedTodos);

  //수정한 todo list 저장
  const saveTodosHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loadedTodos) {
      sendRequest(
        loadedTodos.id
          ? process.env.REACT_APP_DATABASE_URL +
              `/2023-06-05/todos/${loadedTodos.id}.json`
          : process.env.REACT_APP_DATABASE_URL +
              `/${dateCtx.selectedDate}/todos.json`,
        loadedTodos.id ? "PUT" : "POST",
        loadedTodos.todos,
        loadedTodos.todos,
        "SAVE_TODOS"
      );
    } else {
      alert("저장할 데이터가 없습니다.");
    }
    setEditTodosMode(false);
  };

  // todo 추가하기
  const addTodoHandler = () => {
    if (loadedTodos) {
      setLoadedTodos({
        id: loadedTodos.id,
        todos: [
          ...loadedTodos.todos,
          { todo: todoRef.current?.value || "", checked: false },
        ],
      });
    } else {
      setLoadedTodos({
        id: null,
        todos: [{ todo: todoRef.current?.value || "", checked: false }],
      });
    }
  };

  return (
    <>
      <Title>Todos</Title>
      <div
        onClick={() => {
          modeCtx.editMode && setEditTodosMode(true);
        }}
      >
        <Card>
          <div className={classes.todos}>
            {editTodosMode && (
              <div className={classes["new-todo"]}>
                <input type="text" ref={todoRef} />
                <button className={classes["plus"]} onClick={addTodoHandler}>
                  더하기
                </button>
              </div>
            )}
            <ul>{todosList}</ul>

            {editTodosMode && (
              <div>
                <form onSubmit={saveTodosHandler}>
                  <button className={classes["submit-btn"]}>저장!</button>
                </form>
              </div>
            )}
          </div>
        </Card>
      </div>
    </>
  );
};

export default Todos;
