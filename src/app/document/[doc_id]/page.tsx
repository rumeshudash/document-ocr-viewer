import { api } from '@/lib/axios';
import { generateRandomColor } from '@/lib/color';
import { Document, Section } from '@/types/document.types';

import { DocumentReviewer } from './_components/document-reviewer';

export async function generateMetadata({
    params,
}: Readonly<{
    params: Promise<{ doc_id: string }>;
}>) {
    const { doc_id } = await params;
    const { data } = await api.get<{ data: Document }>(
        `/api/document/${doc_id}`
    );
    const document = data?.data;

    return {
        title: document.title,
        description: document.status,
    };
}

export default async function DocumentPage({
    params,
}: Readonly<{
    params: Promise<{ doc_id: string }>;
}>) {
    const { doc_id } = await params;
    const { data } = await api.get<{ data: Document }>(
        `/api/document/${doc_id}`
    );
    const { data: sectionData } = await api.get<{
        data: { sections: Section[] };
    }>(`/api/document/${doc_id}/sections`);
    const document = data?.data;

    const sections = sectionData.data?.sections.map((section) => ({
        ...section,
        children: section.children.map((child) => ({
            ...child,
            color: generateRandomColor(),
        })),
    }));

    return <DocumentReviewer document={document} sections={sections} />;
}
