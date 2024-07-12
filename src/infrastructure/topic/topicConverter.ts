import {FirestoreDataConverter, Timestamp} from "firebase/firestore";
import {Topic} from "@/domain/topic";

function assertsTopic(data: any): asserts data is Topic {
    if (
        typeof data.id === 'string' &&
        typeof data.name === 'string' &&
        typeof data.left === 'number' &&
        typeof data.right === 'number' &&
        typeof data.created_at === 'object' &&
        data.created_at instanceof Timestamp &&
        typeof data.updated_at === 'object' &&
        data.updated_at instanceof Timestamp
    ) {
        return data;
    }
}

export const topicConverter: FirestoreDataConverter<Topic> = {
    fromFirestore(snapshot, options): Topic {
        const data = snapshot.data(options);
        const category = {...data, id: snapshot.id};
        assertsTopic(category);
        return category;
    },
    toFirestore(modelObject) {
        const d = Object.assign({}, modelObject);
        delete d.id;
        return d;
    }
}
