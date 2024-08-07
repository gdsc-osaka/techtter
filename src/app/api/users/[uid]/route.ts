import { NextRequest, NextResponse } from 'next/server';
import { Admin } from '@/firebaseAdmin';
import { FireUser } from '@/domain/fireUser';
import { logger } from '@/logger';

export async function GET(
    req: NextRequest,
    { params }: { params: { uid: string } }
) {
    try {
        const resultUser = await Admin.auth.getUser(params.uid);
        logger.log(`Got user ${resultUser.uid}`);
        const fireUser: FireUser = {
            uid: resultUser.uid,
            displayName: resultUser.displayName || null,
            photoUrl: resultUser.photoURL || null,
        };

        return NextResponse.json({
            user: fireUser,
        });
    } catch (e) {
        logger.error(e);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
