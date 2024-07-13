import { IPostQueryService } from '@/infrastructure/post/iPostQueryService';
import { Topic } from '@/domain/topic';
import { Post } from '@/domain/post';
import {
    collectionGroup,
    getDocs,
    limit,
    orderBy,
    query,
    QueryConstraint,
    startAfter,
    Timestamp,
    where,
} from 'firebase/firestore';
import { db } from '@/firebase';
import { postConverter } from '@/infrastructure/post/postConverter';
import { logger } from '@/logger';

export class PostQueryService implements IPostQueryService {
    private readonly colGroupRef = collectionGroup(db, `posts`).withConverter(
        postConverter
    );

    async findManyByTopic(
        topic: Topic,
        lim: number = 10,
        start?: Post
    ): Promise<Post[]> {
        try {
            return [
                {
                    id: 'dummy',
                    topic_id: 'react',
                    topic_center: 25,
                    tags: [],
                    content: 'This is a dummy post',
                    created_at: Timestamp.now(),
                    updated_at: Timestamp.now(),
                },
                {
                    id: 'dummy2',
                    topic_id: 'react',
                    topic_center: 25,
                    tags: [],
                    content: 'This is a dummy post 2\nabc\ndef',
                    created_at: Timestamp.now(),
                    updated_at: Timestamp.now(),
                },
                {
                    id: 'dummy3',
                    topic_id: 'react',
                    topic_center: 25,
                    tags: [],
                    content:
                        'This is a dummy post 3\nabc\ndef\nghi\njkl\nmno\npqr\nstu\nvwx\nyz',
                    created_at: Timestamp.now(),
                    updated_at: Timestamp.now(),
                },
                // {
                //     id: "dummy",
                //     topic_id: "react",
                //     topic_center: 25,
                //     tags: [],
                //     content: "This is a dummy post",
                //     created_at: Timestamp.now(),
                //     updated_at: Timestamp.now(),
                // },
                // {
                //     id: "dummy",
                //     topic_id: "react",
                //     topic_center: 25,
                //     tags: [],
                //     content: "This is a dummy post",
                //     created_at: Timestamp.now(),
                //     updated_at: Timestamp.now(),
                // },
                // {
                //     id: "dummy",
                //     topic_id: "react",
                //     topic_center: 25,
                //     tags: [],
                //     content: "This is a dummy post",
                //     created_at: Timestamp.now(),
                //     updated_at: Timestamp.now(),
                // },
            ];

            const constraints: QueryConstraint[] = [
                where('topic_center', '<', topic.left),
                where('topic_center', '>', topic.right),
                limit(lim),
                orderBy('created_at', 'desc'),
            ];
            if (start)
                constraints.push(startAfter('created_at', start.created_at));
            const q = query(this.colGroupRef, ...constraints);
            const posts = await getDocs(q);

            return posts.docs.map((doc) => doc.data());
        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }
    }
}
