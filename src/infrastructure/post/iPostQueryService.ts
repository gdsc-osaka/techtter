import { Post } from '@/domain/post';
import { Topic } from '@/domain/topic';
import { Unsubscribe } from '@/infrastructure/utils';

export interface IPostQueryService {
    findManyByTopicCallback(
        callback: (posts: Post[]) => void,
        topic: Pick<Topic, 'left' | 'right'>,
        limit?: number,
        endBefore?: Post
    ): Unsubscribe;
}
