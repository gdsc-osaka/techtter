import { AuthService } from '@/application/auth/authService';
import { PostService } from '@/application/post/postService';
import { RoleService } from '@/application/role/roleService';
import { assertsPost } from '@/domain/post';
import { AuthRepository } from '@/infrastructure/auth/authRepository';
import { DiscordRepository } from '@/infrastructure/discord/discordRepository';
import { AdminPostRepository } from '@/infrastructure/post/adminPostRepository';
import { AdminRoleRepository } from '@/infrastructure/role/adminRoleRepository';
import { AdminStorageRepository } from '@/infrastructure/storage/adminStorageRepository';
import { AdminTopicRepository } from '@/infrastructure/topic/adminTopicRepository';
import { replacePlainObjWithTimestamp } from '@/lib/timestampUtils';
import { NextRequest, NextResponse } from 'next/server';

const postService = new PostService(
    new AdminPostRepository(),
    new AdminTopicRepository(),
    new AdminStorageRepository(),
    new AuthService(
        new AuthRepository(),
        new RoleService(new AdminRoleRepository())
    ),
    new DiscordRepository()
);

export async function DELETE(
    req: NextRequest,
    { params }: { params: { postId: string } }
) {
    try {
        await postService.deletePost(params.postId);
        return NextResponse.json({}, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { postId: string } }
) {
    try {
        const post = await req
            .json()
            .then((d) => replacePlainObjWithTimestamp(d));
        assertsPost(post);
        if (post.id !== params.postId) {
            return NextResponse.json(
                { error: 'Invalid post id' },
                { status: 400 }
            );
        }
        const newPost = await postService.updatePost(post);
        return NextResponse.json({ post: newPost }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });
    }
}
