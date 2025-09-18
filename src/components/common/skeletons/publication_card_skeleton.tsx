import { FC } from 'react';

/**
 * PublicationCardSkeleton Component
 *
 * A skeleton loader component for the publication card.
 * - Provides a visual placeholder while publication data is loading.
 * - Uses pulsing animation to indicate loading state.
 * - Structured to match the layout of the actual PublicationCard with title, metadata, and action buttons.
 * - Marked as `aria-hidden` for accessibility since it's purely decorative.
 */
const PublicationCardSkeleton: FC = () => {
  return (
    <div className="card motion-safe:animate-pulse motion-reduce:animate-none" aria-hidden="true">
      <div className="grid grid-cols-[auto_1fr] gap-3">
        <div className="row-span-2 flex items-start pt-[0.35rem]">
          <div className="h-4 w-4 bg-gray-200 rounded" />
        </div>
        <div className="flex items-start justify-between">
          <div className="flex-1 pr-4">
            <div className="h-5 bg-gray-200 rounded w-2/3 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-1/3" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-9 bg-gray-200 rounded w-40" />
            <div className="h-9 bg-gray-200 rounded w-16" />
            <div className="h-9 bg-gray-200 rounded w-16" />
          </div>
        </div>
        <div className="col-start-2">
          <div className="h-4 bg-gray-200 rounded w-full mb-2" />
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
      </div>
    </div>
  );
};

export default PublicationCardSkeleton;
