import { InputHTMLAttributes } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import { FormFieldWrapper } from '@components/common';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
}

const InputField = ({ label, registration, error, id, ...rest }: Props) => {
  return (
    <FormFieldWrapper label={label} htmlFor={id} error={error?.message}>
      <input id={id} className="input" {...registration} {...rest} />
    </FormFieldWrapper>
  );
};

export default InputField;
