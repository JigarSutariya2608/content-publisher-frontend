import React, { useCallback } from 'react';
import { PublicationStatusType } from 'src/types';
import MESSAGES from '@constants/messages';
import SearchBar from '@components/common/search_bar/search_bar';
import { PUBLICATION_STATUS_OPTIONS } from '@constants/options';

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
    (event: React.ChangeEvent<HTMLSelectElement>) => onStatusChange(event.target.value as PublicationStatusType || ''),
    [onStatusChange]
  );
  const handleShowDeleted = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => onShowDeletedChange(event.target.checked),
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
        onChange={handleStatus}
        aria-label={MESSAGES.DASHBOARD.ALL_STATUSES}
      >
        <option value="">{MESSAGES.DASHBOARD.ALL_STATUSES}</option>
        {PUBLICATION_STATUS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label
        className="flex items-center gap-1 text-sm"
        aria-label={MESSAGES.DASHBOARD.SHOW_DELETED}
      >
        <input
          type="checkbox"
          checked={showDeleted}
          onChange={handleShowDeleted}
        />
        {MESSAGES.DASHBOARD.SHOW_DELETED}
      </label>
    </div>
  );
};

export default FiltersBar;
