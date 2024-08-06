'use server';

import {PostService} from '@/application/post/postService';
import {AdminPostRepository} from '@/infrastructure/post/adminPostRepository';
import {parseWithZod} from '@conform-to/zod';
import {postFormSchema, topicFormSchema} from '@/app/posts/schema';
import {logger} from '@/logger';
import {TopicService} from '@/application/topic/topicService';
import {TopicDomainService} from '@/domain/topic/topicDomainService';
import {TopicQueryService} from '@/infrastructure/topic/topicQueryService';
import {AdminTopicRepository} from '@/infrastructure/topic/adminTopicRepository';
import {AdminRoleRepository} from '@/infrastructure/role/adminRoleRepository';
import {cookies} from 'next/headers';
import {AuthRepository} from '@/infrastructure/auth/authRepository';
import {AuthService} from '@/application/auth/authService';
import {RoleService} from '@/application/role/roleService';
import {Policy} from '@/domain/policy';

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

    const idToken = cookies().get('idToken');

    if (idToken === undefined) {
        return Promise.reject('Permission denied.');
    }

    const authorized = await authService.authorize(
        idToken.value,
        Policy.POST_CREATE
    );
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

    const idToken = cookies().get('idToken');

    if (idToken === undefined) {
        return Promise.reject('Permission denied.');
    }

    const authorized = await authService.authorize(
        idToken.value,
        Policy.TOPIC_CREATE
    );

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
