import { NextResponse } from 'next/server';
import { Admin } from '@/firebase-admin';

export async function GET() {
    try {
        const users = await Admin.auth.listUsers(10);
        return NextResponse.json({ users: users });
    } catch (e) {
        return NextResponse.json({ error: 'ERROR' }, { status: 500 });
    }
}
