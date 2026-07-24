import React, { createContext, useState } from "react";
export const useContext = createContext();

const UseContextProvider = (props) => {
  const [user, setUser] = useState(null);

  return (
    <>
      <useContext.Provider value={{ user, setUser }}>
        {props.children}
      </useContext.Provider>
    </>
  );
};

export default UseContextProvider;
