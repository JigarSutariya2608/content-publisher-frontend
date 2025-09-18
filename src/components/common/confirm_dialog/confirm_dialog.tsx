import { FC, ReactNode } from 'react';
import { Button } from '@components/common/button';
import MESSAGES from '@constants/messages';
import { BaseModal } from '../base_modal';

type Props = {
  open: boolean;
  title?: string;
  description?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

/**
 * ConfirmDialog Component
 *
 * A reusable confirmation dialog built on top of BaseModal.
 * Displays an optional title, description, and action buttons for confirm and cancel.
 * Calls `onConfirm` when the confirm button is clicked and `onCancel` when cancel button or backdrop is clicked.
 */
const ConfirmDialog: FC<Props> = ({
  open,
  title,
  description,
  confirmText = MESSAGES.BUTTONS.CONFIRM,
  cancelText = MESSAGES.BUTTONS.CANCEL,
  onConfirm,
  onCancel,
}) => {
  return (
    <BaseModal open={open} onClose={onCancel} title={title}>
      {description && <div className="mb-4 text-sm text-gray-600">{description}</div>}
      <div className="flex justify-end gap-2">
        <Button type="button" className="btn btn-secondary" onClick={onCancel}>
          {cancelText}
        </Button>
        <Button type="button" className="btn btn-primary" onClick={onConfirm}>
          {confirmText}
        </Button>
      </div>
    </BaseModal>
  );
};

export default ConfirmDialog;
