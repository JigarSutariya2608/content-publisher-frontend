/**
 * Payload for signup request
 */
type SignupPayloadType = { name: string; email: string; password: string };

/**
 * Payload for login request
 */
type LoginPayloadType = { email: string; password: string };

type SignInSignUpFormType = {
  name?: string;
  email: string;
  password: string;
};

export type { SignupPayloadType, LoginPayloadType, SignInSignUpFormType };
