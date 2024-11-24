'use client';

import { DocumentViewer } from '@/components/document-viewer';
import { FieldSelector } from '@/components/field-selector';
import { Document, Section } from '@/types/document.types';

export const DocumentReviewer = ({
    document,
    sections,
}: {
    document: Document;
    sections: Section[];
}) => {
    const highlights = sections.flatMap((section) => {
        return section.children.map((child) => {
            return {
                page: child.content?.page,
                position: child.content?.position,
                label: child.label,
                color: 'red',
            };
        });
    });

    return (
        <div className='flex gap-4 flex-1 overflow-hidden'>
            <DocumentViewer
                key={document.doc_id}
                document={document}
                className='flex-[2] border-r'
                highLights={highlights}
                activeHighLights={[
                    [110, 483, 283, 499],
                    [319, 170, 456, 195],
                ]}
            />
            <FieldSelector
                sections={sections}
                className='flex-1 min-w-[200px]'
            />
        </div>
    );
};
