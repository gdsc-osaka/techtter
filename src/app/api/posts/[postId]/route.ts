import { AuthService } from '@/application/auth/authService';
import { PostService } from '@/application/post/postService';
import { RoleService } from '@/application/role/roleService';
import { AuthRepository } from '@/infrastructure/auth/authRepository';
import { AdminPostRepository } from '@/infrastructure/post/adminPostRepository';
import { AdminRoleRepository } from '@/infrastructure/role/adminRoleRepository';
import { AdminStorageRepository } from '@/infrastructure/storage/adminStorageRepository';
import { AdminTopicRepository } from '@/infrastructure/topic/adminTopicRepository';
import { NextRequest, NextResponse } from 'next/server';

const postService = new PostService(
    new AdminPostRepository(),
    new AdminTopicRepository(),
    new AdminStorageRepository(),
    new AuthService(
        new AuthRepository(),
        new RoleService(new AdminRoleRepository())
    )
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
