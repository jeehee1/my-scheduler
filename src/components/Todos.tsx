import classes from "./Todos.module.css";
import { DUMMY_DATA } from "../data/DUMMY_DATA";
import {
  FormEvent,
  MouseEventHandler,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Card from "../layout/Card";
import Title from "../layout/Title";
import { typeTodo } from "../types/SchedulerType";
import { ModeContext } from "../context/mode-context";
import { JSX } from "react/jsx-runtime";
import useHttp from "../hooks/use-http";

const Todos = () => {
  const modeCtx = useContext(ModeContext);
  const { sendRequest, data, error, loading, extra, identifier } = useHttp();
  const todoRef = useRef<HTMLInputElement>(null);
  const [loadedTodos, setLoadedTodos] = useState<{
    id: string;
    todos: typeTodo[];
  } | null>();
  const [editTodosMode, setEditTodosMode] = useState<boolean>(false);
  const [editTodosList, setEditTodosList] = useState<JSX.Element[]>([]);
  let todoList: JSX.Element[];

  useEffect(() => {
    sendRequest(
      process.env.REACT_APP_DATABASE_URL + "/2023-06-05/todos.json",
      "GET",
      null,
      null,
      "GET_TODOS"
    );
  }, []);

  useEffect(() => {
    switch (identifier) {
      case "GET_TODOS":
        if (data && !loading && !error) {
          const todosData = {
            id: Object.keys(data)[0],
            todos: data[Object.keys(data)[0]],
          };
          console.log(data)
          setLoadedTodos(todosData);
        }
        break;
      case "SAVE_TODOS":
        if(data&&!loading&&!error){
          const todosData = {
            id: loadedTodos?loadedTodos.id:data,
            todos: extra,
          };
        }
        break;
      default:
        break;
    }
  }, [data, identifier, loading, extra]);

  useEffect(() => {
    if (modeCtx.editMode === false) setEditTodosMode(false);
  }, [modeCtx.editMode]);

  useEffect(() => {
    // todo 리스트 뷰 모드
    if (!editTodosMode) {
      todoList = [];
      if (loadedTodos) {
        for (let i = 0; i < loadedTodos.todos.length; i++) {
          todoList.push(
            <li key={i}>
              <>
                {!modeCtx.editMode && (
                  <>
                    <input
                      type="checkbox"
                      id={`${loadedTodos.todos[i].todo}`}
                      className={classes.check}
                      onChange={() => {
                        console.log("clicked");
                      }}
                      checked={loadedTodos.todos[i].checked}
                    />
                    <label htmlFor={`${loadedTodos.todos[i].todo}`} />
                  </>
                )}
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
        setEditTodosList(todoList);
      } else {
        todoList.push(<li>아직 등록된 Todo가 없어요.</li>);
      }
    } else if (editTodosMode) {
      todoList = [];
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
      setEditTodosList(todoList);
    }
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

  const saveTodosHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    if (loadedTodos) {
      sendRequest(
        loadedTodos? process.env.REACT_APP_DATABASE_URL+`/2023-06-05/todos/${loadedTodos.id}.json`
        : process.env.REACT_APP_DATABASE_URL+"https://my-scheduler-9a484-default-rtdb.firebaseio.com/my-scheduler/2023-06-05/todos.json",
        loadedTodos ? "PUT" : "POST",loadedTodos.todos, loadedTodos.todos, "SAVE_TODOS" );
    } else {
      alert("저장할 데이터가 없습니다.");
    }
    setEditTodosMode(false);
  };

  const addTodoHandler = () => {
    if (loadedTodos) {
      setLoadedTodos({
        id: loadedTodos.id,
        todos: [
          ...loadedTodos.todos,
          { todo: todoRef.current?.value || "", checked: false },
        ],
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
            <ul>{editTodosList}</ul>

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
