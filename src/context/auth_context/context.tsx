import { createContext } from 'react';
import { AuthContextValue } from 'src/types';

/**
 * AuthContext
 *
 * Provides a React context for authentication state and actions.
 * - Stores the authentication-related values and methods defined in `AuthContextValue`.
 * - Initialized with `undefined` and should be wrapped by an AuthProvider for usage.
 */
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export default AuthContext;
