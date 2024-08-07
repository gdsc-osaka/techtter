import { NextResponse } from 'next/server';
import { auth } from '@/firebaseAdmin';

export async function GET() {
    try {
        const users = await auth.listUsers(10);
        return NextResponse.json({ users: users });
    } catch (e) {
        return NextResponse.json({ error: 'ERROR' }, { status: 500 });
    }
}
