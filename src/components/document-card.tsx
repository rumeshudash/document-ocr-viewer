import Image from 'next/image';
import { useMemo } from 'react';

import { cn } from '@/lib/utils';
import { Document } from '@/types/document.types';

import { StatusIcon } from './status-icon';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

interface DocumentCardProps {
    document: Document;
    isLink?: boolean;
}

export const DocumentCard = ({ document, isLink }: DocumentCardProps) => {
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
