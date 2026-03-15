import { useEffect } from 'react';
import { useAppDispatch } from './app/store';
import AppRouter from './router/AppRouter';
import { fetchMe } from './features/auth/authSlice';

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Restore session on app start
    const token = localStorage.getItem('accessToken');
    if (token) {
      dispatch(fetchMe());
    }
  }, [dispatch]);

  return <AppRouter />;
}
