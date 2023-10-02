import React, { useState } from "react";

export const MonthContext = React.createContext({
  searchMonth: { year: 0, month: 0 },
  setMonth: (year: number, month: number) => {},
});

const MonthContextProvider = ({ children }: { children: any }) => {
  const [searchMonth, setSearchMonth] = useState({ year: 0, month: 0 });

  const setMonthHandler = (year: number, month: number) => {
    setSearchMonth({ year: year, month: month });
  };

  const contextMonth = {
    searchMonth: searchMonth,
    setMonth: setMonthHandler,
  };

  return (
    <MonthContext.Provider value={contextMonth}>
      {children}
    </MonthContext.Provider>
  );
};

export default MonthContextProvider;
