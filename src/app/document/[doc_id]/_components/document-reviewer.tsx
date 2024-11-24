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
    return (
        <div className='flex gap-4 h-full'>
            <DocumentViewer
                key={document.doc_id}
                document={document}
                className='flex-[2] border-r'
            />
            <FieldSelector
                sections={sections}
                className='flex-1 min-w-[200px]'
            />
        </div>
    );
};
