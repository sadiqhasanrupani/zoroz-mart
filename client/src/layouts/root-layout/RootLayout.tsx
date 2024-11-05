import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';

//^ http
import { verifyToken } from '@/http/get';
import { getAuthToken } from '@/lib/is-auth';
import Spinner from '@/components/ui-component/spinner/Spinner';

export default function RootLayout() {
  const navigate = useNavigate();
  const token = getAuthToken();

  const {
    isLoading: verifyTokenIsLoading,
    isError: verifyTokenIsError,
    error: verifyTokenError,
    refetch: verifyTokenRefetch,
  } = useQuery<any, any>({
    queryKey: ['get-verify-token'],
    queryFn: ({ signal }) => verifyToken({ signal }),
    gcTime: 0,
    staleTime: Infinity,
    enabled: token !== null,
  });

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }

    // eslint-disable-next-line
  }, [navigate]);

  useEffect(() => {
    verifyTokenRefetch();
    // eslint-disable-next-line
  }, [navigate]);

  useEffect(() => {
    if (verifyTokenIsError) {
      if (verifyTokenError.code === 401 || verifyTokenError.code === 500) {
        navigate('/login');
      }
    }
    // eslint-disable-next-line
  }, [verifyTokenIsError, verifyTokenError]);

  return (
    <div>
      {verifyTokenIsLoading ? (
        <div className="flex h-screen items-center justify-center">
          <Spinner className="w-10 h-10 text-slate-500" />
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
}
