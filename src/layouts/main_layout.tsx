import { Link, Outlet, useNavigate } from 'react-router-dom';

import { Button } from '@components/common/button';
import useAuth from '@hooks/use_auth';
import MESSAGES from '@constants/messages';
import { ROUTES } from '@constants/config';
import { FC } from 'react';

/**
 * MainLayout Component
 *
 * Defines the primary layout for the application including header, navigation, and main content area.
 * - Uses `useAuth` to check authentication status and handle logout.
 * - Provides skip-to-content link for keyboard accessibility.
 * - Renders navigation links conditionally based on authentication state.
 * - Uses `Outlet` from React Router to render nested routes inside the main content area.
 * - Provides consistent styling and structure for all pages wrapped by this layout.
 */
const MainLayout: FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.ROOT);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Skip to content for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white text-blue-700 px-3 py-1 rounded shadow"
      >
        {MESSAGES.APP.SKIP_TO_MAIN_CONTENT}
      </a>
      <header className="border-b bg-white" role="banner">
        <div className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
          <Link to={ROUTES.ROOT} className="font-semibold">
            {MESSAGES.APP.TITLE}
          </Link>
          <nav className="flex items-center gap-3" aria-label="Primary">
            <Link to={ROUTES.ROOT}>{MESSAGES.NAVIGATION.HOME}</Link>
            {isAuthenticated ? (
              <>
                <Link to={ROUTES.DASHBOARD}>{MESSAGES.NAVIGATION.DASHBOARD}</Link>
                <Button onClick={handleLogout}>{MESSAGES.NAVIGATION.LOGOUT}</Button>
              </>
            ) : (
              <Link to={ROUTES.LOGIN}>{MESSAGES.NAVIGATION.LOGIN}</Link>
            )}
          </nav>
        </div>
      </header>
      <main id="main-content" className="mx-auto max-w-5xl px-4 py-6" role="main" tabIndex={-1}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
