import { firestore } from 'firebase-admin';
import { assertsTopic, Topic } from '@/domain/topic';

export const adminTopicConverter: firestore.FirestoreDataConverter<Topic> = {
    fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): Topic {
        const data = snapshot.data();
        const topic = { ...data, id: snapshot.id };
        assertsTopic(topic);
        return { ...topic, webhooks: topic.webhooks ?? [] };
    },
    toFirestore(
        modelObject:
            | FirebaseFirestore.WithFieldValue<Topic>
            | FirebaseFirestore.PartialWithFieldValue<Topic>
    ) {
        const d = Object.assign({}, modelObject);
        delete d.id;
        return d;
    },
};
