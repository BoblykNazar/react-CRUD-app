import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem('currentUser');

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};