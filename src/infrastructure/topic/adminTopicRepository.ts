import { ITopicRepository } from '@/infrastructure/topic/ITopicRepository';
import { Admin } from '@/firebaseAdmin';
import { firestore } from 'firebase-admin';
import { Timestamp } from 'firebase/firestore';
import { Topic } from '@/domain/topic';
import { ForCreateWithId, ForUpdate } from '@/domain/_utils';
import { logger } from '@/logger';
import { adminTopicConverter } from '@/infrastructure/topic/adminTopicConverter';

export class AdminTopicRepository implements ITopicRepository {
    private readonly colRef = () =>
        Admin.db.collection('topics').withConverter(adminTopicConverter);
    private readonly docRef = (topicId: string) =>
        Admin.db.doc(`topics/${topicId}`);

    async create(topic: ForCreateWithId<Topic>): Promise<Topic> {
        try {
            await this.colRef()
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
            await this.docRef(id).delete();
        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }
    }

    async find(id: string): Promise<Topic | undefined> {
        try {
            const snapshot = await this.docRef(id).get();
            return snapshot.data() as Topic | undefined;
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
            await this.docRef(topic.id).update({
                ...topic,
                updated_at: firestore.FieldValue.serverTimestamp(),
            });
        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }
    }
}
