import classes from "./Todos.module.css";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import useHttp from "../hooks/use-http";
import { typeTodo } from "../types/SchedulerType";
import { DateContext } from "../context/date-context";
import Card from "../layout/Card";

const EditTodos = () => {
  const [editTodosMode, setEditTodosMode] = useState<boolean>(false);
  const dateCtx = useContext(DateContext);
  const [todosList, setTodosList] = useState<JSX.Element[]>([]);

  const [loadedTodos, setLoadedTodos] = useState<{
    id: string | null;
    todos: typeTodo[];
  } | null>();
  const [todoInput, setTodoInput] = useState<string>("");
  const { sendRequest, data, error, loading, extra, identifier } = useHttp();

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
    sendRequest(
      process.env.REACT_APP_DATABASE_URL +
        `/${dateCtx.selectedDate}/todos.json`,
      "GET",
      null,
      null,
      "GET_TODOS"
    );
  }, [dateCtx.selectedDate]);

  const deleteTodoHandler = (i: number) => {
    const newTodos = [...loadedTodos!.todos];
    const deletedTodo = newTodos.splice(i, 1);
    console.log(deletedTodo);

    setLoadedTodos({
      id: loadedTodos!.id,
      todos: newTodos,
    });
  };

  useEffect(() => {
    // todo 리스트 뷰 모드
    const todoList = [];

    if (loadedTodos && !editTodosMode) {
      for (let i = 0; i < loadedTodos.todos.length; i++) {
        todoList.push(
          <li key={i}>
            <>
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
    } else if (!loadedTodos && !editTodosMode) {
      todoList.push(<p>아직 등록된 Todo가 없습니다.</p>);
    }

    if (editTodosMode) {
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
    } else {
    }
    setTodosList(todoList);
  }, [editTodosMode, loadedTodos]);

  // todo 추가하기
  const addTodoHandler = () => {
    if (todoInput.length < 1) {
      alert("todo를 입력해주세요.");
      return;
    }
    if (loadedTodos) {
      setLoadedTodos({
        id: loadedTodos.id,
        todos: [...loadedTodos.todos, { todo: todoInput, checked: false }],
      });
      setTodoInput("");
    } else {
      setLoadedTodos({
        id: null,
        todos: [{ todo: todoInput, checked: false }],
      });
      setTodoInput("");
    }
  };

  //수정한 todo list 저장
  const saveTodosHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loadedTodos) {
      sendRequest(
        loadedTodos.id
          ? process.env.REACT_APP_DATABASE_URL +
              `/${dateCtx.selectedDate}/todos/${loadedTodos.id}.json`
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
  console.log(todoInput);

  return (
    <>
      <div
        onClick={() => {
          setEditTodosMode(true);
        }}
      >
        <Card editting={editTodosMode}>
          <div className={classes.todos}>
            {editTodosMode && (
              <div className={classes["new-todo"]}>
                <input
                  type="text"
                  onChange={(todo) => setTodoInput(todo.target.value)}
                  value={todoInput}
                  required
                />
                <p>{todoInput}</p>
                <button className={classes["plus"]} onClick={addTodoHandler}>
                  +
                </button>
              </div>
            )}
            <ul>{todosList}</ul>
            {editTodosMode && (
              <form onSubmit={saveTodosHandler}>
                <button className={classes["submit-btn"]}>저장!</button>
              </form>
            )}
          </div>
        </Card>
      </div>
      {editTodosMode && (
        <button
          className="normal-btn cancel-btn"
          onClick={() => setEditTodosMode(false)}
        >
          돌아가기
        </button>
      )}
    </>
  );
};

export default EditTodos;
