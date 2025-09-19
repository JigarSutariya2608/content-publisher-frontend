import { TextareaHTMLAttributes } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import { FormFieldWrapper } from '@components/common';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
}

const TextareaField = ({ label, registration, error, id, ...rest }: Props) => {
  return (
    <FormFieldWrapper label={label} htmlFor={id} error={error?.message}>
      <textarea id={id} className="input" {...registration} {...rest} />
    </FormFieldWrapper>
  );
};

export default TextareaField;
