import { createContext } from 'react';

/**
 * ToastContext
 *
 * Provides a React context for displaying toast notifications throughout the app.
 * - Exposes methods: `showSuccess`, `showError`, and `showInfo` for triggering corresponding toast messages.
 * - Initialized with `null` and should be wrapped by a ToastProvider for usage.
 */
const ToastContext = createContext<{
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showInfo: (message: string) => void;
} | null>(null);

export default ToastContext;
