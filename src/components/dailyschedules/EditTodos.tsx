import classes from "./Todos.module.css";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import useHttp from "../../hooks/use-http";
import { typeTodo } from "../../types/SchedulerType";
import { DateContext } from "../../context/date-context";
import Card from "../../layout/Card";

const EditTodos = ({ user }: { user: string }) => {
  const [editTodosMode, setEditTodosMode] = useState<boolean>(false);
  const dateCtx = useContext(DateContext);
  const [todosList, setTodosList] = useState<JSX.Element[]>([]);
  const [loadedTodos, setLoadedTodos] = useState<{
    id: string | null;
    todos: typeTodo[];
  } | null>(null);
  const [todoInput, setTodoInput] = useState<string>("");
  const { sendRequest, data, error, loading, extra, identifier } = useHttp();

  useEffect(() => {
    switch (identifier) {
      // todos는 id 키값에 todos 객체 배열로 저장된 상태
      // ex) {"-Ne60vPqJEENlnBWHgTp":[{"checked":false,"todo":"gawefawe"},{"checked":false,"todo":"gwehtyheraef"},{"checked":false,"todo":"fwdqwQ"}]}
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
          console.log(data);
          const todosData =
            loadedTodos && loadedTodos.id
              ? { id: loadedTodos.id, todos: extra }
              : { id: data.name, todos: extra };
          setLoadedTodos(todosData);
        }
        break;
      case "DELETE_ALL_TODOS":
        setLoadedTodos(null);
        break;
      default:
        break;
    }
  }, [data, identifier, loading, extra]);
  // todo 리스트 받아오기
  useEffect(() => {
    console.log("first");
    sendRequest(
      process.env.REACT_APP_DATABASE_URL +
        `/my-scheduler/${user}/${dateCtx.selectedDate}/todos.json`,
      "GET",
      null,
      null,
      "GET_TODOS"
    );
  }, [dateCtx.selectedDate]);

  // todo 추가하기
  const addTodoHandler = () => {
    if (todoInput.length < 1) {
      alert("todo를 입력해주세요.");
      return;
    }
    // 1. 저장된 데이터가 없고 추가
    if (loadedTodos && loadedTodos.todos.length > 0) {
      setLoadedTodos({
        id: loadedTodos.id,
        todos: [...loadedTodos.todos, { todo: todoInput, checked: false }],
      });
      setTodoInput("");
      // 2. 저장된 데이터가 있고 추가
    } else {
      setLoadedTodos({
        id: null,
        todos: [{ todo: todoInput, checked: false }],
      });
      setTodoInput("");
    }
    console.log(loadedTodos);
  };

  // 삭제할 todo 리스트를 loadedTodos에서 삭제 후 loadedTodos 재설정
  const deleteTodoHandler = (i: number) => {
    //1. 저장된 todos Id가 없고 추가한 todo를 다시 삭제하는 경우
    //2. 저장된 todos Id가 없고 추가한 todo를 모두 삭제하는 경우
    //3. 저장된 todos Id가 있고 todo를 삭제하는 경우
    //4. 저장된 todos Id가 있고 todo를 모두 삭제하는 경우
    if (loadedTodos) {
      const newTodos = [...loadedTodos.todos];
      const deletedTodos = newTodos.splice(i, 1);
      setLoadedTodos({
        id: loadedTodos.id ? loadedTodos.id : null,
        todos: newTodos,
      });
    } else {
      return alert("삭제할 todo가 없습니다.");
    }
  };

  const saveTodosHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // loadedTodos에 대하여
    //1. id가 없고 todos만 있는 경우 - post method로 todos 리스트 생성
    //2. id가 있고 todos도 있는 경우 - put method로 todos 추가
    if (loadedTodos && loadedTodos.todos.length > 0) {
      sendRequest(
        loadedTodos.id
          ? process.env.REACT_APP_DATABASE_URL +
              `/my-scheduler/${user}/${dateCtx.selectedDate}/todos/${loadedTodos.id}.json`
          : process.env.REACT_APP_DATABASE_URL +
              `/my-scheduler/${user}/${dateCtx.selectedDate}/todos.json`,
        loadedTodos.id ? "PUT" : "POST",
        loadedTodos.todos,
        loadedTodos.todos,
        "SAVE_TODOS"
      );
      console.log("updated todos exsits");
    }
    //3. id가 있고 todos가 없는 경우 - delete all todos
    else if (loadedTodos && loadedTodos.id && loadedTodos.todos.length === 0) {
      sendRequest(
        process.env.REACT_APP_DATABASE_URL +
          `/my-scheduler/${user}/${dateCtx.selectedDate}/todos/${loadedTodos.id}.json`,
        "DELETE",
        null,
        null,
        "DELETE_ALL_TODOS"
      );
      console.log("delete all todos");
    }
    //4. id가 없고 todos가 없는 경우 - return null
    else {
      return alert("저장할 todos list가 없습니다");
    }
    setEditTodosMode(false);
  };

  console.log(loadedTodos);

  useEffect(() => {
    // todo 리스트 뷰 모드
    const todoList = [];
    if (!editTodosMode && loadedTodos && loadedTodos?.todos.length > 0) {
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
    } else if (editTodosMode && loadedTodos && loadedTodos.todos.length > 0) {
      // todo리스트 에딧 모드
      // 데이터가 존재할때
      for (let i = 0; i < loadedTodos.todos.length; i++) {
        todoList.push(
          <li key={i} className={classes["edit-list"]}>
            <p key={i}>{loadedTodos.todos[i].todo}</p>
            <button
              className={classes["delete-btn"]}
              onClick={() => deleteTodoHandler(i)}
            >
              빼기
            </button>
          </li>
        );
      }
    } else {
      // todos가 존재하지 않을때
      todoList.push(<p>아직 등록된 Todo가 없습니다.</p>);
    }
    setTodosList(todoList);
  }, [editTodosMode, loadedTodos]);

  //수정한 todo list 저장

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
