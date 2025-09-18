import axios from 'axios';
import { getStorage } from '@utils/storage';

import { ENV } from '@constants/env';
import { handleSessionTimeoutRedirect } from '@utils/session_timeout';
import { HTTP_STATUS } from '@constants/http_status';
import { STORAGE_KEYS } from '@constants/config';

export const api = axios.create({
  baseURL: ENV.API_BASE_URL,
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = getStorage(STORAGE_KEYS.TOKEN);
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === HTTP_STATUS.UNAUTHORIZED) {
      handleSessionTimeoutRedirect();
    }
    return Promise.reject(error);
  }
);
