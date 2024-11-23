import sections from '@/data/sections.json';
import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json(sections);
}
