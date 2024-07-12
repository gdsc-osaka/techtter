import { FirestoreDataConverter, Timestamp } from 'firebase/firestore';
import { Topic } from '@/domain/topic';

function assertsTopic(data: object): asserts data is Topic {
    if (
        !(
            'id' in data &&
            typeof data.id === 'string' &&
            'name' in data &&
            typeof data.name === 'string' &&
            'left' in data &&
            typeof data.left === 'number' &&
            'right' in data &&
            typeof data.right === 'number' &&
            'created_at' in data &&
            typeof data.created_at === 'object' &&
            data.created_at instanceof Timestamp &&
            'updated_at' in data &&
            typeof data.updated_at === 'object' &&
            data.updated_at instanceof Timestamp
        )
    ) {
        throw new Error('data is not a type of Topic');
    }
}

export const topicConverter: FirestoreDataConverter<Topic> = {
    fromFirestore(snapshot, options): Topic {
        const data = snapshot.data(options);
        const category = { ...data, id: snapshot.id };
        assertsTopic(category);
        return category;
    },
    toFirestore(modelObject) {
        const d = Object.assign({}, modelObject);
        delete d.id;
        return d;
    },
};
