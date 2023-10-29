import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [status,setStatus] = useState("afk");
  const [view,setView] = useState("main");
  const [bet,setBet] = useState(0);
  const [table,setTable] = useState(null);
  const [id,setID] = useState("");
  const contextValue = {
    status,
    setStatus: (status) => setStatus(status),
    view,
    setView:(view)=> setView(view),
    bet,
    setBet,
    table,
    setTable,
    id,
    setID
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };