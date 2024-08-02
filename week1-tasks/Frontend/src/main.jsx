import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import SignUp from './components/SignUp/SignUp.jsx';
import AccountManagement from './components/AccountManagement/AccountManagement.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';

// Set up the router with routes and corresponding components
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />  
      <Route path="login" element={<Login />} /> 
      <Route path="signup" element={<SignUp />} />  
      <Route path="dashboard" element={<Dashboard />} /> 
      <Route path="account-management" element={<AccountManagement />} />  
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
