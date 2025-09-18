import { api } from '@api/api_client';

import API from '@constants/api';
import { LoginPayloadType, SignupPayloadType } from 'src/types';

/**
 * Perform user signup by sending user data to the signup API endpoint.
 *
 * - Accepts user signup data (e.g., name, email, password) in `SignupPayloadType`.
 * - Sends a POST request to `API.AUTH.SIGNUP`.
 * - Returns a Promise that resolves to an object containing:
 *   - `userId`: the unique ID of the newly created user.
 *   - `token`: an authentication token (e.g., JWT) for the user session.
 *
 * @param data - The payload containing user signup information.
 * @returns Promise resolving to userId and token.
 *
 * Example:
 * ```ts
 * const { userId, token } = await signup({ name: "Alice", email: "alice@example.com", password: "123456" });
 * ```
 */
async function signup(data: SignupPayloadType): Promise<{ userId: string; token: string }> {
  const res = await api.post(API.AUTH.SIGNUP, data);
  return res.data.data;
}

/**
 * Perform user login by sending credentials to the login API endpoint.
 *
 * - Accepts user login data (e.g., email and password) in `LoginPayloadType`.
 * - Sends a POST request to `API.AUTH.LOGIN`.
 * - Returns a Promise that resolves to an object containing:
 *   - `userId`: the unique ID of the logged-in user.
 *   - `token`: an authentication token (e.g., JWT) for the user session.
 *
 * @param data - The payload containing user login credentials.
 * @returns Promise resolving to userId and token.
 *
 * Example:
 * ```ts
 * const { userId, token } = await login({ email: "alice@example.com", password: "123456" });
 * ```
 */
async function login(data: LoginPayloadType): Promise<{ userId: string; token: string }> {
  const res = await api.post(API.AUTH.LOGIN, data);
  return res.data.data;
}

export { signup, login };
