import { notFound } from 'next/navigation';
import React from 'react';

import { Header } from '@/components/header';
import { api } from '@/lib/axios';
import { Document } from '@/types/document.types';

const DocumentLayout = async ({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ doc_id: string }>;
}) => {
    const { doc_id } = await params;
    const { data } = await api
        .get<{ data: Document }>(`/api/document/${doc_id}`)
        .catch(() => {
            notFound();
        });
    const document = data?.data;

    return (
        <article>
            <Header title={document.title} />
            {children}
        </article>
    );
};

export default DocumentLayout;
