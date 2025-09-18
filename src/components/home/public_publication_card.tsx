import type { PublicationType } from 'src/types';
import { formatDate } from '@utils/format_date';
import { FC } from 'react';

/**
 * PublicPublicationCard Component
 *
 * Displays a publication's title, content, and last updated date in a simple card layout.
 * - Intended for public or read-only views.
 * - Formats the updated date using the `formatDate` utility.
 * - Preserves whitespace in the content using `whitespace-pre-wrap`.
 */
const PublicPublicationCard: FC<{ publication: PublicationType }> = ({ publication }) => (
  <div className="card">
    <h3 className="font-semibold">{publication.title}</h3>
    <div className="text-sm text-gray-500">{formatDate(publication.updatedAt)}</div>
    <p className="mt-2 whitespace-pre-wrap">{publication.content}</p>
  </div>
);

export default PublicPublicationCard;
