import { Timestamp } from 'firebase/firestore';
import { ForCreate } from '@/domain/_utils';
import { Topic } from '@/domain/topic';

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
