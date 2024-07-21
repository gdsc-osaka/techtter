import { IPostQueryService } from '@/infrastructure/post/iPostQueryService';
import { Topic } from '@/domain/topic';
import { Post } from '@/domain/post';
import {
    collectionGroup,
    endBefore,
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
import { Unsubscribe } from '@/infrastructure/utils';

export class PostQueryService implements IPostQueryService {
    private readonly colGroupRef = collectionGroup(db, `posts`).withConverter(
        postConverter
    );

    private createQuery(
        topic: Pick<Topic, 'left' | 'right'>,
        lim: number,
        after?: Post,
        before?: Post
    ) {
        const constraints: QueryConstraint[] = [
            limit(lim),
            orderBy('created_at', 'desc'),
        ];
        constraints.push(
            where('topic_center', '>=', topic.left),
            where('topic_center', '<', topic.right)
        );
        if (after !== undefined) {
            constraints.push(endBefore(after.created_at));
        }
        if (before !== undefined) {
            constraints.push(startAfter(before.created_at));
        }

        return query(this.colGroupRef, ...constraints);
    }

    findManyByTopicCallback(
        callback: (posts: Post[]) => void,
        topic: Pick<Topic, 'left' | 'right'>,
        lim: number = 10,
        after?: Post
    ): Unsubscribe {
        const q = this.createQuery(topic, lim, after);
        return onSnapshot(q, (snapshot) => {
            const posts = snapshot.docs.map((doc) => doc.data());
            callback(posts);
        });
    }

    findManyByTopic(
        topic: Pick<Topic, 'left' | 'right'>,
        limit: number = 10,
        before?: Post
    ): Promise<Post[]> {
        const q = this.createQuery(topic, limit, undefined, before);
        return new Promise((resolve) => {
            onSnapshot(q, (snapshot) => {
                const posts = snapshot.docs.map((doc) => doc.data());
                resolve(posts);
            });
        });
    }
}
