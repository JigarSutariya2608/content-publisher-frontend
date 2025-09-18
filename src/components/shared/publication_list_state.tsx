import { Button, PublicationCardSkeleton } from '@components/common';
import MESSAGES from '@constants/messages';
import React from 'react';

interface PublicationListStateProps {
  loading: boolean;
  error: string | null;
  count: number;
  tryAgain: () => void;
  noDataMessage: string;
}

/**
 * PublicationListState Component
 *
 * Displays the appropriate state of a publication list based on loading, error, or empty data conditions.
 * - Shows skeleton loaders when `loading` is true and no items are available.
 * - Displays an error message with a retry button if `error` exists.
 * - Shows a custom "no data" message when the list is empty and not loading.
 * - Returns null if none of the above conditions apply (i.e., normal data rendering occurs elsewhere).
 */
const PublicationListState: React.FC<PublicationListStateProps> = ({
  loading,
  error,
  count,
  tryAgain,
  noDataMessage,
}) => {
  if (loading && count === 0) {
    return (
      <div className="grid gap-3">
        <PublicationCardSkeleton />
        <PublicationCardSkeleton />
        <PublicationCardSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 flex items-center gap-2">
        <span>{error}</span>
        <Button
          variant="secondary"
          type="button"
          onClick={tryAgain}
          aria-label="Retry loading publications"
        >
          {MESSAGES.BUTTONS.RETRY}
        </Button>
      </div>
    );
  }

  if (!loading && !error && count === 0) {
    return <div className="text-gray-600">{noDataMessage}</div>;
  }

  return null;
};

export default PublicationListState;
