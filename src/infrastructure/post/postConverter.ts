import {FirestoreDataConverter} from 'firebase/firestore';
import {assertsPost, Post} from '@/domain/post';

export const postConverter: FirestoreDataConverter<Post> = {
    fromFirestore(snapshot, options): Post {
        const data = snapshot.data(options);
        const userId = snapshot.ref.parent.id;
        const category = { ...data, id: snapshot.id, userId };
        assertsPost(category);
        return category;
    },
    toFirestore(modelObject) {
        const d = Object.assign({}, modelObject);
        delete d.id;
        return d;
    },
};
