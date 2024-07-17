import {NextRequest, NextResponse} from 'next/server';
import metaFetcher from "meta-fetcher";

export async function GET(req: NextRequest) {
    const url = req.nextUrl.searchParams.get('url');

    if (url === null) return NextResponse.json({error: 'URL is required'}, {status: 400});

    try {
        const meta = await metaFetcher(url);
        return NextResponse.json(meta, {status: 200});
    } catch (e) {
        return NextResponse.json({error: 'Internal server error'}, {status: 500});
    }
}
