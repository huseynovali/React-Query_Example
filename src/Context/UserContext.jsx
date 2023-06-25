

import axios from "axios";
import React, { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState("salam");

  const getUser = async () => {
    let res = await axios.get("http://localhost:3000/users")
    console.log(res);
  }

  const getUserById = async (id) => {
    let res = await axios.get(`http://localhost:3000/users/${id}`)
    console.log(res);

  }
  const deleteUserById = async (id) => {
    let res = await axios.delete(`http://localhost:3000/users/${id}`)
    console.log(res);
  }
  const AddUser = async (id) => {
    let res = await axios.post(`http://localhost:3000/users/`)
    console.log(res);
  }

  const exportData = {
    user,
    getUser,
    getUserById,
    deleteUserById,
    AddUser
  }

  return (
    <UserContext.Provider value={exportData}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
