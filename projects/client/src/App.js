import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home';
import VerifyEmailForm from './Pages/EmailVerification';
import LoginCard from './Pages/Login';
import ErrorPage from './Pages/ErrorPage';
import Register from './Pages/Register';
import ResetPasswordRequest from './Pages/ResetPasswordRequest';

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
  {
    path: '/forgotpassword',
    element: <ResetPasswordRequest />,
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
