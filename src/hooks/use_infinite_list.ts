import { useCallback, useEffect, useRef, useState } from 'react';
import { mergeUniqueById } from '@utils/collections';
import getErrorMessage from '@utils/error';
import { FetchPageFn } from 'src/types';

/**
 * useInfiniteList Hook
 *
 * Provides an infinite scrolling list with automatic pagination and IntersectionObserver support.
 * - `fetchPage` fetches a specific page of data.
 * - `pageSize` defines the number of items per page.
 * - `deps` triggers reset and reload when dependencies change.
 * - `ioRootMargin` customizes the IntersectionObserver's root margin.
 * - `keepPreviousOnReset` determines whether to preserve existing items when resetting.
 *
 * Features:
 * - Maintains `items`, `page`, `hasMore`, `loading`, and `error` states.
 * - `sentinelRef` should be attached to a DOM element at the bottom to trigger loading more items.
 * - `load` fetches a specific page, merging new items uniquely by ID.
 * - `reset` clears or preserves items and resets pagination.
 * - `tryAgain` retries the last failed load.
 */
const useInfiniteList = <T extends { id: string }>(options: {
  fetchPage: FetchPageFn<T>;
  pageSize: number;
  deps?: any[];
  ioRootMargin?: string;
  keepPreviousOnReset?: boolean;
}) => {
  const {
    fetchPage,
    pageSize,
    deps = [],
    ioRootMargin = '200px',
    keepPreviousOnReset = true,
  } = options;

  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const load = useCallback(
    async (targetPage?: number) => {
      if (loading || !hasMore) return;
      const p = targetPage ?? (page === 0 ? 1 : page + 1);
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPage(p, pageSize);
        setItems((prev) => (p === 1 ? data : mergeUniqueById(prev, data)));
        setHasMore(data.length === pageSize);
        setPage(p);
      } catch (e) {
        const err = getErrorMessage(e);
        setError(err);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    [fetchPage, page, pageSize, loading, hasMore]
  );

  const reset = useCallback(() => {
    if (!keepPreviousOnReset) {
      setItems([]);
    }
    setPage(0);
    setHasMore(true);
    setError(null);
  }, [keepPreviousOnReset]);

  const tryAgain = useCallback(() => {
    setError(null);
    setHasMore(true);
    load(page === 0 ? 1 : page + 1);
  }, [load, page]);

  useEffect(() => {
    reset();
    const t = setTimeout(() => {
      load(1);
    }, 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          load(page + 1);
        }
      },
      { root: null, rootMargin: ioRootMargin, threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, loading, load, ioRootMargin, page]);

  return { items, setItems, loading, error, hasMore, sentinelRef, load, reset, tryAgain, page };
};

export default useInfiniteList;
