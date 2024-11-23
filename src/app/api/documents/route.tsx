import documents from '@/data/pages.json';
import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json(documents);
}
