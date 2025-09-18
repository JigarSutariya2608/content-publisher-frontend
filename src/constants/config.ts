const PAGINATION = {
  LIMIT: 10,
};

const SEARCH = {
  DEBOUNCE_MS: 400,
};

const SEARCH_PARAMS = {
  NEXT: 'next',
  STATUS: 'status',
  TRASH: 'trash',
  SEARCH: 'q',
};

const STORAGE_KEYS = {
  TOKEN: 'token',
};

const ROUTES = {
  ROOT: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
};

const PUBLICATION_STATUS = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
} as const;

const TRASH_VALUE = '1';

export { PAGINATION, SEARCH, SEARCH_PARAMS, STORAGE_KEYS, ROUTES, PUBLICATION_STATUS, TRASH_VALUE };
