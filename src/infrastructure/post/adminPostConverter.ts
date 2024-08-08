import { assertsPost, Post } from '@/domain/post';
import * as admin from 'firebase-admin';
import { Timestamp } from 'firebase/firestore';

function convertAdminTimestamp(t: unknown) {
    return t instanceof admin.firestore.Timestamp
        ? Timestamp.fromDate(t.toDate())
        : t;
}

export const adminPostConverter: admin.firestore.FirestoreDataConverter<Post> =
    {
        fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): Post {
            const data = snapshot.data();
            const post = {
                ...data,
                created_at: convertAdminTimestamp(data.created_at),
                updated_at: convertAdminTimestamp(data.updated_at),
                id: snapshot.id,
                user_id: snapshot.ref.parent.parent?.id ?? '',
            };
            assertsPost(post);
            return post;
        },
        toFirestore(
            modelObject:
                | FirebaseFirestore.WithFieldValue<Post>
                | FirebaseFirestore.PartialWithFieldValue<Post>
        ) {
            const d = Object.assign({}, modelObject);
            delete d.id;
            delete d.user_id;
            return d;
        },
    };
