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
    where,
} from 'firebase/firestore';
import { db } from '@/firebase';
import { postConverter } from '@/infrastructure/post/postConverter';
import { Unsubscribe } from '@/infrastructure/utils';

export class PostQueryService implements IPostQueryService {
    private readonly colGroupRef = collectionGroup(db, `posts`).withConverter(
        postConverter
    );

    findManyByTopicCallback(
        callback: (posts: Post[]) => void,
        topic: Pick<Topic, 'left' | 'right'>,
        lim: number = 10,
        end?: Post
    ): Unsubscribe {
        const constraints: QueryConstraint[] = [
            limit(lim),
            orderBy('created_at', 'desc'),
        ];
        constraints.push(
            where('topic_center', '>=', topic.left),
            where('topic_center', '<', topic.right)
        );
        if (end !== undefined) {
            console.log(`end:`)
            console.log(end)
            constraints.push(endBefore(end.created_at));
        }

        const q = query(this.colGroupRef, ...constraints);
        return onSnapshot(q, (snapshot) => {
            const posts = snapshot.docs.map((doc) => doc.data());
            console.log(`Fetched ${posts.length}`);
            callback(posts);
        });
    }
}
