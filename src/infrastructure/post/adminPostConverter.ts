import { assertsPost, Post } from '@/domain/post';
import * as admin from 'firebase-admin';

export const adminPostConverter: admin.firestore.FirestoreDataConverter<Post> =
    {
        fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): Post {
            const data = snapshot.data();
            const post = {
                ...data,
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
