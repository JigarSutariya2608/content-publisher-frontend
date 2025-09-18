import { SEARCH } from '@constants/config';
import { useEffect, useState } from 'react';

/**
 * useDebounce Hook
 *
 * Returns a debounced value that updates after a specified delay.
 * - Useful for delaying rapid changes, e.g., user input in search fields.
 * - `value` is the input to debounce.
 * - `delay` sets the debounce interval in milliseconds (default from `SEARCH.DEBOUNCE_MS`).
 * - Updates the debounced value only after the specified delay has passed without changes.
 */
const useDebounce = <T>(value: T, delay = SEARCH.DEBOUNCE_MS): T => {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
};

export default useDebounce;
