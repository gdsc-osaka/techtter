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
        topic?: Topic,
        lim: number = 10,
        start?: Post
    ): Promise<Post[]> {
        try {
            const constraints: QueryConstraint[] = [
                limit(lim),
                orderBy('created_at', 'desc'),
            ];
            if (topic !== undefined) {
                constraints.push(
                    where('topic_center', '<', topic.left),
                    where('topic_center', '>', topic.right)
                );
            }
            if (start !== undefined) {
                constraints.push(startAfter('created_at', start.created_at));
            }
            const q = query(this.colGroupRef, ...constraints);
            const posts = await getDocs(q);

            return posts.docs.map((doc) => doc.data());
        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }
    }
}
