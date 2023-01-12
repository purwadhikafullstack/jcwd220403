import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home';
import VerifyEmailForm from './Pages/EmailVerification';
import LoginCard from './Pages/Login';
import ErrorPage from './Pages/ErrorPage';
import Register from './Pages/Register';
import ResetPasswordRequest from './Pages/ResetPasswordRequest';
import HomeCard from './Components/Card';
import Footer from './Components/Footer';
import Category from './Components/Category';
import RequireAuth from './Components/RequireAuth';
import ResetPassword from './Pages/ResetPassword';
import User from './Pages/User';
import Users from './Pages/TestingUsers';
import PersistLogin from './Components/PersistLogin';
//host
import HostHome from './Pages/admin/HostHome';
import RegisterWelcome from './Components/Admin/RegisterWelcome';
import VerifyForm from './Pages/admin/VerifyForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: [<Category />, <HomeCard />, <Footer />],
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
      {
        path: '/forgotpassword',
        element: <ResetPasswordRequest />,
      },
      {
        path: '/resetpassword/:id/:token',
        element: <ResetPassword />,
      },

      //protected routes
      {
        element: <PersistLogin />,
        children: [
          {
            element: <RequireAuth />,
            children: [
              {
                path: '/user',
                element: <User />,
              },
              {
                path: '/users',
                element: <Users />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/registerTenant',
    element: <HostHome />,
    children: [
      {
        path: '/registerTenant',
        element: <RegisterWelcome />,
      },
      // {
      //   path: '/verifyHost',
      //   element: <VerifyForm />,
      // },
    ],
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
