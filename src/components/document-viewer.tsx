/* eslint-disable @next/next/no-img-element */
import { useLayoutEffect, useMemo, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import { Document, Highlight } from '@/types/document.types';

import { Button } from './ui/button';

interface DocumentViewerProps {
    document: Document;
    zoom?: 'fit' | '75' | '100';
    className?: string;
    highLights?: Highlight[];
    activeHighLights?: Highlight['position'][];
    onHighlightHover?: (highlight: Highlight | null) => void;
}

interface HighlightWithActive extends Highlight {
    isActive: boolean;
}

export const DocumentViewer = ({
    document,
    zoom = 'fit',
    className,
    highLights,
    activeHighLights = [],
    onHighlightHover,
}: DocumentViewerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [scale, setScale] = useState(0);

    useLayoutEffect(() => {
        const updateScale = () => {
            if (!containerRef.current) return;

            const container = containerRef.current;
            const currentImage = document.pages[currentPage - 1].image;
            const scaleX = container.clientWidth / currentImage.width;
            const scaleY = container.clientHeight / currentImage.height;

            const scale = Math.min(scaleX, scaleY);
            if (zoom === 'fit') {
                setScale(scale);
            } else if (zoom === '75') {
                setScale(scale * 0.75);
            } else {
                setScale(1);
            }
        };

        updateScale();
        window.addEventListener('resize', updateScale);

        return () => window.removeEventListener('resize', updateScale);
    }, [zoom, currentPage, document.pages]);

    const totalPages = document.pages.length;

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const currentPageHighLights = useMemo<HighlightWithActive[]>(
        () =>
            (highLights ?? [])
                ?.filter((highlight) => highlight.page === currentPage)
                .map((highlight) => ({
                    ...highlight,
                    isActive: (activeHighLights ?? []).some(
                        (active) =>
                            active?.join(',') === highlight.position?.join(',')
                    ),
                })),
        [highLights, currentPage, activeHighLights]
    );

    return (
        <div
            className={cn(
                'relative dark:bg-neutral-900 bg-neutral-500 flex-1 max-h-full overflow-hidden',
                className
            )}
            ref={containerRef}
        >
            <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10 select-none'>
                {totalPages > 1 && (
                    <Button
                        variant='outline'
                        size='sm'
                        onClick={goToPreviousPage}
                        disabled={currentPage <= 1}
                    >
                        Previous
                    </Button>
                )}
                <span className='text-sm font-medium text-black'>
                    Page {currentPage} of {totalPages}
                </span>
                {totalPages > 1 && (
                    <Button
                        variant='outline'
                        size='sm'
                        onClick={goToNextPage}
                        disabled={currentPage >= totalPages}
                    >
                        Next
                    </Button>
                )}
            </div>
            <div className='h-full max-h-full overflow-auto'>
                <div
                    className='relative mx-auto m-3'
                    style={{
                        width: `${document.pages[currentPage - 1].image.width * scale}px`,
                        height: `${document.pages[currentPage - 1].image.height * scale}px`,
                    }}
                >
                    <img
                        src={
                            '/pages/' +
                            document.pages[currentPage - 1].image.url
                        }
                        alt={`Page ${currentPage}`}
                        width={
                            document.pages[currentPage - 1].image.width * scale
                        }
                        height={
                            document.pages[currentPage - 1].image.height * scale
                        }
                    />
                    <div className='absolute top-0 left-0 w-full h-full'>
                        {currentPageHighLights?.map((highlight) => {
                            if (highlight.position?.length !== 4) return null;
                            return (
                                <svg
                                    key={highlight.position.join(',')}
                                    className='absolute'
                                    style={{
                                        left: highlight.position[0] * scale,
                                        top: highlight.position[1] * scale,
                                    }}
                                    width={
                                        (highlight.position[2] -
                                            highlight.position[0]) *
                                        scale
                                    }
                                    height={
                                        (highlight.position[3] -
                                            highlight.position[1]) *
                                        scale
                                    }
                                    aria-label={highlight.label}
                                    onMouseEnter={() =>
                                        onHighlightHover?.(highlight)
                                    }
                                    onMouseLeave={() =>
                                        onHighlightHover?.(null)
                                    }
                                >
                                    <rect
                                        width='100%'
                                        height='100%'
                                        className={cn(
                                            'opacity-0 hover:opacity-100',
                                            {
                                                'opacity-100':
                                                    highlight.isActive ||
                                                    highlight.isSelected,
                                            }
                                        )}
                                        fill={highlight.color}
                                        fillOpacity={0.4}
                                    />
                                </svg>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
