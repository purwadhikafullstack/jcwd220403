import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home';
import VerifyEmailForm from './Pages/EmailVerification';
import LoginCard from './Pages/Login';
import ErrorPage from './Pages/ErrorPage';
import Register from './Pages/Register';
import ResetPasswordRequest from './Pages/ResetPasswordRequest';
import HomeCard from './Components/Card';
import Footer from './Components/Footer';
import RequireAuth from './Components/RequireAuth';
import ResetPassword from './Pages/ResetPassword';
import Profile from './Pages/Profile';
import Users from './Pages/TestingUsers';
import PersistLogin from './Components/PersistLogin';
import HostHome from './Pages/admin/HostHome';
import RegisterWelcome from './Pages/admin/RegisterWelcome';
import VerifyForm from './Pages/admin/VerifyForm';
import HostDashboard from './Pages/admin/HostDashboard';
import RequireTenantRole from './Components/RequireTenantRole';
import BeTenant from './Pages/BeTenant';
import Dashboard from './Pages/Dashboard';
import BasicUsage from './Components/AlertSuccess';
import DetailPages from './Pages/DetailPage';
import './Styles/swall.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
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
      {
        path: '/detailpage',
        element: <DetailPages />,
      },
      {
        element: <PersistLogin />,
        children: [
          {
            path: '/',
            element: [<HomeCard />, <BasicUsage />, <Footer />],
          },
          {
            element: <RequireAuth />,
            children: [
              {
                path: '/user',
                element: <Profile />,
              },
            ],
          },
        ],
      },
    ],
  },
  //tenant
  {
    element: <PersistLogin />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          {
            element: <HostHome />,
            children: [
              {
                path: '/register-tenant',
                element: <RegisterWelcome />,
              },
              {
                path: '/verify-tenant',
                element: <VerifyForm />,
              },
              {
                element: <RequireTenantRole />,
                children: [
                  {
                    path: '/tenant',
                    element: <Dashboard/>
                  },
                  {
                    path: '/createtenant',
                    element: <BeTenant />,
                  },
                ],
                path: '/users',
                element: <Users />,
              },
            ],
          },
        ],
      },
    ],
  },
  // {
  //   path: '/createtenant',
  //   element: <BeTenant />,
  // },
  // {
  //   path: '/dashboard',
  //   element: <Dashboard />,
  // },
  //tenant
  {
    element: <PersistLogin />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          {
            element: <HostHome />,
            children: [
              {
                path: '/register-tenant',
                element: <RegisterWelcome />,
              },
              {
                path: '/verify-tenant',
                element: <VerifyForm />,
              },
              {
                element: <RequireTenantRole />,
                children: [
                  {
                    path: '/tenant',
                    element: <HostDashboard />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/tenant',
    element: <BeTenant />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
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
