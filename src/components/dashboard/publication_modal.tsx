import { FC, useEffect, useId } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '@components/common/button';
import MESSAGES from '@constants/messages';
import { PublicationFormType } from 'src/types';
import { PUBLICATION_STATUS } from '@constants/config';
import { BaseModal } from '@components/common/base_modal';
import { publicationSchema } from '@schemas/publication.schema';

interface Props {
  open: boolean;
  isEdit: boolean;
  defaultValues?: PublicationFormType;
  onClose: () => void;
  onSave: (data: PublicationFormType) => void;
}

const defaultPublicationsValues: PublicationFormType = {
  title: '',
  content: '',
  status: PUBLICATION_STATUS.DRAFT,
};

const PublicationModal: FC<Props> = ({ open, isEdit, defaultValues, onClose, onSave }) => {
  const titleId = useId();
  const contentId = useId();
  const statusId = useId();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PublicationFormType>({
    resolver: yupResolver(publicationSchema),
    defaultValues: defaultValues ?? defaultPublicationsValues,
  });

  useEffect(() => {
    if (open) {
      reset(defaultValues ?? defaultPublicationsValues);
    }
  }, [open, defaultValues, reset]);

  const submitHandler = (values: PublicationFormType) => {
    onSave(values);
  };

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title={isEdit ? MESSAGES.MODAL.EDIT_TITLE : MESSAGES.MODAL.NEW_TITLE}
    >
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-3">
        <div>
          <label className="block mb-1" htmlFor={titleId}>
            {MESSAGES.MODAL.FIELD_TITLE}
          </label>
          <input id={titleId} className="input" {...register('title')} autoFocus />
          {errors.title && <span className="text-red-600">{errors.title.message}</span>}
        </div>

        <div>
          <label className="block mb-1" htmlFor={contentId}>
            {MESSAGES.MODAL.FIELD_CONTENT}
          </label>
          <textarea
            id={contentId}
            className="input"
            rows={5}
            maxLength={500}
            {...register('content')}
          />
          {errors.content && <span className="text-red-600">{errors.content.message}</span>}
        </div>

        <div>
          <label className="block mb-1" htmlFor={statusId}>
            {MESSAGES.MODAL.FIELD_STATUS}
          </label>
          <select
            id={statusId}
            className="input max-w-full sm:max-w-[160px] pr-10 appearance-none"
            {...register('status')}
          >
            <option value={PUBLICATION_STATUS.DRAFT}>{PUBLICATION_STATUS.DRAFT}</option>
            <option value={PUBLICATION_STATUS.PUBLISHED}>{PUBLICATION_STATUS.PUBLISHED}</option>
          </select>
          {errors.status && <span className="text-red-600">{errors.status.message}</span>}
        </div>

        <div className="flex gap-2 justify-end">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            aria-label={MESSAGES.BUTTONS.CANCEL}
          >
            {MESSAGES.BUTTONS.CANCEL}
          </Button>
          <Button
            type="submit"
            aria-label={isEdit ? MESSAGES.BUTTONS.SAVE : MESSAGES.BUTTONS.CREATE}
          >
            {isEdit ? MESSAGES.BUTTONS.SAVE : MESSAGES.BUTTONS.CREATE}
          </Button>
        </div>
      </form>
    </BaseModal>
  );
};

export default PublicationModal;
