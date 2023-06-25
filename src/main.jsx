import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './Context/UserContext.jsx';
import { PostProvider } from './Context/PostContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <PostProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PostProvider>
  </UserProvider>
);
