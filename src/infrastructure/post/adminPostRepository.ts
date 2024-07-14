import { IPostRepository } from '@/infrastructure/post/iPostRepository';
import { ForCreate, ForUpdate } from '@/domain/_utils';
import { Post } from '@/domain/post';
import {
    collection,
    doc,
    getDoc,
    serverTimestamp,
    setDoc,
    Timestamp,
} from 'firebase/firestore';
import { db } from '@/firebase';
import { postConverter } from '@/infrastructure/post/postConverter';
import { logger } from '@/logger';
import { Admin } from '@/firebaseAdmin';

export class AdminPostRepository implements IPostRepository {
    private readonly docRef = (userId: string, postId: string) =>
        doc(db, `users/${userId}/posts/${postId}`).withConverter(postConverter);
    private readonly colRef = (userId: string) =>
        collection(db, `users/${userId}/posts`).withConverter(postConverter);

    async create(post: ForCreate<Post>): Promise<Post> {
        try {
            const ref = doc(this.colRef(post.user_id));
            await setDoc(ref, {
                ...post,
                id: ref.id,
                created_at: serverTimestamp(),
                updated_at: serverTimestamp(),
            });
            return {
                ...post,
                id: ref.id,
                // serverTimestamp との誤差は許容
                created_at: Timestamp.now(),
                updated_at: Timestamp.now(),
            };
        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }
    }

    async find(userId: string, postId: string): Promise<Post | undefined> {
        try {
            const snapshot = await getDoc(this.docRef(userId, postId));
            return snapshot.data();
        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }
    }
}
