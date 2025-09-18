import React, { useCallback } from 'react';
import { PublicationStatusType } from 'src/types';
import MESSAGES from '@constants/messages';
import SearchBar from '@components/common/search_bar/search_bar';
import { PUBLICATION_STATUS } from '@constants/config';

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
  status: '' | PublicationStatusType;
  onStatusChange: (v: '' | PublicationStatusType) => void;
  showDeleted: boolean;
  onShowDeletedChange: (v: boolean) => void;
}

/**
 * FiltersBar Component
 *
 * Provides a set of controls for filtering publications.
 * - Includes a search input for filtering by text.
 * - Includes a dropdown to filter by publication status (Draft, Published, or All).
 * - Includes a checkbox to toggle visibility of deleted publications.
 * - Uses callback props to notify parent components of changes in search, status, or deleted filter state.
 * - Fully accessible with appropriate `aria-label`s for screen readers.
 */
const FiltersBar: React.FC<Props> = ({
  search,
  onSearchChange,
  status,
  onStatusChange,
  showDeleted,
  onShowDeletedChange,
}) => {
  const handleSearch = useCallback((v: string) => onSearchChange(v), [onSearchChange]);
  const handleStatus = useCallback(
    (v: '' | PublicationStatusType) => onStatusChange(v),
    [onStatusChange]
  );
  const handleShowDeleted = useCallback(
    (v: boolean) => onShowDeletedChange(v),
    [onShowDeletedChange]
  );

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <SearchBar
        value={search}
        onChange={handleSearch}
        ariaLabel={MESSAGES.DASHBOARD.SEARCH_PLACEHOLDER}
        placeholder={MESSAGES.DASHBOARD.SEARCH_PLACEHOLDER}
      />
      <select
        className="input max-w-[180px] pr-10 appearance-none"
        value={status}
        onChange={(e) => handleStatus(e.target.value as any)}
        aria-label={MESSAGES.DASHBOARD.ALL_STATUSES}
      >
        <option value="">{MESSAGES.DASHBOARD.ALL_STATUSES}</option>
        <option value={PUBLICATION_STATUS.DRAFT}>{PUBLICATION_STATUS.DRAFT}</option>
        <option value={PUBLICATION_STATUS.PUBLISHED}>{PUBLICATION_STATUS.PUBLISHED}</option>
      </select>
      <label
        className="flex items-center gap-1 text-sm"
        aria-label={MESSAGES.DASHBOARD.SHOW_DELETED}
      >
        <input
          type="checkbox"
          checked={showDeleted}
          onChange={(e) => handleShowDeleted(e.target.checked)}
        />
        {MESSAGES.DASHBOARD.SHOW_DELETED}
      </label>
    </div>
  );
};

export default FiltersBar;
