'use server';

import { postFormSchema, topicFormSchema } from '@/app/posts/schema';
import { AuthService } from '@/application/auth/authService';
import { PostService } from '@/application/post/postService';
import { RoleService } from '@/application/role/roleService';
import { TopicService } from '@/application/topic/topicService';
import { TopicDomainService } from '@/domain/topic/topicDomainService';
import { AuthRepository } from '@/infrastructure/auth/authRepository';
import { DiscordRepository } from '@/infrastructure/discord/discordRepository';
import { AdminPostRepository } from '@/infrastructure/post/adminPostRepository';
import { AdminRoleRepository } from '@/infrastructure/role/adminRoleRepository';
import { AdminStorageRepository } from '@/infrastructure/storage/adminStorageRepository';
import { AdminTopicRepository } from '@/infrastructure/topic/adminTopicRepository';
import { TopicQueryService } from '@/infrastructure/topic/topicQueryService';
import { logger } from '@/logger';
import { parseWithZod } from '@conform-to/zod';

const authService = new AuthService(
    new AuthRepository(),
    new RoleService(new AdminRoleRepository())
);

const topicRepository = new AdminTopicRepository();
const postService = new PostService(
    new AdminPostRepository(),
    topicRepository,
    new AdminStorageRepository(),
    authService,
    new DiscordRepository()
);
const topicService = new TopicService(
    topicRepository,
    new TopicDomainService(new TopicQueryService(), topicRepository),
    authService
);

export async function createPostAction(formData: FormData) {
    const submission = parseWithZod(formData, {
        schema: postFormSchema,
    });

    if (submission.status !== 'success')
        return Promise.reject(submission.reply().error);

    const { content, topicId, files } = submission.value;

    const post = await postService.createPost(
        {
            topic_id: topicId,
            content,
            tags: [],
        },
        files
    );

    logger.log(`Post created. (${post.id})`);
    return post;
}

export async function createTopicAction(formData: FormData) {
    const submission = parseWithZod(formData, {
        schema: topicFormSchema,
    });

    if (submission.status !== 'success') return submission.reply();

    const { parentId, id, name } = submission.value;
    return await topicService.addTopic(parentId ?? '', {
        id,
        name,
        icon_path: null,
    });
}
