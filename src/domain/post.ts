import {Timestamp} from 'firebase/firestore';
import {ForCreate} from '@/domain/_utils';
import {Topic} from '@/domain/topic';

export interface Post {
    id: string;
    user_id: string;
    topic_id: string;
    topic_center: number;
    tags: string[];
    content: string;
    created_at: Timestamp;
    updated_at: Timestamp;
}

export function initPost(
    post: Pick<Post, 'user_id' | 'topic_id' | 'tags' | 'content'>,
    topic: Topic
): ForCreate<Post> {
    return {
        user_id: post.user_id,
        topic_id: post.topic_id,
        topic_center: topic.left,
        tags: post.tags,
        content: post.content,
    };
}

export function assertsPost(data: object): asserts data is Post {
    if (
        !(
            'id' in data &&
            typeof data.id === 'string' &&
            'user_id' in data &&
            typeof data.user_id === 'string' &&
            'topic_id' in data &&
            typeof data.topic_id === 'string' &&
            'topic_center' in data &&
            typeof data.topic_center === 'number' &&
            'tags' in data &&
            data.tags instanceof Array &&
            'content' in data &&
            typeof data.content === 'string' &&
            'created_at' in data &&
            typeof data.created_at === 'object' &&
            data.created_at instanceof Timestamp &&
            'updated_at' in data &&
            typeof data.updated_at === 'object' &&
            data.updated_at instanceof Timestamp
        )
    ) {
        throw new Error('data is not a type of Post');
    }
}
