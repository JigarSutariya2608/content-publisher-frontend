import MESSAGES from '@constants/messages';
import { ChangeEvent, FC, useCallback, useRef } from 'react';

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
  onClear?: () => void;
  ariaLabel?: string;
};

/**
 * SearchBar Component
 *
 * A reusable search input component with optional clear functionality.
 * - Accepts `value` and `onChange` props to control input state.
 * - Displays a placeholder and supports custom `className`.
 * - Calls `onClear` when the clear button is clicked, or resets input if `onClear` is not provided.
 * - Automatically focuses input after clearing.
 * - Supports accessibility via `aria-label`.
 */
const SearchBar: FC<Props> = ({
  value,
  onChange,
  placeholder = MESSAGES.PLACEHOLDER.SEARCH,
  className = '',
  onClear,
  ariaLabel,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );
  const handleClear = useCallback(() => {
    if (onClear) onClear();
    else onChange('');
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [onChange, onClear]);
  return (
    <div className={`relative inline-flex items-center ${className}`} role="search">
      <input
        ref={inputRef}
        name="search"
        className="input w-full max-w-xs pr-12"
        placeholder={placeholder}
        value={value}
        aria-label={ariaLabel || placeholder}
        onChange={handleChange}
      />
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-200"
          onClick={handleClear}
        >
          <span className="text-lg leading-none">&times;</span>
        </button>
      )}
    </div>
  );
};

export default SearchBar;
