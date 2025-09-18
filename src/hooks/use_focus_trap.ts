import { useEffect, useCallback } from 'react';

type Options = {
  containerRef: React.RefObject<HTMLElement>;
  autoFocusRef?: React.RefObject<HTMLElement>;
  onEscape?: () => void;
  active?: boolean;
};

/**
 * Hook to trap keyboard focus within a container and optionally handle Escape key.
 *
 * @param containerRef - Ref of the element to trap focus inside
 * @param onEscape - Optional callback for Escape key
 * @param active - Whether focus trap is active (default: true)
 */
export function useFocusTrap({ containerRef, onEscape, active = true }: Options) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (!active) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onEscape?.();
        return;
      }

      if (e.key === 'Tab') {
        const focusables = containerRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables || focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    },
    [containerRef, onEscape, active]
  );

  useEffect(() => {
    if (!active) return;

    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleKey, active]);
}
