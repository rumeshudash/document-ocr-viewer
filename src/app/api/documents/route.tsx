import { NextResponse } from 'next/server';

import documents from '@/data/pages.json';

/**
 * GET request handler for fetching all documents
 */
export async function GET() {
    return NextResponse.json(documents);
}
