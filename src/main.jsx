import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './Context/UserContext.jsx';
import { PostProvider } from './Context/PostContext.jsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import "./index.css"

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <PostProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PostProvider>
    </UserProvider>
  </QueryClientProvider>
);
