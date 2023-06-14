import React, { useState } from "react";
import { format } from "date-fns";

type DateContextObj = {
  selectedDate: string;
  changeDate: (date: string) => void;
};

export const DateContext = React.createContext<DateContextObj>({
  selectedDate: "",
  changeDate: () => {},
});

const DateContextProvider = ({ children }: { children: any }) => {
  const [date, setDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));

  const changeDateHandler = (date: string) => {
    setDate(date);
  };

  const contextDate = {
    selectedDate: date,
    changeDate: changeDateHandler,
  };
  return <DateContext.Provider value={contextDate}>{children}</DateContext.Provider>;
};

export default DateContextProvider;