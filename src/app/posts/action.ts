'use server';

import { PostService } from '@/application/post/postService';
import { AdminPostRepository } from '@/infrastructure/post/adminPostRepository';
import { TopicRepository } from '@/infrastructure/topic/topicRepository';
import { Admin } from '@/firebaseAdmin';
import { parseWithZod } from '@conform-to/zod';
import { postFormSchema } from '@/app/posts/schema';
import { logger } from '@/logger';

const postService = new PostService(
    new AdminPostRepository(),
    new TopicRepository()
);

export async function createPostAction(formData: FormData) {
    const submission = parseWithZod(formData, {
        schema: postFormSchema,
    });


    if (submission.status !== 'success') {
        return submission.reply();
    }

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
