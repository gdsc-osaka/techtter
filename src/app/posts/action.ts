'use server';

import { PostService } from '@/application/post/postService';
import { AdminPostRepository } from '@/infrastructure/post/adminPostRepository';
import { Admin } from '@/firebaseAdmin';
import { parseWithZod } from '@conform-to/zod';
import { postFormSchema, topicFormSchema } from '@/app/posts/schema';
import { logger } from '@/logger';
import { TopicService } from '@/application/topic/topicService';
import { TopicDomainService } from '@/domain/topic/topicDomainService';
import { TopicQueryService } from '@/infrastructure/topic/topicQueryService';
import { AdminTopicRepository } from '@/infrastructure/topic/adminTopicRepository';

const topicRepository = new AdminTopicRepository();
const postService = new PostService(new AdminPostRepository(), topicRepository);
const topicService = new TopicService(
    topicRepository,
    new TopicDomainService(new TopicQueryService(), topicRepository)
);

export async function createPostAction(formData: FormData) {
    const submission = parseWithZod(formData, {
        schema: postFormSchema,
    });

    if (submission.status !== 'success') return submission.reply();

    const { content, topicId, idToken } = submission.value;
    const decoded = await Admin.auth.verifyIdToken(idToken);
    const user = await Admin.auth.getUser(decoded.uid);

    const post = await postService.createPost({
        user_id: user.uid,
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

    console.log(formData);
    console.log(submission.status);
    if (submission.status !== 'success') return submission.reply();

    const { parentId, id, name } = submission.value;
    return await topicService.addTopic(parentId ?? '', {
        id,
        name,
        icon_path: null,
    });
}
