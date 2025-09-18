import { FC, ReactNode, useRef, useId } from 'react';
import { Button } from '@components/common/button';
import { useFocusTrap } from '@hooks/use_focus_trap';

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

/**
 * BaseModal Component
 *
 * A reusable modal component that displays content in a centered overlay.
 * Supports optional title, close button, and focus trapping for accessibility.
 * The modal only renders when `open` is true and closes on backdrop click or Escape key.
 */
const BaseModal: FC<Props> = ({ open, onClose, title, children }) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const titleId = useId();

  useFocusTrap({
    containerRef: dialogRef,
    onEscape: onClose,
    active: open,
  });

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      onClick={onClose}
    >
      <div
        className="bg-white rounded shadow-lg w-full max-w-lg p-4"
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between mb-3">
            <h3 id={titleId} className="text-lg font-semibold">
              {title}
            </h3>
            <Button
              className="h-7 w-7"
              type="button"
              aria-label="Close dialog"
              onClick={onClose}
              variant="secondary"
            >
              &times;
            </Button>
          </div>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default BaseModal;
