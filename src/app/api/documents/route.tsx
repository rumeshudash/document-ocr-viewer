import { NextResponse } from 'next/server';

import documents from '@/data/pages.json';

export async function GET() {
    return NextResponse.json(documents);
}
