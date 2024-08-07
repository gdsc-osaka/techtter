import { AuthService } from '@/application/auth/authService';
import { RoleService } from '@/application/role/roleService';
import { Policy } from '@/domain/policy';
import { AuthRepository } from '@/infrastructure/auth/authRepository';
import { AdminPostRepository } from '@/infrastructure/post/adminPostRepository';
import { AdminRoleRepository } from '@/infrastructure/role/adminRoleRepository';
import { NextRequest, NextResponse } from 'next/server';

const postRepository = new AdminPostRepository();
const authRepository = new AuthRepository();
const authService = new AuthService(
    authRepository,
    new RoleService(new AdminRoleRepository())
);

export async function DELETE(
    req: NextRequest,
    { params }: { params: { postId: string } }
) {
    const idToken = req.cookies.get('idToken')?.value;
    if (idToken === undefined) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = await authRepository.verifyIdToken(idToken);
    const user = await authRepository.getUser(decoded.uid);
    const post = await postRepository.find(user.uid, params.postId);

    if (post === undefined) {
        return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
    }

    const authorized = await authService.authorize(
        post.user_id === user.uid
            ? Policy.POST_DELETE_SELF
            : Policy.POST_DELETE,
        user
    );

    if (!authorized.accepted) {
        return NextResponse.json(
            { error: 'Permission denied.' },
            { status: 403 }
        );
    }

    await postRepository.delete(user.uid, params.postId);

    return NextResponse.json({}, { status: 200 });
}
