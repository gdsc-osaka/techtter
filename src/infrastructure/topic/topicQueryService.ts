import {
    ITopicQueryService,
    TopicsCallback,
} from '@/infrastructure/topic/iTopicQueryService';
import {
    collection,
    endBefore,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    QueryConstraint,
    startAt,
    where,
} from 'firebase/firestore';
import { db } from '@/firebase';
import { topicConverter } from '@/infrastructure/topic/topicConverter';
import { Topic } from '@/domain/topic';

export class TopicQueryService implements ITopicQueryService {
    private readonly colRef = collection(db, 'topics').withConverter(
        topicConverter
    );

    subscribeTopics(callback: TopicsCallback): void {
        onSnapshot(this.colRef, (snapshot) => {
            const topics = snapshot.docs.map((d) => d.data());
            callback(topics);
        });
    }

    async findManyChildren(
        parent: Topic,
        includeDescendants: boolean = false
    ): Promise<Topic[]> {
        const constrains: QueryConstraint[] = [orderBy('left', 'asc')];

        constrains.push(
            // parent.left <= child.left < parent.right
            startAt(parent.left),
            endBefore(parent.right)
        );

        if (!includeDescendants) {
            // 子世代のみ
            constrains.push(where('gen', '==', parent.gen + 1));
        }

        const q = query(this.colRef, ...constrains);

        try {
            const snapshot = await getDocs(q);
            return snapshot.docs.map((d) => d.data());
        } catch (e) {
            console.error(e);
            return Promise.reject(e);
        }
    }
}
