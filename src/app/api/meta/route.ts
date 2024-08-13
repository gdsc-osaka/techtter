import metaFetcher from 'meta-fetcher';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const url = req.nextUrl.searchParams.get('url');

    if (url === null) {
        return NextResponse.json({ error: 'URL required' }, { status: 400 });
    }

    const metadata = await metaFetcher(url);
    return NextResponse.json({ metadata });
}
