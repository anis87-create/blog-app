import { useEffect } from 'react';
import { useAppDispatch } from './app/store';
import AppRouter from './router/AppRouter';
import { fetchMe } from './features/auth/authSlice';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const dispatch = useAppDispatch();
  useTheme(); // Initialize theme from localStorage on app start

  useEffect(() => {
    // Restore session on app start
    const token = localStorage.getItem('accessToken');
    if (token) {
      dispatch(fetchMe());
    }
  }, [dispatch]);

  return <AppRouter />;
}
