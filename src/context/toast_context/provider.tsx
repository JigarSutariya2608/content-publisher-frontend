import { ToastItem, ToastType } from 'src/types';
import { FC, ReactNode, useCallback, useMemo, useState } from 'react';
import ToastContext from './context';
import { Toasts } from '@components/common/toasts';

/**
 * ToastProvider Component
 *
 * Provides toast notification functionality to the app via `ToastContext`.
 * - Manages a list of toast items (`items`) with unique IDs.
 * - Exposes `showSuccess`, `showError`, and `showInfo` methods to trigger notifications.
 * - Automatically renders the `Toasts` component to display current notifications.
 * - Supports removing individual toasts when they expire or are dismissed.
 * - Wraps children components to provide context for app-wide toast usage.
 */
const ToastProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<ToastItem[]>([]);

  const push = useCallback((type: ToastType, message: string) => {
    setItems((prev) => [{ id: Math.random().toString(36).slice(2), type, message }, ...prev]);
  }, []);

  const showSuccess = useCallback((m: string) => push('success', m), [push]);
  const showError = useCallback((m: string) => push('error', m), [push]);
  const showInfo = useCallback((m: string) => push('info', m), [push]);

  const remove = useCallback(
    (id: string) => setItems((prev) => prev.filter((i) => i.id !== id)),
    []
  );

  const value = useMemo(
    () => ({ showSuccess, showError, showInfo }),
    [showSuccess, showError, showInfo]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toasts items={items} onRemove={remove} />
    </ToastContext.Provider>
  );
};

export default ToastProvider;
