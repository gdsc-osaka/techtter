import { Post } from '@/domain/post';
import { Topic } from '@/domain/topic';
import { Unsubscribe } from '@/infrastructure/utils';

export interface IPostQueryService {
    /**
     * Topic に属する Post を取得する
     * @param callback
     * @param topic
     * @param limit
     * @param after 時系列昇順で after より後の Post を取得する
     */
    findManyByTopicCallback(
        callback: (posts: Post[]) => void,
        topic: Pick<Topic, 'left' | 'right'>,
        limit?: number,
        after?: Post
    ): Unsubscribe;

    findManyByTopic(
        topic: Pick<Topic, 'left' | 'right'>,
        limit?: number,
        before?: Post
    ): Promise<Post[]>;
}
