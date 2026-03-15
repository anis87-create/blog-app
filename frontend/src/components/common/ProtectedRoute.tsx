import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../app/store';

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAppSelector((s) => s.auth);
  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
}
