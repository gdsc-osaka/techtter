import { FirestoreDataConverter, Timestamp } from 'firebase/firestore';
import { Post } from '@/domain/post';

function assertsPost(data: object): asserts data is Post {
    if (
        !(
            'id' in data &&
            typeof data.id === 'string' &&
            'user_id' in data &&
            typeof data.user_id === 'string' &&
            'topic_id' in data &&
            typeof data.topic_id === 'string' &&
            'topic_center' in data &&
            typeof data.topic_center === 'number' &&
            'tags' in data &&
            data.tags instanceof Array &&
            'content' in data &&
            typeof data.content === 'string' &&
            'created_at' in data &&
            typeof data.created_at === 'object' &&
            data.created_at instanceof Timestamp &&
            'updated_at' in data &&
            typeof data.updated_at === 'object' &&
            data.updated_at instanceof Timestamp
        )
    ) {
        throw new Error('data is not a type of Post');
    }
}

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
