import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../../helpers';

export const ProtectedRoute = () => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};