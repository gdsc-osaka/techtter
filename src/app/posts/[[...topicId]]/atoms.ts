import { atom } from 'jotai';
import { Post } from '@/domain/post';
import { PostQueryService } from '@/infrastructure/post/postQueryService';
import { atomFamily } from 'jotai/utils';
import { Topic } from '@/domain/topic';

/**
 * Topic ID を引数に取る Family
 */
export const postsFamily = atomFamily((topicId: string) => atom<Post[]>([]));

const postQueryService = new PostQueryService();
export const subscribePostsFamily = atomFamily((topicId: string) =>
    atom(null, (get, set, topic: Pick<Topic, 'left' | 'right'>) => {
        postQueryService.findManyByTopicCallback((posts) => {
            set(postsFamily(topicId), posts);
        }, topic);
    })
);
