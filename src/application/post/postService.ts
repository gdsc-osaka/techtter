import { AuthService } from '@/application/auth/authService';
import { Policy } from '@/domain/policy';
import { initPost, Post } from '@/domain/post';
import { IDiscordRepository } from "@/infrastructure/discord/iDiscordRepository";
import { IPostRepository } from '@/infrastructure/post/iPostRepository';
import { IStorageRepository } from '@/infrastructure/storage/iStorageRepository';
import { ITopicRepository } from '@/infrastructure/topic/ITopicRepository';
import { logger } from '@/logger';
import ShortUniqueId from 'short-unique-id';

export class PostService {
    constructor(
        private readonly postRepository: IPostRepository,
        private readonly topicRepository: ITopicRepository,
        private readonly storageRepository: IStorageRepository,
        private readonly authService: AuthService,
        private readonly discordRepository: IDiscordRepository,
    ) {}

    async createPost(
        post: Pick<Post, 'topic_id' | 'tags' | 'content'>,
        files: File | FileList
    ): Promise<Post> {
        try {
            const authorized = await this.authService.authorize(
                Policy.POST_CREATE
            );
            if (!authorized.accepted) {
                return Promise.reject('Permission denied.');
            }

            const topic = await this.topicRepository.find(post.topic_id);
            if (topic === undefined) {
                return Promise.reject('topic not found');
            }

            const id = new ShortUniqueId({ length: 10 }).randomUUID();
            const user_id = authorized.user.uid;
            const _files = (
                files instanceof File ? [files] : Array.from(files)
            ).filter((f) => f.size > 0);
            const filePaths = _files.map(
                (file) => `users/${user_id}/posts/${id}/files/${file.name}`
            );

            const promises: [Promise<Post>, ...Promise<void>[]] = [
                this.postRepository.create(
                    initPost(id, { ...post, user_id }, topic, filePaths)
                ),
                ..._files.map(async (file, index) => {
                    const data = await file.arrayBuffer();
                    const buffer = Buffer.from(data);
                    await this.storageRepository.upload(
                        filePaths[index],
                        buffer
                    );
                }),
            ];
            const [newPost] = await Promise.all(promises);

            logger.log(`Post created. (${id})`);

            for (const webhook of topic.webhooks) {
                this.discordRepository.send(webhook, {
                    content: newPost.content,
                    username: authorized.user.displayName,
                    avatar_url: authorized.user.photoURL,
                });
            }

            return newPost;
        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }
    }

    async deletePost(postId: string): Promise<void> {
        try {
            const user = await this.authService.getUser();
            const post = await this.postRepository.find(user.uid, postId);
            if (post === undefined) {
                return Promise.reject('Post not found');
            }

            const authorized = await this.authService.authorize(
                (user) =>
                    post.user_id === user.uid
                        ? Policy.POST_DELETE_SELF
                        : Policy.POST_DELETE,
                user
            );

            if (!authorized.accepted) {
                return Promise.reject('Permission denied.');
            }

            await Promise.all([
                ...post.files.map((file) =>
                    this.storageRepository.delete(file)
                ),
                this.postRepository.delete(user.uid, postId),
            ]);

            logger.log(`Post deleted. (${postId})`);
        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }
    }
}
