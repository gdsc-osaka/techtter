import {
    IPostQueryService,
    Unsubscribe,
} from '@/infrastructure/post/iPostQueryService';
import { Topic } from '@/domain/topic';
import { Post } from '@/domain/post';
import {
    collectionGroup,
    limit,
    onSnapshot,
    orderBy,
    query,
    QueryConstraint,
    startAfter,
    where,
} from 'firebase/firestore';
import { db } from '@/firebase';
import { postConverter } from '@/infrastructure/post/postConverter';

export class PostQueryService implements IPostQueryService {
    private readonly colGroupRef = collectionGroup(db, `posts`).withConverter(
        postConverter
    );

    findManyByTopicCallback(
        callback: (posts: Post[]) => void,
        topic?: Pick<Topic, 'left' | 'right'>,
        lim: number = 10,
        start?: Post
    ): Unsubscribe {
        const constraints: QueryConstraint[] = [
            limit(lim),
            orderBy('created_at', 'desc'),
        ];
        if (topic !== undefined) {
            constraints.push(
                where('topic_center', '>=', topic.left),
                where('topic_center', '<', topic.right)
            );
        }
        if (start !== undefined) {
            constraints.push(startAfter('created_at', start.created_at));
        }

        const q = query(this.colGroupRef, ...constraints);
        return onSnapshot(q, (snapshot) => {
            const posts = snapshot.docs.map((doc) => doc.data());
            callback(posts);
        });
    }
}
