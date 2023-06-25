

import axios from "axios";
import React, { createContext, useState } from "react";

const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [Post, setPost] = useState("salam");

  const getPost = async () => {
    let res = await axios.get("http://localhost:3000/Posts")
    console.log(res);
  }

  const getPostById = async (id) => {
    let res = await axios.get(`http://localhost:3000/Posts/${id}`)
    console.log(res);

  }
  const deletePostById = async (id) => {
    let res = await axios.delete(`http://localhost:3000/Posts/${id}`)
    console.log(res);
  }
  const AddPost = async (id) => {
    let res = await axios.post(`http://localhost:3000/Posts/`)
    console.log(res);
  }

  const exportData = {
    Post,
    getPost,
    getPostById,
    deletePostById,
    AddPost
  }

  return (
    <PostContext.Provider value={exportData}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
