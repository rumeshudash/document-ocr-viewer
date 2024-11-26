'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { FieldSelectionConfirmed } from '@/components/alerts/field-selection-confirmed';
import { DocumentViewer } from '@/components/document-viewer';
import { FieldSelector } from '@/components/field-selector';
import { Document, Field, Highlight, Section } from '@/types/document.types';

/**
 * DocumentReviewer component for reviewing and selecting fields in a document
 * @component
 * @param {Object} props - Component props
 * @param {Document} props.document - The document being reviewed
 * @param {Section[]} props.sections - Array of sections containing fields
 */
export const DocumentReviewer = ({
    document,
    sections: propsSections,
}: {
    document: Document;
    sections: Section[];
}) => {
    const router = useRouter();

    /**
     * State to manage document sections
     */
    const [sections, setSections] = useState(propsSections);

    /**
     * State to manage selected fields
     */
    const [selectedFields, setSelectedFields] = useState<Field[]>([]);

    /**
     * State to manage hovered field
     */
    const [hoveredField, setHoveredField] = useState<Field | null>(null);

    /**
     * State to manage hovered highlight
     */
    const [hoveredHighlight, setHoveredHighlight] = useState<Highlight | null>(
        null
    );

    /**
     * State to manage field selection confirmation
     */
    const [fieldSelectionConfirmed, setFieldSelectionConfirmed] =
        useState(false);

    /**
     * Memoized highlights based on sections
     * Creates highlight objects for each field in the sections
     * @returns {Highlight[]} Array of highlight objects
     */
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

    /**
     * Memoized active highlights based on selected fields
     * Filters highlights to only include those corresponding to selected fields
     * @returns {Position[]} Array of position objects for selected fields
     */
    const activeHighlights = useMemo(
        () =>
            highlights
                .filter((highlight) =>
                    selectedFields.some((field) => field.id === highlight.id)
                )
                .map((highlight) => highlight.position),
        [highlights, selectedFields]
    );

    /**
     * Handles the deletion of a field from sections
     * @param {Field} field - The field to delete
     */
    const handleDeleteField = (field: Field) => {
        setSections(
            sections.map((section) => ({
                ...section,
                children: section.children.filter((f) => f.id !== field.id),
            }))
        );
    };

    /**
     * Handles the confirmation of field selection
     * Sets fieldSelectionConfirmed state to true
     */
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
