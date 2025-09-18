import { FC, useEffect } from 'react';
import { ToastItem } from 'src/types';
import { Button } from '../button';

/**
 * Toasts Component
 *
 * Displays a list of toast notifications in the bottom-right corner of the screen.
 * - Automatically removes each toast after 3.5 seconds.
 * - Allows manual dismissal via a close button.
 * - Supports different visual styles based on toast type (`success`, `error`, or default/info).
 * - Uses `aria-live="polite"` and `aria-atomic="true"` for accessible live region updates.
 */
const Toasts: FC<{ items: ToastItem[]; onRemove: (id: string) => void }> = ({
  items,
  onRemove,
}) => {
  useEffect(() => {
    const timers = items.map((t) => setTimeout(() => onRemove(t.id), 3500));
    return () => timers.forEach(clearTimeout);
  }, [items, onRemove]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[60]" aria-live="polite" aria-atomic="true">
      <div className="absolute bottom-4 right-4 space-y-2 w-[320px]">
        {items.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto rounded border px-3 py-2 shadow bg-white ${
              t.type === 'success'
                ? 'border-green-300'
                : t.type === 'error'
                  ? 'border-red-300'
                  : 'border-blue-300'
            }`}
            role="status"
          >
            <div className="flex items-center justify-between gap-2">
              <span
                className={`text-sm ${t.type === 'success' ? 'text-green-500' : t.type === 'error' ? 'text-red-500' : 'text-blue-500'}`}
              >
                {t.message}
              </span>

              <Button
                variant="text"
                aria-label="Dismiss notification"
                onClick={() => onRemove(t.id)}
                className={`${
                  t.type === 'success'
                    ? 'text-green-500'
                    : t.type === 'error'
                      ? 'text-red-500'
                      : 'text-blue-500'
                }`}
              >
                &times;
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toasts;
