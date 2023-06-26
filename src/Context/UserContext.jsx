

import axios from "axios";
import React, { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {

  const getUser = async () => {
    let res = await axios.get("http://localhost:3000/users")
    return res
  }

  const getUserById = async (id) => {
    let res = await axios.get(`http://localhost:3000/users/${id}`)
    return res

  }
  const deleteUserById = async (id) => {
    let res = await axios.delete(`http://localhost:3000/users/${id}`)
    return res
  }
  const AddUser = async (value) => {
    let res = await axios.post(`http://localhost:3000/users/`, value)
    return res
  }

  const exportData = {
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
