import classes from "./Todos.module.css";
import { useContext, useEffect, useState } from "react";
import { typeTodo } from "../types/SchedulerType";
import useHttp from "../hooks/use-http";
import { DateContext } from "../context/date-context";
import Card from "../layout/Card";

const ShowTodos = () => {
  const dateCtx = useContext(DateContext);
  const [loadedTodos, setLoadedTodos] = useState<{
    id: string | null;
    todos: typeTodo[];
  } | null>();
  const [todosList, setTodosList] = useState<JSX.Element[]>([]);
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
    sendRequest(
      process.env.REACT_APP_DATABASE_URL +
        `/my-scheduler/${dateCtx.selectedDate}/todos.json`,
      "GET",
      null,
      null,
      "GET_TODOS"
    );
  }, [dateCtx.selectedDate]);

  // TODO 체크 기능 - 클릭시마다 데이터 연동
  const changeClickedHandler = (i: number) => {
    const checkedTodos = [...loadedTodos!.todos];
    const splicedTodo = checkedTodos!.splice(i, 1, {
      todo: loadedTodos!.todos[i].todo,
      checked: !loadedTodos!.todos[i].checked,
    });
    sendRequest(
      process.env.REACT_APP_DATABASE_URL +
        `/my-scheduler/${dateCtx.selectedDate}/todos/${loadedTodos!.id}.json`,
      "PUT",
      checkedTodos,
      checkedTodos,
      "CHECK_TODO"
    );
  };

  useEffect(() => {
    // todo 리스트 뷰 모드
    const todoList = [];
    if (loadedTodos) {
      for (let i = 0; i < loadedTodos.todos.length; i++) {
        todoList.push(
          <li key={i}>
            <>
              <>
                <input
                  type="checkbox"
                  id={`${loadedTodos.todos[i].todo}`}
                  className={classes.check}
                  onChange={() => changeClickedHandler(i)}
                  checked={loadedTodos.todos[i].checked}
                />
                <label htmlFor={`${loadedTodos.todos[i].todo}`} />
              </>
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
    setTodosList(todoList);
  }, [loadedTodos]);
  return (
    <div>
      <Card editting={false}>
        <div className={classes.todos}>
          <ul>{todosList}</ul>
        </div>
      </Card>
    </div>
  );
};

export default ShowTodos;
