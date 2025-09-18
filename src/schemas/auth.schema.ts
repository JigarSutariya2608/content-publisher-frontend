import { object as yupObject, string as yupString } from 'yup';
import MESSAGES from '@constants/messages';
import { REGEX_PASSWORD } from '@constants/regex';

const loginSchema = yupObject({
  email: yupString()
    .trim()
    .email(MESSAGES.VALIDATION.EMAIL_INVALID)
    .required(MESSAGES.VALIDATION.EMAIL_IS_REQUIRED),
  password: yupString()
    .trim()
    .required(MESSAGES.VALIDATION.PASSWORD_IS_REQUIRED)
    .min(6, MESSAGES.VALIDATION.PASSWORD_MIN_LENGTH)
    .matches(REGEX_PASSWORD, MESSAGES.VALIDATION.PASSWORD_WEAK),
});

const signupSchema = loginSchema.shape({
  name: yupString().trim().required(MESSAGES.VALIDATION.NAME_IS_REQUIRED),
});

export { loginSchema, signupSchema };
