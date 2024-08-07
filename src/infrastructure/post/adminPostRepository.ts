import { ForCreate } from '@/domain/_utils';
import { Post } from '@/domain/post';
import { Admin } from '@/firebaseAdmin';
import { adminPostConverter } from '@/infrastructure/post/adminPostConverter';
import { IPostRepository } from '@/infrastructure/post/iPostRepository';
import { logger } from '@/logger';
import * as admin from 'firebase-admin';
import { Timestamp } from 'firebase/firestore';

export class AdminPostRepository implements IPostRepository {
    private readonly colRef = (userId: string) =>
        Admin.db
            .collection(`users/${userId}/posts`)
            .withConverter(adminPostConverter);
    private readonly docRef = (userId: string, postId: string) =>
        Admin.db
            .doc(`users/${userId}/posts/${postId}`)
            .withConverter(adminPostConverter);

    async create(post: ForCreate<Post>): Promise<Post> {
        try {
            const ref = this.colRef(post.user_id).doc();
            await ref.set({
                ...post,
                id: ref.id,
                created_at: admin.firestore.FieldValue.serverTimestamp(),
                updated_at: admin.firestore.FieldValue.serverTimestamp(),
            });
            logger.log(`Post created. (${ref.id})`);
            return {
                ...post,
                id: ref.id,
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
            const snapshot = await this.docRef(userId, postId).get();
            return snapshot.data();
        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }
    }

    async delete(userId: string, id: string): Promise<void> {
        try {
            const ref = this.docRef(userId, id);
            await ref.delete();
            logger.log(`Post deleted. (${id})`);
        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }
    }
}
