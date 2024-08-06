import { auth } from 'firebase-admin';

export interface DecodedIdToken extends auth.DecodedIdToken {}
export interface UserRecord extends auth.UserRecord {}

export interface IAuthRepository {
    verifyIdToken(idToken: string): Promise<DecodedIdToken>;

    getUser(uid: string): Promise<UserRecord>;
}
