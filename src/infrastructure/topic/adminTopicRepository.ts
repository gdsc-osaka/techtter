import { ITopicRepository } from '@/infrastructure/topic/ITopicRepository';
import { Admin } from '@/firebaseAdmin';
import * as admin from 'firebase-admin';
import { Timestamp } from 'firebase/firestore';
import { assertsTopic, Topic } from '@/domain/topic';
import { ForCreateWithId, ForUpdate } from '@/domain/_utils';
import { logger } from '@/logger';

const topicConverter: admin.firestore.FirestoreDataConverter<Topic> = {
    fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): Topic {
        const data = snapshot.data();
        const topic = { ...data, id: snapshot.id };
        assertsTopic(topic);
        return topic;
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

export class AdminTopicRepository implements ITopicRepository {
    private readonly colRef = () =>
        Admin.db.collection('topics').withConverter(topicConverter);
    private readonly docRef = (categoryId: string) =>
        Admin.db.doc(`topics/${categoryId}`).withConverter(topicConverter);

    async create(topic: ForCreateWithId<Topic>): Promise<Topic> {
        try {
            await this.colRef()
                .doc(topic.id)
                .set({
                    ...topic,
                    created_at: admin.firestore.FieldValue.serverTimestamp(),
                    updated_at: admin.firestore.FieldValue.serverTimestamp(),
                });
            logger.log(`Topic created. (${topic.id})`);
            return {
                ...topic,
                id: topic.id,
                created_at: Timestamp.now(),
                updated_at: Timestamp.now(),
            };
        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await this.docRef(id).delete();
        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }
    }

    async find(id: string): Promise<Topic | undefined> {
        try {
            const snapshot = await this.docRef(id).get();
            return snapshot.data();
        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }
    }

    async findMany(): Promise<Topic[]> {
        try {
            const snapshot = await this.colRef().get();
            return snapshot.docs.map((doc) => doc.data());
        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }
    }

    async update(topic: ForUpdate<Topic>): Promise<void> {
        try {
            await this.docRef(topic.id).update(topic);
        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }
    }
}