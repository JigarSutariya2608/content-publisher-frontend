import { STORAGE_KEYS } from '@constants/config';
import { getStorage, removeStorage, setStorage } from '@utils/storage';
import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import AuthContext from './context';

/**
 * AuthProvider Component
 *
 * Provides authentication state and actions to the app via `AuthContext`.
 * - Manages `token` state, persisting it in storage using utility functions.
 * - Exposes `login` and `logout` callbacks to update authentication state.
 * - Computes `isAuthenticated` based on the presence of a token.
 * - Wraps children components and supplies auth context values for app-wide usage.
 */
const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => getStorage(STORAGE_KEYS.TOKEN));

  useEffect(() => {
    if (token) setStorage(STORAGE_KEYS.TOKEN, token);
    else removeStorage(STORAGE_KEYS.TOKEN);
  }, [token]);

  const login = useCallback((t: string) => setToken(t), []);
  const logout = useCallback(() => setToken(null), []);

  const isAuthenticated = useMemo(() => Boolean(token), [token]);

  const value = useMemo(
    () => ({ token, isAuthenticated, login, logout }),
    [token, isAuthenticated, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
