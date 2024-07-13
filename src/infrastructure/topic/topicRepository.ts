import { ITopicRepository } from '@/infrastructure/topic/ITopicRepository';
import { ForCreate, ForUpdate } from '@/domain/_utils';
import { Topic } from '@/domain/topic';
import { db } from '@/firebase';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    updateDoc,
} from 'firebase/firestore';
import { topicConverter } from '@/infrastructure/topic/topicConverter';
import { logger } from '@/logger';

export class TopicRepository implements ITopicRepository {
    private readonly colRef = () =>
        collection(db, `categories`).withConverter(topicConverter);
    private readonly docRef = (categoryId: string) =>
        doc(db, `categories/${categoryId}`).withConverter(topicConverter);

    async create(topic: ForCreate<Topic>): Promise<void> {
        try {
            await addDoc(this.colRef(), topic);
        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await deleteDoc(this.docRef(id));
        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }
    }

    async update(topic: ForUpdate<Topic>): Promise<void> {
        try {
            await updateDoc(this.docRef(topic.id), topic);
        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }
    }

    async find(id: string): Promise<Topic | undefined> {
        try {
            const snapshot = await getDoc(this.docRef(id));
            return snapshot.data();
        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }
    }
    async findMany(): Promise<Topic[]> {
        try {
            const snapshot = await getDocs(this.colRef());
            return snapshot.docs.map((d) => d.data());
        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }
    }
}
