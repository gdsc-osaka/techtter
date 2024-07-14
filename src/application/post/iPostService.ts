import { Post } from '@/domain/post';

export interface IPostService {
    createPost(
        post: Pick<Post, 'user_id' | 'topic_id' | 'tags' | 'content'>
    ): Promise<Post>;
}
