import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import VerifyEmailForm from './Pages/EmailVerification';
import LoginCard from './Pages/Login';
import Home from './Pages/Home';
import ErrorPage from './Pages/ErrorPage';
import Register from './Pages/Register';

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
    element: <Register />,
  },
  {
    path: '/verification/:token',
    element: <VerifyEmailForm />,
  },
  {
    path: '/login',
    element: <LoginCard />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
