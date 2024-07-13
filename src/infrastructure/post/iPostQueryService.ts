import { Post } from '@/domain/post';
import { Topic } from '@/domain/topic';

export interface IPostQueryService {
    findManyByTopic(
        topic?: Topic,
        limit?: number,
        startAfter?: Post
    ): Promise<Post[]>;
}
