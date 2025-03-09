import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from "@react-oauth/google";
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
     <GoogleOAuthProvider clientId="168632945330-9nh6hfqmk0d6oont2p0i60gbfuaele20.apps.googleusercontent.com">
      <App />
      </GoogleOAuthProvider>
  </React.StrictMode>
);
reportWebVitals();
