import Image from 'next/image';
import { useMemo } from 'react';

import { cn } from '@/lib/utils';
import { Document } from '@/types/document.types';

import { StatusIcon } from './status-icon';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

/**
 * Props for the DocumentCard component
 * @interface DocumentCardProps
 */
interface DocumentCardProps {
    /** The document object containing information about the document */
    document: Document;

    /** When true, adds hover effects and cursor pointer to indicate clickability */
    isLink?: boolean;
}

/**
 * A card component that displays document information including its thumbnail image, title, and type
 *
 * @component
 * @param {DocumentCardProps} props - The component props
 * @param {Document} props.document - The document object containing document details
 * @param {boolean} [props.isLink] - When true, adds hover effects and cursor pointer to indicate clickability
 *
 * @example
 * ```tsx
 * <DocumentCard
 *   document={documentData}
 *   isLink
 * />
 * ```
 */
export const DocumentCard = ({ document, isLink }: DocumentCardProps) => {
    /**
     * Memoized value that determines the image source for the document thumbnail
     *
     * @returns {string} The URL path to either the first page image or a placeholder image
     *
     * @remarks
     * - Returns the first page image URL if the document has a valid image and is not an Excel file
     * - Falls back to a placeholder image for Excel files or documents without images
     * - Memoized to prevent unnecessary recalculations when props haven't changed
     */
    const imageSrc = useMemo(() => {
        const firstPage = document.pages[0];
        const hasValidImage = firstPage?.image?.url && !document.excel_type;
        return hasValidImage
            ? `/pages/${firstPage.image.url}`
            : '/images/document-placeholder.png';
    }, [document.pages, document.excel_type]);

    return (
        <Card
            className={cn('w-[300px]', {
                'cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1':
                    isLink,
            })}
        >
            <div className='relative'>
                <Image
                    src={imageSrc}
                    alt={`Title page of ${document.title}`}
                    className='w-full h-48 object-cover rounded-t'
                    width={100}
                    height={120}
                    loading='lazy'
                />
                <StatusIcon status={document.status} />
            </div>
            <CardHeader>
                <CardTitle>{document.title}</CardTitle>
                <CardDescription>{document.type}</CardDescription>
            </CardHeader>
        </Card>
    );
};
