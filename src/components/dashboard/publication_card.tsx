import React, { useCallback } from 'react';
import { Button } from '@components/common/button';
import { PublicationStatusType, PublicationType } from 'src/types';
import { formatDate } from '@utils/format_date';
import MESSAGES from '@constants/messages';
import { PUBLICATION_STATUS } from '@constants/config';

interface Props {
  publication: PublicationType;
  selected: boolean;
  showDeleted: boolean;
  onToggleSelect: (p: PublicationType) => void;
  onStatusChange: (p: PublicationType, s: PublicationStatusType) => void;
  onEdit: (p: PublicationType) => void;
  onDelete: (id: string) => void;
}

/**
 * PublicationCard Component
 *
 * Displays a single publication with its title, content, last updated date, and status.
 * - Supports selection via a checkbox with visual indication when selected.
 * - Allows changing publication status using a dropdown.
 * - Provides Edit and Delete buttons with appropriate callbacks.
 * - Accessible with descriptive `aria-label`s for checkboxes and buttons.
 * - Designed to handle both single-column and responsive multi-column layouts.
 */
const PublicationCard: React.FC<Props> = ({
  publication: p,
  selected,
  showDeleted,
  onToggleSelect,
  onStatusChange,
  onEdit,
  onDelete,
}) => {
  const handleToggle = useCallback(() => onToggleSelect(p), [onToggleSelect, p]);
  const handleStatus = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) =>
      onStatusChange(p, e.target.value as PublicationStatusType),
    [onStatusChange, p]
  );
  const handleEdit = useCallback(() => onEdit(p), [onEdit, p]);
  const handleDelete = useCallback(() => onDelete(p.id), [onDelete, p.id]);

  return (
    <div className={`card ${selected ? 'ring-2 ring-red-300' : ''}`}>
      <div className="grid grid-cols-[auto_1fr] gap-3">
        <div className="row-span-2 flex items-start pt-[0.35rem]">
          <input
            type="checkbox"
            checked={selected}
            onChange={handleToggle}
            aria-label={`Select publication: ${p.title}`}
          />
        </div>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold">{p.title}</h3>
            <div className="text-sm text-gray-500">{formatDate(p.updatedAt)}</div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            {!showDeleted && (
              <>
                <select
                  className="input max-w-full sm:max-w-[160px] pr-10 appearance-none"
                  value={p.status}
                  onChange={handleStatus}
                  aria-label="Change publication status"
                >
                  <option value={PUBLICATION_STATUS.DRAFT}>{PUBLICATION_STATUS.DRAFT}</option>
                  <option value={PUBLICATION_STATUS.PUBLISHED}>
                    {PUBLICATION_STATUS.PUBLISHED}
                  </option>
                </select>

                <Button
                  variant="secondary"
                  onClick={handleEdit}
                  aria-label={`Edit publication: ${p.title}`}
                  type="button"
                >
                  {MESSAGES.BUTTONS.EDIT}
                </Button>
              </>
            )}

            <Button
              variant="secondary"
              onClick={handleDelete}
              aria-label={`Delete publication: ${p.title}`}
              type="button"
            >
              {showDeleted ? MESSAGES.BUTTONS.UNDO_DELETED : MESSAGES.BUTTONS.DELETE}
            </Button>
          </div>
        </div>
        <div className="col-start-2">
          <p className="mt-2 whitespace-pre-wrap">{p.content}</p>
        </div>
      </div>
    </div>
  );
};

export default PublicationCard;
