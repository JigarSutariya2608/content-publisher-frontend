import { ReactNode } from 'react';

interface Props {
  label: string;
  htmlFor?: string;
  error?: string;
  children: ReactNode;
}

const FormFieldWrapper = ({ label, htmlFor, error, children }: Props) => {
  return (
    <div>
      <label className="block mb-1" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {error && <span className="text-red-600">{error}</span>}
    </div>
  );
};

export default FormFieldWrapper;
