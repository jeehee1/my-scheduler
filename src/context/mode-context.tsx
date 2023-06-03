import React, { useState } from "react";

type ModeContextObj = {
  editMode: boolean;
  changeEditMode: () => void;
  changeViewMode: () => void;
};

export const ModeContext = React.createContext<ModeContextObj>({
  editMode: false,
  changeEditMode: () => {},
  changeViewMode: () => {},
});

const ModeContextProvider = ({ children }: { children: any }) => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const editModeHandler = () => {
    setEditMode(true);
  };
  const viewModeHandler = () => {
    setEditMode(false);
  };

  const contextMode: ModeContextObj = {
    editMode: editMode,
    changeEditMode: editModeHandler,
    changeViewMode: viewModeHandler,
  };

  return (
    <ModeContext.Provider value={contextMode}>{children}</ModeContext.Provider>
  );
};

export default ModeContextProvider;
