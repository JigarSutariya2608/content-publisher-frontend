import { PublicationStatusType, PublicationType } from './publications';

type ListParamsType = {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  showDeleted?: boolean;
};

type FetchPageFn<T> = (page: number, pageSize: number) => Promise<T[]>;

type SelectedType = Map<string, { id: string; title: string; status: PublicationStatusType }>;

type ItemByIdType = Map<string, PublicationType>;

export type { ListParamsType, FetchPageFn, SelectedType, ItemByIdType };
