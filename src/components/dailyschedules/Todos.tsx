import { useCallback, useContext, useEffect, useState } from "react";
import EditTodos from "./EditTodos";
import { ModeContext } from "../../context/mode-context";
import ShowTodos from "./ShowTodos";
import Title from "../../layout/Title";
import { typeTodo } from "../../types/SchedulerType";
import useHttp from "../../hooks/use-http";
import { DateContext } from "../../context/date-context";
import Card from "../../layout/Card";
import Spinner from "../../layout/Spinner";

const Todos = ({ user }: { user: string }) => {
  const dateCtx = useContext(DateContext);
  const modeCtx = useContext(ModeContext);
  const { sendRequest, data, error, loading, extra, identifier } = useHttp();
  const [loadedTodos, setLoadedTodos] = useState<{
    id: string | null;
    todos: typeTodo[];
  } | null>(null);
  const [editTodosMode, setEditTodosMode] = useState<boolean>(false);

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
        if (data && !loading && !error) {
          setLoadedTodos({ id: loadedTodos!.id, todos: extra });
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

  // 초기 화면 렌더링시 todo list 불러오기
  useEffect(() => {
    sendRequest(
      process.env.REACT_APP_DATABASE_URL +
        `/my-scheduler/${user}/${dateCtx.selectedDate}/todos.json`,
      "GET",
      null,
      null,
      "GET_TODOS"
    );
  }, [dateCtx.selectedDate, user, process.env.REACT_APP_DATABASE_URL]);

  // TODO 체크 기능 - 클릭시마다 데이터 연동
  const checkTodoHandler = (i: number) => {
    const checkedTodos = [...loadedTodos!.todos];
    const splicedTodo = checkedTodos!.splice(i, 1, {
      todo: loadedTodos!.todos[i].todo,
      checked: !loadedTodos!.todos[i].checked,
    });
    sendRequest(
      process.env.REACT_APP_DATABASE_URL +
        `/my-scheduler/${user}/${dateCtx.selectedDate}/todos/${
          loadedTodos!.id
        }.json`,
      "PUT",
      checkedTodos,
      checkedTodos,
      "CHECK_TODO"
    );
  };

  const saveTodosHandler = async (
    newTodos: {
      id: string | null;
      todos: typeTodo[];
    } | null
  ) => {
    // newTodos에 대하여
    //1. id가 없고 todos만 있는 경우 - post method로 todos 리스트 생성
    //2. id가 있고 todos도 있는 경우 - put method로 todos 추가
    if (newTodos && newTodos.todos.length > 0) {
      await sendRequest(
        newTodos.id
          ? process.env.REACT_APP_DATABASE_URL +
              `/my-scheduler/${user}/${dateCtx.selectedDate}/todos/${newTodos.id}.json`
          : process.env.REACT_APP_DATABASE_URL +
              `/my-scheduler/${user}/${dateCtx.selectedDate}/todos.json`,
        newTodos.id ? "PUT" : "POST",
        newTodos.todos,
        newTodos.todos,
        "SAVE_TODOS"
      );
      console.log("updated todos exsits");
    }
    //3. id가 있고 todos가 없는 경우 - delete all todos
    else if (newTodos && newTodos.id && newTodos.todos.length === 0) {
      await sendRequest(
        process.env.REACT_APP_DATABASE_URL +
          `/my-scheduler/${user}/${dateCtx.selectedDate}/todos/${newTodos.id}.json`,
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

  return (
    <>
      <Title>Todos</Title>
      <div onClick={() => modeCtx.editMode && setEditTodosMode(true)}>
        <Card editting={editTodosMode}>
          {loading && !error && <Spinner />}
          {modeCtx.editMode && !loading && !error && (
            <EditTodos
              isEditting={editTodosMode}
              todosInfo={loadedTodos}
              saveTodos={saveTodosHandler}
            />
          )}

          {!modeCtx.editMode && !loading && !error && (
            <ShowTodos
              todosInfo={loadedTodos}
              checkTodo={checkTodoHandler}
              user={user}
            />
          )}
          {error && <p>데이터를 불러올 수 없습니다</p>}
        </Card>
      </div>
      {modeCtx.editMode && editTodosMode && (
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

export default Todos;
