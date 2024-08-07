import {
    DecodedIdToken,
    IAuthRepository,
    UserRecord,
} from '@/infrastructure/auth/iAuthRepository';
import { auth } from '@/firebaseAdmin';

export class AuthRepository implements IAuthRepository {
    getUser(uid: string): Promise<UserRecord> {
        return auth.getUser(uid);
    }

    verifyIdToken(idToken: string): Promise<DecodedIdToken> {
        return auth.verifyIdToken(idToken);
    }
}
