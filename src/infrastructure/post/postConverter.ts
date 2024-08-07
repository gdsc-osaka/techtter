import { FirestoreDataConverter } from 'firebase/firestore';
import { assertsPost, Post } from '@/domain/post';

export const postConverter: FirestoreDataConverter<Post> = {
    fromFirestore(snapshot, options): Post {
        const data = snapshot.data(options);
        const post = {
            ...data,
            id: snapshot.id,
            user_id: snapshot.ref.parent.parent?.id ?? '',
        };
        assertsPost(post);
        return post;
    },
    toFirestore(modelObject) {
        const d = Object.assign({}, modelObject);
        delete d.id;
        delete d.user_id;
        return d;
    },
};
