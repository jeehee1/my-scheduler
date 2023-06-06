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

const Todos = () => {
  const modeCtx = useContext(ModeContext);
  const todoRef = useRef<HTMLInputElement>(null);
  const [loadedTodos, setLoadedTodos] = useState<{
    key: string;
    todos: typeTodo[];
  } | null>();
  const [editTodosMode, setEditTodosMode] = useState<boolean>(false);
  const [editTodosList, setEditTodosList] = useState<JSX.Element[]>([]);
  let todoList: JSX.Element[];

  const fetchTodos = useCallback(async () => {
    const response = await fetch(
      "https://my-scheduler-9a484-default-rtdb.firebaseio.com/my-scheduler/2023-06-05/todos.json"
    );
    const data = await response.json();
    if (data) {
      const todosData = {
        key: Object.keys(data)[0],
        todos: data[Object.keys(data)[0]],
      };
      console.log("todosData");
      setLoadedTodos(todosData);
    }
  }, []);

  useEffect(() => {
    const fetchedTodos = fetchTodos();
  }, []);

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
            <li key={i}>
              {loadedTodos.todos[i].todo}
              <button
                className={`${classes["todo-btn"]} ${classes.delete}`}
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
  }, [editTodosMode, loadedTodos]);

  const deleteTodoHandler = (i: number) => {
    const newTodos = [...loadedTodos!.todos];
    const deletedTodo = newTodos.splice(i, 1);
    console.log(deletedTodo);

    setLoadedTodos({
      key: loadedTodos!.key,
      todos: newTodos,
    });
  };
  console.log(loadedTodos);

  const saveTodosHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loadedTodos) {
      const response = await fetch(
        loadedTodos!.key
          ? `https://my-scheduler-9a484-default-rtdb.firebaseio.com/my-scheduler/2023-06-05/todos/${loadedTodos.key}.json`
          : "https://my-scheduler-9a484-default-rtdb.firebaseio.com/my-scheduler/2023-06-05/todos.json",
        {
          method: loadedTodos ? "PUT" : "POST",
          body: JSON.stringify(loadedTodos?.todos || null),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      console.log(data);
    } else {
      alert("저장할 데이터가 없습니다.");
    }
    setEditTodosMode(false);
  };

  const addTodoHandler = () => {
    if (loadedTodos) {
      setLoadedTodos({
        key: loadedTodos.key,
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
              <div>
                <input type="text" ref={todoRef} />
                <button
                  className={classes["todo-btn"]}
                  onClick={addTodoHandler}
                >
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
