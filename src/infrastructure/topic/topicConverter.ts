import { FirestoreDataConverter } from 'firebase/firestore';
import { assertsTopic, Topic } from '@/domain/topic';

export const topicConverter: FirestoreDataConverter<Topic> = {
    fromFirestore(snapshot, options): Topic {
        const data = snapshot.data(options);
        const topic = { ...data, id: snapshot.id };
        assertsTopic(topic);
        // webhooks が未定義なら初期値を入れておく
        return {...topic, webhooks: topic.webhooks ?? []};
    },
    toFirestore(modelObject) {
        const d = Object.assign({}, modelObject);
        delete d.id;
        return d;
    },
};
