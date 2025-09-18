import { object as yupObject, string as yupString, mixed as yupMixed } from 'yup';
import MESSAGES from '@constants/messages';
import { PUBLICATION_STATUS } from '@constants/config';
import { PublicationStatusType } from 'src/types';

const publicationSchema = yupObject({
  title: yupString()
    .trim()
    .required(MESSAGES.VALIDATION.TITLE_REQUIRED)
    .min(3, MESSAGES.VALIDATION.TITLE_MIN_LENGTH)
    .max(100, MESSAGES.VALIDATION.TITLE_MAX_LENGTH),

  content: yupString()
    .trim()
    .required(MESSAGES.VALIDATION.CONTENT_REQUIRED)
    .min(10, MESSAGES.VALIDATION.CONTENT_MIN_LENGTH)
    .max(500, MESSAGES.VALIDATION.CONTENT_MAX_LENGTH),

  status: yupMixed<PublicationStatusType>()
    .oneOf([PUBLICATION_STATUS.DRAFT, PUBLICATION_STATUS.PUBLISHED])
    .required(MESSAGES.VALIDATION.STATUS_REQUIRED),
});

export { publicationSchema };
