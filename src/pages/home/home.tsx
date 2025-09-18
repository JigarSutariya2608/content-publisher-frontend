import MESSAGES from '@constants/messages';
import { listPublicPublications } from '@services/publications_service';
import type { PublicationType } from 'src/types';
import { formatDate } from '@utils/format_date';
import { PAGINATION, SEARCH, SEARCH_PARAMS } from '@constants/config';
import useInfiniteList from '@hooks/use_infinite_list';
import PublicationCardSkeleton from '@components/common/skeletons/publication_card_skeleton';
import { useEffect, useState } from 'react';
import useDebounce from '@hooks/use_debounce';
import SearchBar from '@components/common/search_bar/search_bar';
import { useSearchParams } from 'react-router-dom';
import { PublicationListState } from '@components/shared';
import { PublicPublicationCard } from '@components/home';

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(() => searchParams.get(SEARCH_PARAMS.SEARCH) || '');
  const debouncedSearch = useDebounce(search, SEARCH.DEBOUNCE_MS);

  const { items, loading, error, hasMore, sentinelRef, tryAgain } =
    useInfiniteList<PublicationType>({
      pageSize: PAGINATION.LIMIT,
      deps: [debouncedSearch],
      keepPreviousOnReset: true,
      fetchPage: async (page, pageSize) =>
        listPublicPublications({
          page,
          limit: pageSize,
          search: debouncedSearch.trim() || undefined,
        }),
    });

  useEffect(() => {
    const params: Record<string, string> = {};
    if (debouncedSearch.trim()) params.q = debouncedSearch.trim();
    setSearchParams(params, { replace: true });
  }, [debouncedSearch, setSearchParams]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{MESSAGES.PUBLIC.TITLE}</h1>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder={MESSAGES.DASHBOARD.SEARCH_PLACEHOLDER}
      />

      <PublicationListState
        loading={loading}
        error={error}
        tryAgain={tryAgain}
        noDataMessage={MESSAGES.DASHBOARD.NO_PUBLICATIONS}
        count={items.length}
      />

      <div className="grid gap-3" role="region" aria-label="Public publications list">
        {items.map((p) => (
          <PublicPublicationCard key={p.id} publication={p} />
        ))}
        {loading && items.length > 0 && <PublicationCardSkeleton />}
      </div>

      <div ref={sentinelRef} className="h-8" />
      {!loading && !hasMore && items.length > 0 && (
        <div className="text-center text-gray-500">{MESSAGES.DASHBOARD.NO_MORE}</div>
      )}
    </div>
  );
};

export default HomePage;
