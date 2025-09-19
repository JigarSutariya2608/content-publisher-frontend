import { SelectHTMLAttributes } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import { FormFieldWrapper } from '@components/common';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  options: { value: string; label: string }[];
}

const SelectField = ({ label, registration, error, id, options, ...rest }: Props) => {
  return (
    <FormFieldWrapper label={label} htmlFor={id} error={error?.message}>
      <select id={id} className="input" {...registration} {...rest}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FormFieldWrapper>
  );
};

export default SelectField;
