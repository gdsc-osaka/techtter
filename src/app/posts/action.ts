'use server';

import { postFormSchema, topicFormSchema } from '@/app/posts/schema';
import { AuthService } from '@/application/auth/authService';
import { PostService } from '@/application/post/postService';
import { RoleService } from '@/application/role/roleService';
import { TopicService } from '@/application/topic/topicService';
import { Policy } from '@/domain/policy';
import { TopicDomainService } from '@/domain/topic/topicDomainService';
import { AuthRepository } from '@/infrastructure/auth/authRepository';
import { AdminPostRepository } from '@/infrastructure/post/adminPostRepository';
import { AdminRoleRepository } from '@/infrastructure/role/adminRoleRepository';
import { AdminTopicRepository } from '@/infrastructure/topic/adminTopicRepository';
import { TopicQueryService } from '@/infrastructure/topic/topicQueryService';
import { logger } from '@/logger';
import { parseWithZod } from '@conform-to/zod';

const topicRepository = new AdminTopicRepository();
const postService = new PostService(new AdminPostRepository(), topicRepository);
const topicService = new TopicService(
    topicRepository,
    new TopicDomainService(new TopicQueryService(), topicRepository)
);
const authService = new AuthService(
    new AuthRepository(),
    new RoleService(new AdminRoleRepository())
);

export async function createPostAction(formData: FormData) {
    const submission = parseWithZod(formData, {
        schema: postFormSchema,
    });

    if (submission.status !== 'success') return submission.reply();

    const { content, topicId } = submission.value;

    const authorized = await authService.authorize(Policy.POST_CREATE);
    if (!authorized.accepted) {
        return Promise.reject('Permission denied.');
    }

    const post = await postService.createPost({
        user_id: authorized.user.uid,
        topic_id: topicId,
        content,
        tags: [],
    });

    logger.log(`Post created. (${post.id})`);
    return post;
}

export async function createTopicAction(formData: FormData) {
    const submission = parseWithZod(formData, {
        schema: topicFormSchema,
    });

    if (submission.status !== 'success') return submission.reply();

    const authorized = await authService.authorize(Policy.TOPIC_CREATE);

    if (!authorized.accepted) {
        return Promise.reject('Permission denied.');
    }

    const { parentId, id, name } = submission.value;
    return await topicService.addTopic(parentId ?? '', {
        id,
        name,
        icon_path: null,
    });
}
