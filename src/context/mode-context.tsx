import React, { useState } from "react";

type ModeContextObj = {
  mode: string;
  editMode: () => void;
  viewMode: () => void;
};

export const ModeContext = React.createContext<ModeContextObj>({
  mode: "view",
  editMode: () => {},
  viewMode: () => {},
});

const ModeContextProvider = ({ children }: { children: any }) => {
  const [pageMode, setPageMode] = useState<string>("view");

  const editModeHandler = () => {
    setPageMode("edit");
  };
  const viewModeHandler = () => {
    setPageMode("view");
  };

  const contextMode: ModeContextObj = {
    mode: pageMode,
    editMode: editModeHandler,
    viewMode: viewModeHandler,
  };

  return (
    <ModeContext.Provider value={contextMode}>{children}</ModeContext.Provider>
  );
};

export default ModeContextProvider;
