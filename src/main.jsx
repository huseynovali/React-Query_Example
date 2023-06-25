import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { CommonProvider } from './Context/CommonContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <CommonProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CommonProvider>
);
