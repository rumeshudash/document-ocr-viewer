import documents from '@/data/pages.json';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_: NextRequest, { params }: { params: Promise<{ doc_id: string }> }) {
    const { doc_id } = await params;
    const document = documents.data.documents.find((doc) => doc.doc_id === doc_id);
    if (!document) {
        return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }
    return NextResponse.json({ data: document, status: 'success' });
}
