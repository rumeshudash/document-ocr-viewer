import Link from 'next/link';

import { DocumentCard } from '@/components/documentCard';
import { Header } from '@/components/header';
import { api } from '@/lib/axios';
import { Document } from '@/types/document.types';

export const dynamic = 'force-dynamic';

export default async function Home() {
    const { data } = await api.get('/api/documents');
    const documents = data?.data?.documents || [];

    return (
        <article>
            <Header title='Documents' subtitle='Select a document to view' />
            <section className='flex flex-wrap gap-4 p-4'>
                {documents.map((document: Document) => {
                    return (
                        <Link
                            href={`/document/${document.doc_id}`}
                            key={document.doc_id}
                        >
                            <DocumentCard document={document} isLink />
                        </Link>
                    );
                })}
            </section>
        </article>
    );
}
