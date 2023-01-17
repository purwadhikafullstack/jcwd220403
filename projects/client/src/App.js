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
import PersistLogin from './Components/PersistLogin';
import HostHome from './Pages/admin/HostHome';
import RegisterWelcome from './Pages/admin/RegisterWelcome';
import VerifyForm from './Pages/admin/VerifyForm';
import HostDashboard from './Pages/admin/HostDashboard';
import RequireTenantRole from './Components/RequireTenantRole';
import BeTenant from './Pages/BeTenant';
import Dashboard from './Pages/Dashboard';
import BasicUsage from './Components/AlertSuccess';
import './Styles/swall.css';
import Category from './Components/Category';

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
        element: <PersistLogin />,
        children: [
          {
            path: '/',
            element: [
              <Category key={1} />,
              <HomeCard key={2} />,
              <Footer key={3} />,
            ],
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
                path: '/tenant',
                children: [
                  {
                    path: 'dashboard',
                    element: <Dashboard />,
                  },
                  {
                    path: '/add-property',
                    element: <BeTenant />,
                  },
                ],
              },
            ],
          },
        ],
      },
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
