import { api } from '@api/api_client';
import API from '@constants/api';
import type { ListParamsType, PublicationStatusType, PublicationType } from 'src/types';

/**
 * Fetch a list of publications with optional query parameters.
 *
 * - Supports pagination, filtering, and sorting via `params`.
 * - Handles API responses that may return data directly or nested under `data.data`.
 *
 * @param params - Optional query parameters (search, status, showDeleted, page, limit, etc.).
 * @returns Promise resolving to an array of `PublicationType`.
 */
async function listPublications(params: ListParamsType = {}): Promise<PublicationType[]> {
  const res = await api.get(API.PUBLICATIONS.ROOT, { params });
  const payload = res?.data?.data;
  if (Array.isArray(payload)) return payload as PublicationType[];
  if (payload && Array.isArray(payload.data)) return payload.data as PublicationType[];
  return [];
}

/**
 * Fetch a single publication by its ID.
 *
 * @param id - The unique identifier of the publication.
 * @returns Promise resolving to a `PublicationType` object.
 */
async function getPublication(id: string): Promise<PublicationType> {
  const res = await api.get(`${API.PUBLICATIONS.ROOT}/${id}`);
  return res.data.data;
}

/**
 * Create a new publication.
 *
 * @param data - Publication payload including title, content, and optional status.
 * @returns Promise resolving to the created `PublicationType`.
 */
async function createPublication(data: {
  title: string;
  content: string;
  status?: PublicationStatusType;
}): Promise<PublicationType> {
  const res = await api.post(API.PUBLICATIONS.ROOT, data);
  return res.data.data;
}

/**
 * Update an existing publication by ID.
 *
 * @param id - The unique identifier of the publication.
 * @param data - Partial update payload (title, content, status).
 * @returns Promise resolving to the updated `PublicationType`.
 */
async function updatePublication(
  id: string,
  data: Partial<{ title: string; content: string; status: PublicationStatusType }>
): Promise<PublicationType> {
  const res = await api.put(`${API.PUBLICATIONS.ROOT}/${id}`, data);
  return res.data.data;
}

/**
 * Delete a publication by ID.
 *
 * @param id - The unique identifier of the publication.
 * @returns Promise resolving to void.
 */
async function deletePublication(id: string): Promise<void> {
  await api.delete(`${API.PUBLICATIONS.ROOT}/${id}`);
}

/**
 * Undo deleted publication by ID.
 *
 * @param id - The unique identifier of the publication.
 * @returns Promise resolving to void.
 */
async function undoDeletedPublication(id: string): Promise<void> {
  await api.delete(`${API.PUBLICATIONS.UNDO_DELETE}/${id}`);
}

/**
 * Bulk delete publications by IDs.
 *
 * @param ids - Array of publication IDs to delete.
 * @returns Promise resolving to an object with optional `deletedCount` or void.
 */
async function bulkDeletePublications(ids: string[]): Promise<{ deletedCount?: number } | void> {
  const res = await api.post(API.PUBLICATIONS.BULK_DELETE, { ids });
  return res?.data?.data;
}

/**
 * Bulk undo delete publications by IDs.
 *
 * @param ids - Array of publication IDs to restore.
 * @returns Promise resolving to an object with optional `deletedCount` or void.
 */
async function bulkUndoDeletePublications(
  ids: string[]
): Promise<{ deletedCount?: number } | void> {
  const res = await api.post(API.PUBLICATIONS.BULK_UNDO, { ids });
  return res?.data?.data;
}

/**
 * Fetch a list of public (published) publications with optional query parameters.
 *
 * - Used for public-facing endpoints.
 * - Supports search, pagination, and limit parameters.
 *
 * @param params - Optional query parameters (search, page, limit).
 * @returns Promise resolving to an array of `PublicationType`.
 */
async function listPublicPublications(
  params: { search?: string; page?: number; limit?: number } = {}
): Promise<PublicationType[]> {
  const res = await api.get(API.PUBLIC_PUBLICATIONS.ROOT, { params });
  const payload = res?.data?.data;
  if (Array.isArray(payload)) return payload as PublicationType[];
  if (payload && Array.isArray(payload.data)) return payload.data as PublicationType[];
  return [];
}

/**
 * Fetch a single public publication by its ID.
 *
 * @param id - The unique identifier of the public publication.
 * @returns Promise resolving to a `PublicationType` object.
 */
async function getPublicPublication(id: string): Promise<PublicationType> {
  const res = await api.get(`${API.PUBLIC_PUBLICATIONS.ROOT}/${id}`);
  return res.data.data;
}

export {
  listPublications,
  getPublication,
  createPublication,
  updatePublication,
  deletePublication,
  bulkDeletePublications,
  bulkUndoDeletePublications,
  listPublicPublications,
  getPublicPublication,
  undoDeletedPublication,
};
