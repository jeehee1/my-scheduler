import { useContext, useEffect, useState } from "react";
import EditTodos from "./EditTodos";
import { ModeContext } from "../../context/mode-context";
import ShowTodos from "./ShowTodos";
import Title from "../../layout/Title";

const Todos = ({ user }: { user: string }) => {
  const modeCtx = useContext(ModeContext);

  return (
    <>
      <Title>Todos</Title>
      {modeCtx.editMode ? <EditTodos user={user}/> : <ShowTodos user={user}/>}
    </>
  );
};

export default Todos;
