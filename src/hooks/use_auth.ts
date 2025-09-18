import MESSAGES from '@constants/messages';
import AuthContext from '@context/auth_context/context';
import { useContext } from 'react';

/**
 * useAuth Hook
 *
 * Custom hook to access authentication context (`AuthContext`).
 * - Returns the auth context value including `token`, `isAuthenticated`, `login`, and `logout`.
 * - Throws an error if used outside of an `AuthProvider`.
 * - Simplifies consuming authentication state and actions in components.
 */
const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error(MESSAGES.HOOKS.AUTH.USE_AUTH);
  return ctx;
};

export default useAuth;
