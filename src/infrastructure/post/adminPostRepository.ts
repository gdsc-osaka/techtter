import { ForCreateWithId } from '@/domain/_utils';
import { Post } from '@/domain/post';
import { db } from '@/firebaseAdmin';
import { adminPostConverter } from '@/infrastructure/post/adminPostConverter';
import { IPostRepository } from '@/infrastructure/post/iPostRepository';
import { logger } from '@/logger';
import * as admin from 'firebase-admin';
import { Timestamp } from 'firebase/firestore';

export class AdminPostRepository implements IPostRepository {
    private readonly colRef = (userId: string) =>
        db
            .collection(`users/${userId}/posts`)
            .withConverter(adminPostConverter);
    private readonly docRef = (userId: string, postId: string) =>
        db
            .doc(`users/${userId}/posts/${postId}`)
            .withConverter(adminPostConverter);

    async create(post: ForCreateWithId<Post>): Promise<Post> {
        try {
            await this.docRef(post.user_id, post.id).set({
                ...post,
                created_at: admin.firestore.FieldValue.serverTimestamp(),
                updated_at: admin.firestore.FieldValue.serverTimestamp(),
            });
            logger.log(`Post created. (${post.id})`);
            return {
                ...post,
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
