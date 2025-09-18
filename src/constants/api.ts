const API = {
  AUTH: {
    LOGIN: '/api/auth/login',
    SIGNUP: '/api/auth/signup',
  },
  PUBLICATIONS: {
    ROOT: '/api/publications',
    BULK_DELETE: '/api/publications/bulk-delete',
    BULK_UNDO: '/api/publications/bulk-undo',
    UNDO_DELETE: '/api/publications/undo',
  },
  PUBLIC_PUBLICATIONS: {
    ROOT: '/api/public',
  },
};

export default API;
