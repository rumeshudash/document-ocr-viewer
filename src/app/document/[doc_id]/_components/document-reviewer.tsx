'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { FieldSelectionConfirmed } from '@/components/alerts/field-selection-confirmed';
import { DocumentViewer } from '@/components/document-viewer';
import { FieldSelector } from '@/components/field-selector';
import { Document, Field, Highlight, Section } from '@/types/document.types';

export const DocumentReviewer = ({
    document,
    sections: propsSections,
}: {
    document: Document;
    sections: Section[];
}) => {
    const router = useRouter();

    const [sections, setSections] = useState(propsSections);

    const [selectedFields, setSelectedFields] = useState<Field[]>([]);
    const [hoveredField, setHoveredField] = useState<Field | null>(null);
    const [hoveredHighlight, setHoveredHighlight] = useState<Highlight | null>(
        null
    );
    const [fieldSelectionConfirmed, setFieldSelectionConfirmed] =
        useState(false);

    const highlights = useMemo(
        () =>
            sections.flatMap((section) =>
                section.children.map<Highlight>((field) => ({
                    id: field.id,
                    page: field.content?.page,
                    position: field.content?.position,
                    label: field.label,
                    color: field.color ?? '',
                    isSelected: hoveredField?.id === field.id,
                }))
            ),
        [hoveredField?.id, sections]
    );

    const activeHighlights = useMemo(
        () =>
            highlights
                .filter((highlight) =>
                    selectedFields.some((field) => field.id === highlight.id)
                )
                .map((highlight) => highlight.position),
        [highlights, selectedFields]
    );

    const handleDeleteField = (field: Field) => {
        setSections(
            sections.map((section) => ({
                ...section,
                children: section.children.filter((f) => f.id !== field.id),
            }))
        );
    };

    const handleConfirm = () => {
        setFieldSelectionConfirmed(true);
    };

    return (
        <div className='flex flex-1 overflow-hidden'>
            <DocumentViewer
                key={document.doc_id}
                document={document}
                className='flex-[2] border-r'
                highLights={highlights}
                activeHighLights={activeHighlights}
                onHighlightHover={setHoveredHighlight}
            />
            <FieldSelector
                sections={sections}
                className='p-4'
                onSelectionChange={setSelectedFields}
                highlightFieldId={hoveredHighlight?.id}
                onFieldHover={setHoveredField}
                onFieldDelete={handleDeleteField}
                onConfirm={handleConfirm}
            />
            <FieldSelectionConfirmed
                open={fieldSelectionConfirmed}
                onOpenChange={(open) => !open && router.push('/')}
            />
        </div>
    );
};
