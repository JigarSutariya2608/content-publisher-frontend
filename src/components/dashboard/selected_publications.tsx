import { ItemByIdType, SelectedPublicationType, SelectedType } from 'src/types';
import { FC } from 'react';
import SelectedPublicationItem from './selected_publication_item';
import MESSAGES from '@constants/messages';
import { Button } from '@components/common';

/**
 * SelectedPublications Component
 *
 * Displays a list of currently selected publications as badges with remove buttons.
 * - Uses `SelectedPublicationItem` for each selected publication.
 * - Provides a bulk action button to delete or undo deletion of selected items.
 * - Supports accessibility with `role="region"` and `aria-label` for the container.
 * - Dynamically handles items using `selected` set and `itemsById` mapping.
 */
const SelectedPublications: FC<{
  selected: SelectedType;
  itemsById: ItemByIdType;
  showDeleted: boolean;
  confirmBulkDelete: () => void;
  toggleSelect: (p: SelectedPublicationType) => void;
}> = ({ selected, itemsById, showDeleted, confirmBulkDelete, toggleSelect }) => {
  return (
    <>
      {selected.size > 0 && (
        <div className="flex flex-wrap gap-2" role="region" aria-label="Selected publications">
          {Array.from(selected.values()).map((sel) => {
            const item = itemsById.get(sel.id) ?? sel;

            return (
              <SelectedPublicationItem
                key={item.id}
                item={item}
                defaultStatus={MESSAGES.DASHBOARD.SELECTED_TAG}
                onRemove={toggleSelect}
              />
            );
          })}
        </div>
      )}
      {selected.size > 0 && (
        <>
          <Button variant="secondary" onClick={confirmBulkDelete}>
            {showDeleted ? MESSAGES.BUTTONS.UNDO_DELETED : MESSAGES.BUTTONS.DELETE_SELECTED}
          </Button>
        </>
      )}
    </>
  );
};

export default SelectedPublications;
