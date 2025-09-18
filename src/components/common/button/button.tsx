import { ButtonHTMLAttributes, forwardRef } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'text';
};

/**
 * Reusable button component with support for:
 * - Variants: "primary" or "secondary"
 * - Forwarded ref for DOM access
 * - All standard button props (via `ButtonHTMLAttributes`)
 * - Custom className merging
 *
 * Example usage:
 * ```tsx
 * <Button onClick={handleClick}>Click Me</Button>
 * <Button variant="secondary" disabled>Cancel</Button>
 * ```
 */
const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = 'primary', className = '', ...rest }, ref) => {
    const base =
      'btn ' +
      (variant === 'primary'
        ? 'btn-primary'
        : variant === 'secondary'
          ? 'btn-secondary'
          : 'btn-text');
    return <button ref={ref} className={`${base} ${className}`} {...rest} />;
  }
);

Button.displayName = 'Button';

export default Button;
