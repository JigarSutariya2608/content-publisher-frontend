import { SelectedPublicationType } from 'src/types';

interface SelectedPublicationItemProps {
  item: SelectedPublicationType;
  defaultStatus: string;
  onRemove: (p: SelectedPublicationType) => void;
}

/**
 * SelectedPublicationItem Component
 *
 * Represents a single selected publication in a list of selected items.
 * - Displays the publication title and status (defaults to `defaultStatus` if not provided).
 * - Includes a remove button to deselect the item, triggering the `onRemove` callback.
 * - Styled as a compact, inline badge with accessible `aria-label` for the remove action.
 */
const SelectedPublicationItem: React.FC<SelectedPublicationItemProps> = ({
  item,
  defaultStatus,
  onRemove,
}) => {
  const handleRemove = () => onRemove(item);
  return (
    <span className="inline-flex items-center gap-2 text-xs bg-gray-100 rounded px-2 py-1">
      <span className="font-medium">{item.title}</span>
      <span className="uppercase text-gray-500">{item.status ?? defaultStatus}</span>
      <button
        className="text-gray-500"
        type="button"
        aria-label={`Remove from selection: ${item.title}`}
        onClick={handleRemove}
      >
        ✕
      </button>
    </span>
  );
};

export default SelectedPublicationItem;
