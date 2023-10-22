import classes from "./Todos.module.css";
import { useEffect, useState } from "react";
import { typeTodo } from "../../types/SchedulerType";

const ShowTodos = ({
  todosInfo,
  checkTodo,
}: {
  user: string;
  todosInfo: {
    id: string | null;
    todos: typeTodo[];
  } | null;
  checkTodo: (id: number) => void;
}) => {
  const todoList: JSX.Element[] = [];
  console.log(todosInfo)
  // todos list가 존재하는 경우
  if (todosInfo) {
    for (let i = 0; i < todosInfo.todos.length; i++) {
      todoList.push(
        <li key={i}>
          <input
            type="checkbox"
            id={`${todosInfo.todos[i].todo}`}
            className={classes.check}
            onChange={() => checkTodo(i)}
            checked={todosInfo.todos[i].checked}
          />
          <label htmlFor={`${todosInfo.todos[i].todo}`} />
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
  }

  return (
    <>
      <div className={classes.todos}>
        {todosInfo && <ul>{todoList}</ul>}
        {!todosInfo && <p key="nodata">아직 등록된 Todo가 없습니다.</p>}
      </div>
    </>
  );
};

export default ShowTodos;
