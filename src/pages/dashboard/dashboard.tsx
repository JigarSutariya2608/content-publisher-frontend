import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button } from '@components/common/button';
import {
  createPublication,
  deletePublication,
  listPublications,
  updatePublication,
  bulkDeletePublications,
  bulkUndoDeletePublications,
  undoDeletedPublication,
} from '@services/publications_service';
import {
  PublicationStatusType,
  PublicationType,
  SelectedPublicationType,
  SelectedType,
} from 'src/types';
import MESSAGES from '@constants/messages';
import {
  PAGINATION,
  PUBLICATION_STATUS,
  SEARCH,
  SEARCH_PARAMS,
  TRASH_VALUE,
} from '@constants/config';
import getErrorMessage from '@utils/error';
import useToast from '@hooks/use_toast';
import useDebounce from '@hooks/use_debounce';
import useInfiniteList from '@hooks/use_infinite_list';
import PublicationCardSkeleton from '@components/common/skeletons/publication_card_skeleton';
import FiltersBar from '../../components/dashboard/filters_bar';
import PublicationCard from '../../components/dashboard/publication_card';
import PublicationModal from '../../components/dashboard/publication_modal';
import { ConfirmDialog } from '@components/common/confirm_dialog';
import { SelectedPublications } from '@components/dashboard';
import { PublicationListState } from '@components/shared';

