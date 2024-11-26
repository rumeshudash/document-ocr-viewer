import { NextResponse } from 'next/server';

import sections from '@/data/sections.json';

/**
 * GET request handler for fetching sections for a document
 */
export async function GET() {
    return NextResponse.json(sections);
}
