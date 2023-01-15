import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireTenantRole = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.isTenant === true ? (
    <Outlet />
  ) : (
    <Navigate to='/register-tenant' state={{ from: location }} replace />
  );
};

export default RequireTenantRole;
