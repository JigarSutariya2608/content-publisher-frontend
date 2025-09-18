import MESSAGES from '@constants/messages';
import ToastContext from '@context/toast_context/context';
import { useContext } from 'react';

/**
 * useToast Hook
 *
 * Custom hook to access the toast notification context (`ToastContext`).
 * - Returns context methods: `showSuccess`, `showError`, and `showInfo`.
 * - Throws an error if used outside of a `ToastProvider`.
 * - Simplifies triggering toast notifications within components.
 */
function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error(MESSAGES.HOOKS.TOAST.USE_TOAST);
  return ctx;
}

export default useToast;
