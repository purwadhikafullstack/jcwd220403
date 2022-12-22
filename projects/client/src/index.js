import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import SignupCard from './Pages/SignUp';
import VerifyEmailForm from './Pages/EmailVerification';
import LoginCard from './Pages/Login';
import Home from './Pages/Home';
import SignupPortal from './Pages/SignupPortal';
import ErrorPage from './Pages/ErrorPage';
import Register from './Pages/Register_Test';
import SignupCopy from './Pages/SignUp_copy';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/app',
    element: <App />,
  },
  {
    path: '/register',
    element: <SignupCard />,
  },
  {
    path: '/register_test',
    element: <Register />,
  },
  {
    path: '/register_copy',
    element: <SignupCopy />,
  },
  {
    path: '/verification/:token',
    element: <VerifyEmailForm />,
  },
  {
    path: '/login',
    element: <LoginCard />,
  },
  {
    path: '/test',
    element: <SignupPortal />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ChakraProvider>
);
<<<<<<< HEAD
=======

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
>>>>>>> 67fa754 (Fix: folder structure Feat-HOL-2 (#5))
