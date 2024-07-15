import {
    ITopicQueryService,
    TopicsCallback,
} from '@/infrastructure/topic/iTopicQueryService';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';
import { topicConverter } from '@/infrastructure/topic/topicConverter';

export class TopicQueryService implements ITopicQueryService {
    subscribeTopics(callback: TopicsCallback): void {
        const ref = collection(db, 'topics').withConverter(topicConverter);

        onSnapshot(ref, (snapshot) => {
            // const topics = snapshot
            //     .docChanges()
            //     .map((change) => change.doc.data());
            const topics = snapshot.docs.map((d) => d.data());
            callback(topics);
        });
    }
}
