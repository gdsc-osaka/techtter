import { ITopicRepository } from '@/infrastructure/topic/ITopicRepository';
import { ForCreateWithId, ForUpdate, WithFieldValues } from '@/domain/_utils';
import { Topic } from '@/domain/topic';
import { db } from '@/firebase';
import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    serverTimestamp,
    setDoc,
    Timestamp,
    updateDoc,
} from 'firebase/firestore';
import { topicConverter } from '@/infrastructure/topic/topicConverter';

export class TopicRepository implements ITopicRepository {
    private readonly colRef = () =>
        collection(db, `topics`).withConverter(topicConverter);
    private readonly docRef = (categoryId: string) =>
        doc(db, `topics/${categoryId}`).withConverter(topicConverter);

    async create(topic: ForCreateWithId<Topic>): Promise<Topic> {
        try {
            await setDoc(this.docRef(topic.id), {
                ...topic,
                created_at: serverTimestamp(),
                updated_at: serverTimestamp(),
            });
            console.log(`Topic created. (${topic.id})`);
            return {
                ...topic,
                id: topic.id,
                created_at: Timestamp.now(),
                updated_at: Timestamp.now(),
            };
        } catch (e) {
            console.error(e);
            return Promise.reject(e);
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await deleteDoc(this.docRef(id));
        } catch (e) {
            console.error(e);
            return Promise.reject(e);
        }
    }

    async update(topic: ForUpdate<WithFieldValues<Topic>>): Promise<void> {
        try {
            await updateDoc(this.docRef(topic.id), topic);
        } catch (e) {
            console.error(e);
            return Promise.reject(e);
        }
    }

    async find(id: string): Promise<Topic | undefined> {
        try {
            const snapshot = await getDoc(this.docRef(id));
            return snapshot.data();
        } catch (e) {
            console.error(e);
            return Promise.reject(e);
        }
    }
    async findMany(): Promise<Topic[]> {
        try {
            const snapshot = await getDocs(this.colRef());
            return snapshot.docs.map((d) => d.data());
        } catch (e) {
            console.error(e);
            return Promise.reject(e);
        }
    }
}
