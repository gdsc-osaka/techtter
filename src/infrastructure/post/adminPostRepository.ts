import {IPostRepository} from '@/infrastructure/post/iPostRepository';
import {ForCreate} from '@/domain/_utils';
import {assertsPost, Post} from '@/domain/post';
import {Timestamp,} from 'firebase/firestore';
import {logger} from '@/logger';
import * as admin from "firebase-admin";
import {Admin} from "@/firebaseAdmin";

const postConverter: admin.firestore.FirestoreDataConverter<Post> = {
    fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): Post {
        const data = snapshot.data();
        const topic = { ...data, id: snapshot.id };
        assertsPost(topic);
        return topic;
    },
    toFirestore(
        modelObject:
            | FirebaseFirestore.WithFieldValue<Post>
            | FirebaseFirestore.PartialWithFieldValue<Post>
    ) {
        const d = Object.assign({}, modelObject);
        delete d.id;
        return d;
    },
};

export class AdminPostRepository implements IPostRepository {
    private readonly colRef = (userId: string) =>
        Admin.db.collection(`users/${userId}/posts`).withConverter(postConverter);
    private readonly docRef = (userId: string, postId: string) =>
        Admin.db.doc(`users/${userId}/posts/${postId}`).withConverter(postConverter);

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
}
