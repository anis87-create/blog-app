import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../app/store';
import { setTokenFromOAuth, fetchMe } from '../features/auth/authSlice';
import Loader from '../components/ui/Loader';

export default function OAuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      dispatch(setTokenFromOAuth(token));
      dispatch(fetchMe()).then(() => navigate('/'));
    } else {
      navigate('/login?error=oauth_failed');
    }
  }, []);

  return <Loader />;
}
