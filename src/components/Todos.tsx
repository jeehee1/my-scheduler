import classes from "./Todos.module.css";
import { DUMMY_DATA } from "../data/DUMMY_DATA";
import { useState } from "react";
import Card from "../layout/Card";
import Title from "../layout/Title";
import { Todo } from "../types/SchedulerType";
import EditMessage from "../layout/EditMessage";

const Todos = ({ todos }: { todos: Todo[] }) => {
  const [editTodos, setEditTodos] = useState<boolean>(false);

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
      <Card editting={editTodos}>
        <div className={classes.todos}>
          <ul>{todoList}</ul>
        </div>
      </Card>
    </>
  );
};

export default Todos;
