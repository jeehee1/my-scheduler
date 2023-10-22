import classes from "./Todos.module.css";
import { useCallback, useEffect, useState } from "react";
import { typeTodo } from "../../types/SchedulerType";
import Card from "../../layout/Card";

const EditTodos = ({
  todosInfo,
  saveTodos,
  isEditting,
}: {
  todosInfo: {
    id: string | null;
    todos: typeTodo[];
  } | null;
  saveTodos: (
    newTodos: {
      id: string | null;
      todos: typeTodo[];
    } | null
  ) => void;
  isEditting: boolean;
}) => {
  const [existedTodos, setExistedTodos] = useState<{
    id: string | null;
    todos: typeTodo[];
  } | null>(todosInfo);
  const [todoInput, setTodoInput] = useState<string>("");

  // 에딧 모드 변경시 추가되거나 제거된 todo 복구
  useEffect(() => {
    todosInfo !== existedTodos && setExistedTodos(todosInfo);
  }, [todosInfo, isEditting]);

  // todo 추가하기
  const addTodoHandler = useCallback(() => {
    if (todoInput.length < 1) {
      alert("todo를 입력해주세요.");
      return;
    }
    // 1. 저장된 데이터가 있고 추가
    if (existedTodos && existedTodos.todos.length > 0) {
      setExistedTodos({
        id: existedTodos.id,
        todos: [...existedTodos.todos, { todo: todoInput, checked: false }],
      });
      setTodoInput("");
      // 2. 저장된 데이터가 없고 추가
    } else {
      setExistedTodos({
        id: null,
        todos: [{ todo: todoInput, checked: false }],
      });
      setTodoInput("");
    }
  }, [existedTodos, todoInput]);

  // 삭제할 todo 리스트를 loadedTodos에서 삭제 후 existedTodos 재설정
  const deleteTodoHandler = useCallback(
    (i: number) => {
      //1. 저장된 todos Id가 없고 추가한 todo를 다시 삭제하는 경우
      //2. 저장된 todos Id가 없고 추가한 todo를 모두 삭제하는 경우
      //3. 저장된 todos Id가 있고 todo를 삭제하는 경우
      //4. 저장된 todos Id가 있고 todo를 모두 삭제하는 경우
      if (existedTodos) {
        const newTodos = [...existedTodos.todos];
        setExistedTodos({
          id: existedTodos.id ? existedTodos.id : null,
          todos: newTodos,
        });
      } else {
        return alert("삭제할 todo가 없습니다.");
      }
    },
    [existedTodos]
  );

  // todo 리스트 뷰 모드
  const todoList = [];
  if (!isEditting && todosInfo && todosInfo?.todos.length > 0) {
    for (let i = 0; i < todosInfo.todos.length; i++) {
      todoList.push(
        <li key={i}>
          <span
            className={
              todosInfo.todos[i].checked
                ? `${classes.content} ${classes.checked}`
                : classes.content
            }
          >
            {todosInfo.todos[i].todo}
          </span>
        </li>
      );
    }
  } else if (isEditting && existedTodos && existedTodos.todos.length > 0) {
    // todo리스트 에딧 모드
    // 데이터가 존재할때
    for (let i = 0; i < existedTodos.todos.length; i++) {
      todoList.push(
        <li key={i} className={classes["edit-list"]}>
          <p key={i}>{existedTodos.todos[i].todo}</p>
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

  return (
    <div className={classes.todos}>
      {isEditting && (
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
      <ul>{todoList}</ul>
      {isEditting && (
        <button
          onClick={() => saveTodos(existedTodos)}
          className={classes["submit-btn"]}
        >
          저장!
        </button>
      )}
    </div>
  );
};

export default EditTodos;
