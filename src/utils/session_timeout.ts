import { ROUTES, SEARCH_PARAMS, STORAGE_KEYS } from '@constants/config';
import { removeStorage } from '@utils/storage';

let isHandlingAuthError = false;

/**
 * Redirect the user to the login page when session expires.
 * Ensures we only redirect once and preserves the intended next location.
 */
export function handleSessionTimeoutRedirect() {
  if (isHandlingAuthError) return;
  isHandlingAuthError = true;
  removeStorage(STORAGE_KEYS.TOKEN);
  const { pathname, search, hash } = window.location;
  const next = encodeURIComponent(`${pathname}${search}${hash}`);
  if (pathname !== ROUTES.LOGIN) {
    window.location.href = `${ROUTES.LOGIN}?${SEARCH_PARAMS.NEXT}=${next}`;
  }
}
