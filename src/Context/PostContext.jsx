

import axios from "axios";
import React, { createContext, useState } from "react";

const PostContext = createContext();

const PostProvider = ({ children }) => {
  const getPost = async () => {
    let res = await axios.get("http://localhost:3000/posts")
    return res
  }
  const getPostsByUserId = async (userId) => {
    let res = await axios.get(`http://localhost:3000/posts?userId=${userId}`)
    return res

  }
  const deletePostById = async (id) => {
    let res = await axios.delete(`http://localhost:3000/posts/${id}`)
    return res;
  }
  const AddPost = async (value) => {
    let res = await axios.post(`http://localhost:3000/posts/`, value)
    return res
  }

  const exportData = {
    getPost,
    getPostsByUserId,
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
