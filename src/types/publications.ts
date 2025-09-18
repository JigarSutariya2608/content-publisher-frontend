import { PUBLICATION_STATUS } from '@constants/config';

type PublicationStatusType = (typeof PUBLICATION_STATUS)[keyof typeof PUBLICATION_STATUS];

type PublicationType = {
  id: string;
  title: string;
  content: string;
  status: PublicationStatusType;
  createdAt: string;
  updatedAt: string;
};

type SelectedPublicationType = {
  id: string;
  title: string;
  status: PublicationStatusType;
};

type PublicationFormType = {
  title: string;
  content: string;
  status: PublicationStatusType;
};

export type {
  PublicationStatusType,
  PublicationType,
  SelectedPublicationType,
  PublicationFormType,
};
