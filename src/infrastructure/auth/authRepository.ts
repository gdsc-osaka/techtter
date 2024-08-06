import {
    DecodedIdToken,
    IAuthRepository,
    UserRecord,
} from '@/infrastructure/auth/iAuthRepository';
import { Admin } from '@/firebaseAdmin';

export class AuthRepository implements IAuthRepository {
    getUser(uid: string): Promise<UserRecord> {
        return Admin.auth.getUser(uid);
    }

    verifyIdToken(idToken: string): Promise<DecodedIdToken> {
        return Admin.auth.verifyIdToken(idToken);
    }
}
