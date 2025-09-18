import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { ROUTES, SEARCH_PARAMS } from '@constants/config';
import { FC } from 'react';
import useAuth from '@hooks/use_auth';

/**
 * PrivateRoute Component
 *
 * Protects routes by checking user authentication status.
 * - Renders the child component if the user is authenticated.
 * - Redirects unauthenticated users to the login page.
 * - Preserves the originally requested URL using query parameters for post-login navigation.
 */
const PrivateRoute: FC<{ children: JSX.Element }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (isAuthenticated) return children;
  const next = encodeURIComponent(`${location.pathname}${location.search}${location.hash}`);
  return <Navigate to={`${ROUTES.LOGIN}?${SEARCH_PARAMS.NEXT}=${next}`} replace />;
};

export default PrivateRoute;
