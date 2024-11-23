import { api } from '@/lib/axios';
import { Document, Section } from '@/types/document.types';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ doc_id: string }>;
}) {
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
}: {
    params: Promise<{ doc_id: string }>;
}) {
    const { doc_id } = await params;
    const { data } = await api.get<{ data: Document }>(
        `/api/document/${doc_id}`
    );
    const { data: sections } = await api.get<{ data: { sections: Section[] } }>(
        `/api/document/${doc_id}/sections`
    );
    const document = data?.data;

    return (
        <div>
            {document.title} {sections.data.sections[0].title}
        </div>
    );
}
