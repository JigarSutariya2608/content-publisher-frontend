import { FC, useEffect, useId } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '@components/common/button';
import MESSAGES from '@constants/messages';
import { PublicationFormType } from 'src/types';
import { PUBLICATION_STATUS } from '@constants/config';
import { BaseModal } from '@components/common/base_modal';
import { publicationSchema } from '@schemas/publication.schema';
import { InputField, SelectField, TextareaField } from '@components/common';
import { PUBLICATION_STATUS_OPTIONS } from '@constants/options';

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
        <InputField
          id={titleId}
          label={MESSAGES.MODAL.FIELD_TITLE}
          registration={register('title')}
          error={errors.title}
          autoFocus
        />

        <TextareaField
          id={contentId}
          label={MESSAGES.MODAL.FIELD_CONTENT}
          registration={register('content')}
          error={errors.content}
          rows={5}
          maxLength={500}
        />

        <SelectField
          id={statusId}
          label={MESSAGES.MODAL.FIELD_STATUS}
          registration={register('status')}
          error={errors.status}
          options={PUBLICATION_STATUS_OPTIONS}
        />

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
