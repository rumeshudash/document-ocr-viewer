import { NextRequest, NextResponse } from 'next/server';

import documents from '@/data/pages.json';

/**
 * GET request handler for fetching a document by ID
 */
export async function GET(
    _: NextRequest,
    { params }: { params: Promise<{ doc_id: string }> }
) {
    const { doc_id } = await params;

    // Finds the document with the given ID
    const document = documents.data.documents.find(
        (doc) => doc.doc_id === doc_id
    );

    // If the document is not found, returns a 404 error
    if (!document) {
        return NextResponse.json(
            { error: 'Document not found' },
            { status: 404 }
        );
    }

    // Returns the document
    return NextResponse.json({ data: document, status: 'success' });
}
