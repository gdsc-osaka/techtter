import { ForCreateWithId, ForUpdate } from '@/domain/_utils';
import { Topic } from '@/domain/topic';
import { db } from '@/firebaseAdmin';
import { adminTopicConverter } from '@/infrastructure/topic/adminTopicConverter';
import { ITopicRepository } from '@/infrastructure/topic/ITopicRepository';
import { logger } from '@/logger';
import { firestore } from 'firebase-admin';
import { Timestamp } from 'firebase/firestore';

const colRef = () =>
    db.collection('topics').withConverter(adminTopicConverter);
const docRef = (topicId: string) =>
    db.doc(`topics/${topicId}`).withConverter(adminTopicConverter);

export class AdminTopicRepository implements ITopicRepository {
    async create(topic: ForCreateWithId<Topic>): Promise<Topic> {
        try {
            await colRef()
                .doc(topic.id)
                .set({
                    ...topic,
                    created_at: firestore.FieldValue.serverTimestamp(),
                    updated_at: firestore.FieldValue.serverTimestamp(),
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
            await docRef(id).delete();
        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }
    }

    async find(id: string): Promise<Topic | undefined> {
        try {
            console.log('Getting topic...');
            const snapshot = await docRef(id).get();
            console.log('Got topic.');
            return snapshot.data();
        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }
    }

    async findMany(): Promise<Topic[]> {
        try {
            const snapshot = await colRef().get();
            return snapshot.docs.map((doc) => doc.data());
        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }
    }

    async update(topic: ForUpdate<Topic>): Promise<void> {
        try {
            await docRef(topic.id).update({
                ...topic,
                updated_at: firestore.FieldValue.serverTimestamp(),
            });
        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }
    }
}
