import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import { Document } from '@/types/document.types';

import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

interface DocumentViewerProps {
    document: Document;
    maxZoom?: number;
    minZoom?: number;
    className?: string;
}

const MAX_ZOOM = 150;
const MIN_ZOOM = 50;

export const DocumentViewer = ({
    document,
    maxZoom = MAX_ZOOM,
    minZoom = MIN_ZOOM,
    className,
}: DocumentViewerProps) => {
    const [zoom, setZoom] = useState(100);

    const handleZoomIn = () => {
        setZoom((prev) => Math.min(prev + 10, maxZoom));
    };

    const handleZoomOut = () => {
        setZoom((prev) => Math.max(prev - 10, minZoom));
    };

    return (
        <div
            className={cn(
                'relative dark:bg-card bg-neutral-600 flex-1',
                className
            )}
        >
            <div className='absolute top-4 right-4 flex gap-2 z-10 select-none'>
                <Button
                    variant='outline'
                    size='icon'
                    onClick={handleZoomOut}
                    disabled={zoom <= minZoom}
                >
                    <Minus className='h-4 w-4' />
                </Button>
                <Button
                    variant='outline'
                    size='icon'
                    onClick={handleZoomIn}
                    disabled={zoom >= maxZoom}
                >
                    <Plus className='h-4 w-4' />
                </Button>
            </div>
            <ScrollArea className='h-full'>
                <div
                    className='flex flex-col gap-4 items-center'
                    style={{
                        transform: `scale(${zoom / 100})`,
                        transformOrigin: 'top',
                        transition: 'transform 0.2s ease-in-out',
                    }}
                >
                    {document.pages.map((page) => (
                        <Image
                            key={page.id}
                            src={'/pages/' + page.image.url}
                            alt={`Page ${page.id}`}
                            width={page.image.width}
                            height={page.image.height}
                            className='object-contain w-full h-full max-h-[calc(100vh-theme(spacing.20))] float-left m-3'
                            loading='lazy'
                        />
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
};
