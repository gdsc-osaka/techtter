import { IPostService } from '@/application/post/iPostService';
import { initPost, Post } from '@/domain/post';
import { IPostRepository } from '@/infrastructure/post/iPostRepository';
import { ITopicRepository } from '@/infrastructure/topic/ITopicRepository';
import { logger } from '@/logger';

export class PostService implements IPostService {
    constructor(
        private readonly postRepository: IPostRepository,
        private readonly topicRepository: ITopicRepository
    ) {}

    async createPost(
        post: Pick<Post, 'user_id' | 'topic_id' | 'tags' | 'content'>
    ): Promise<Post> {
        try {
            const topic = await this.topicRepository.find(post.topic_id);
            if (topic === undefined) {
                return Promise.reject('topic not found');
            }
            const newPost = await this.postRepository.create(
                initPost(post, topic)
            );
            logger.log(`Post created. (${newPost.id})`);

            return newPost;
        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }
    }
}
