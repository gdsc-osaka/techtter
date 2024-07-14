import { Post } from '@/domain/post';
import { Topic } from '@/domain/topic';

export type Unsubscribe = () => void;

export interface IPostQueryService {
    findManyByTopicCallback(
        callback: (posts: Post[]) => void,
        topic?: Pick<Topic, 'left' | 'right'>,
        limit?: number,
        startAfter?: Post
    ): Unsubscribe;
}
