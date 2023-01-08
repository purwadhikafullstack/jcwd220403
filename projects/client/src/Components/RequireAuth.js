import { useLocation, Navigate, Outlet } from 'react-router-dom';
import UseAuth from '../hooks/UseAuth';

const RequireAuth = () => {
  const { auth } = UseAuth();
  const location = useLocation();

  return auth?.loginData ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

export default RequireAuth;
