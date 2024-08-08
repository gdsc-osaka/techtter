import { FireUser } from '@/domain/fireUser';
import { auth } from "@/firebaseAdmin";
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest,
    { params }: { params: { uid: string } }
) {
    try {
        const resultUser = await auth.getUser(params.uid);
        const fireUser: FireUser = {
            uid: resultUser.uid,
            displayName: resultUser.displayName || null,
            photoUrl: resultUser.photoURL || null,
        };

        return NextResponse.json({
            user: fireUser,
        });
    } catch (e) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
