import MESSAGES from '@constants/messages';

/**
 * Extracts a user-friendly error message from an error object.
 *
 * - Looks for the error message in the following order:
 *   1. `err.response.data.message` → commonly used in API error responses (e.g., Axios).
 *   2. `err.message` → standard JavaScript error message.
 *   3. `fallback` → a default message (defaults to `MESSAGES.ERRORS.GENERIC`).
 *
 * @param err - The error object (can be any type, typically from API calls or thrown exceptions).
 * @param fallback - A fallback message to use if no error message is found (default: generic error).
 * @returns A string containing the most relevant error message.
 *
 * Example:
 *   getErrorMessage(apiError)
 *   → "Invalid email or password"
 */
const getErrorMessage = (err: any, fallback: string = MESSAGES.ERRORS.GENERIC): string => {
  return err?.response?.data?.message || err?.message || fallback;
};

export default getErrorMessage;
