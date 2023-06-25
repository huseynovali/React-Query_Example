

import React, { createContext, useState } from "react";

const CommonContext = createContext();

const CommonProvider = ({ children }) => {
  const [user, setUser] = useState("salam");

  return (
    <CommonContext.Provider value={user}>
      {children}
    </CommonContext.Provider>
  );
};

export { CommonContext, CommonProvider};
