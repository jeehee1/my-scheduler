import classes from "./Todos.module.css";
import { DUMMY_DATA } from "../data/DUMMY_DATA";
import { useContext, useEffect, useState } from "react";
import Card from "../layout/Card";
import Title from "../layout/Title";
import { typeTodo } from "../types/SchedulerType";
import { ModeContext } from "../context/mode-context";

const Todos = ({ todos }: { todos: typeTodo[] }) => {
  const modeCtx = useContext(ModeContext);

  const [editTodos, setEditTodos] = useState<boolean>(false);

  useEffect(() => {
    if (modeCtx.editMode === false) setEditTodos(false);
  }, [modeCtx.editMode]);

  let todoList = [];
  for (let i = 0; i < todos.length; i++) {
    todoList.push(
      <li key={todos[i].id}>
        <input
          type="checkbox"
          id={`${todos[i].id}`}
          className={classes.check}
          onChange={() => {
            console.log("clicked");
          }}
        />
        <label htmlFor={`${i}`} />
        <span
          className={
            todos[i].checked
              ? `${classes.content} ${classes.checked}`
              : classes.content
          }
        >
          {todos[i].todo}
        </span>
      </li>
    );
  }

  return (
    <>
      <Title>Todos</Title>
      <div
        onClick={() => {
          modeCtx.editMode && !editTodos && setEditTodos(true);
        }}
      >
        <Card >
          <div className={classes.todos}>
            {!editTodos && <ul>{todoList}</ul>}
            {/* {editTodos && <EditTodos todos={todos} />} */}
          </div>
        </Card>
      </div>
    </>
  );
};

export default Todos;
