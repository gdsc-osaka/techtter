import { NextRequest, NextResponse } from 'next/server';
import { Admin } from '@/firebaseAdmin';
import { FireUser } from '@/domain/fireUser';
import { logger } from '@/logger';

export async function GET(
    req: NextRequest,
    { params }: { params: { uid: string } }
) {
    const authorization = req.headers.get('Authorization');
    const split = authorization?.split(' ');

    if (split === undefined || split.length !== 2) {
        return NextResponse.json('Unauthorized', { status: 401 });
    }

    const idToken = split[1];

    try {
        await Admin.auth.verifyIdToken(idToken);
        logger.log(`User ${params.uid} verified`);
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