const DashboardPage = () => {
  const [items, setItems] = useState<PublicationType[]>([]);
  const { showError, showSuccess } = useToast();

  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(() => searchParams.get(SEARCH_PARAMS.SEARCH) || '');
  const [status, setStatus] = useState<'' | PublicationStatusType>(
    () => (searchParams.get(SEARCH_PARAMS.STATUS) as PublicationStatusType) || ''
  );
  const [showDeleted, setShowDeleted] = useState<boolean>(
    () => searchParams.get(SEARCH_PARAMS.TRASH) === TRASH_VALUE
  );

  const [selected, setSelected] = useState<SelectedType>(new Map());

  const debouncedSearch = useDebounce(search, SEARCH.DEBOUNCE_MS);

  const {
    items: listItems,
    loading,
    error,
    hasMore,
    sentinelRef,
    tryAgain,
  } = useInfiniteList<PublicationType>({
    pageSize: PAGINATION.LIMIT,
    deps: [debouncedSearch, status, showDeleted],
    keepPreviousOnReset: true,
    fetchPage: async (page, pageSize) =>
      listPublications({
        search: debouncedSearch.trim() || undefined,
        status: status || undefined,
        page,
        limit: pageSize,
        showDeleted: showDeleted || undefined,
      }),
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<PublicationType | null>(null);
  const isEdit = Boolean(editing);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmBulk, setConfirmBulk] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    return items?.filter(
      (i: PublicationType) =>
        (status ? i.status === status : true) && (q ? i.title.toLowerCase().includes(q) : true)
    );
  }, [items, debouncedSearch, status]);

  const itemsById = useMemo(() => {
    const m = new Map<string, PublicationType>();
    for (const it of items) m.set(it.id, it);
    return m;
  }, [items]);

  useEffect(() => {
    setItems(listItems);
  }, [listItems]);

  useEffect(() => {
    const params: Record<string, string> = {};
    if (debouncedSearch.trim()) params.q = debouncedSearch.trim();
    if (status) params.status = status;
    if (showDeleted) params.trash = '1';
    setSearchParams(params, { replace: true });
  }, [debouncedSearch, status, showDeleted, setSearchParams]);

  // Open modal for create
  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  // Open modal for edit
  const openEdit = (p: PublicationType) => {
    setEditing(p);
    setModalOpen(true);
  };

  const onSave = async (data: {
    title: string;
    content: string;
    status: PublicationStatusType;
  }) => {
    try {
      const trimmedTitle = data.title.trim();
      const trimmedContent = data.content.trim();

      if (isEdit && editing) {
        const updated = await updatePublication(editing.id, {
          title: trimmedTitle,
          content: trimmedContent,
          status: data.status,
        });
        setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
        setSelected((prev) => {
          if (!prev.has(updated.id)) return prev;
          const next = new Map(prev);
          next.set(updated.id, {
            id: updated.id,
            title: updated.title,
            status: updated.status as PublicationStatusType,
          });
          return next;
        });
      } else {
        const created = await createPublication({
          title: trimmedTitle,
          content: trimmedContent,
          status: data.status,
        });
        setItems((prev) => [created, ...prev]);
      }

      setModalOpen(false);
      showSuccess(
        isEdit ? MESSAGES.PUBLICATIONS.UPDATE_SUCCESS : MESSAGES.PUBLICATIONS.CREATE_SUCCESS
      );
    } catch (err: any) {
      showError(getErrorMessage(err));
    }
  };

  const confirmDelete = (id: string) => {
    setPendingDeleteId(id);
    setConfirmBulk(false);
    setConfirmOpen(true);
  };

  const confirmBulkDelete = () => {
    if (selected.size === 0) return;
    setConfirmBulk(true);
    setConfirmOpen(true);
  };

  const performDelete = async () => {
    try {
      if (confirmBulk) {
        const ids = Array.from(selected.keys());
        if (showDeleted) {
          await bulkUndoDeletePublications(ids);
        } else {
          await bulkDeletePublications(ids);
        }
        const idSet = new Set(ids);
        setItems((prev) => prev.filter((i) => !idSet.has(i.id)));
        setSelected(new Map());
        showSuccess(MESSAGES.PUBLICATIONS.DELETE_SUCCESS);
      } else if (pendingDeleteId) {
        if (showDeleted) {
          await undoDeletedPublication(pendingDeleteId);
          showSuccess(MESSAGES.PUBLICATIONS.UNDO_DELETE_SUCCESS);
        } else {
          await deletePublication(pendingDeleteId);
          showSuccess(MESSAGES.PUBLICATIONS.DELETE_SUCCESS);
        }
        setItems((prev) => prev.filter((i) => i.id !== pendingDeleteId));
        setSelected((prev) => {
          if (!prev.has(pendingDeleteId)) return prev;
          const next = new Map(prev);
          next.delete(pendingDeleteId);
          return next;
        });
      }
    } catch (err: any) {
      showError(getErrorMessage(err));
    } finally {
      setConfirmOpen(false);
      setPendingDeleteId(null);
      setConfirmBulk(false);
    }
  };

  const onStatusChange = async (p: PublicationType, s: PublicationStatusType) => {
    try {
      const updated = await updatePublication(p.id, { status: s });
      setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
      setSelected((prev) => {
        if (!prev.has(updated.id)) return prev;
        const next = new Map(prev);
        const entry = next.get(updated.id)!;
        next.set(updated.id, { ...entry, status: updated.status as PublicationStatusType });
        return next;
      });
    } catch (err: any) {
      showError(getErrorMessage(err));
    }
  };

  const handleStatusChange = (v: '' | PublicationStatusType) => setStatus(v);

  const toggleSelect = (p: SelectedPublicationType) => {
    setSelected((prev) => {
      const next = new Map(prev);
      if (next.has(p.id)) next.delete(p.id);
      else next.set(p.id, { id: p.id, title: p.title, status: p.status });
      return next;
    });
  };

  const handleCancel = () => {
    setConfirmOpen(false);
    setPendingDeleteId(null);
    setConfirmBulk(false);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleShowDeletedChange = (v: boolean) => {
    setSelected(new Map());
    setShowDeleted(v);
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-bold">{MESSAGES.DASHBOARD.TITLE}</h1>
          <div className="flex items-center gap-3">
            <Button onClick={openCreate}>{MESSAGES.BUTTONS.NEW_PUBLICATION}</Button>
          </div>
        </div>

        <FiltersBar
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={handleStatusChange}
          showDeleted={showDeleted}
          onShowDeletedChange={handleShowDeletedChange}
        />

        <SelectedPublications
          selected={selected}
          itemsById={itemsById}
          showDeleted={showDeleted}
          confirmBulkDelete={confirmBulkDelete}
          toggleSelect={toggleSelect}
        />

        <PublicationListState
          loading={loading}
          error={error}
          tryAgain={tryAgain}
          noDataMessage={MESSAGES.DASHBOARD.NO_PUBLICATIONS}
          count={items.length}
        />

        <div className="grid gap-3" role="region" aria-label="Your publications list">
          {filtered.map((p) => (
            <PublicationCard
              key={p.id}
              publication={p}
              selected={selected.has(p.id)}
              onToggleSelect={toggleSelect}
              onStatusChange={onStatusChange}
              onEdit={openEdit}
              onDelete={confirmDelete}
              showDeleted={showDeleted}
            />
          ))}
          {loading && items.length > 0 && <PublicationCardSkeleton />}
        </div>

        <div ref={sentinelRef} className="h-8" />

        {!loading && !hasMore && filtered.length > 0 && (
          <div className="text-center text-gray-500 py-2">{MESSAGES.DASHBOARD.NO_MORE}</div>
        )}
      </div>

      <PublicationModal
        open={modalOpen}
        isEdit={isEdit}
        defaultValues={editing ?? undefined}
        onClose={handleModalClose}
        onSave={onSave}
      />

      <ConfirmDialog
        open={confirmOpen}
        title={
          confirmBulk
            ? MESSAGES.PUBLICATIONS.CONFIRM_BULK_DELETE_TITLE
            : MESSAGES.PUBLICATIONS.CONFIRM_DELETE_TITLE
        }
        description={
          confirmBulk
            ? MESSAGES.PUBLICATIONS.CONFIRM_BULK_DELETE_DESC
            : MESSAGES.PUBLICATIONS.CONFIRM_DELETE_DESC
        }
        confirmText={MESSAGES.BUTTONS.DELETE}
        cancelText={MESSAGES.BUTTONS.CANCEL}
        onConfirm={performDelete}
        onCancel={handleCancel}
      />
    </>
  );
};

export default DashboardPage;
