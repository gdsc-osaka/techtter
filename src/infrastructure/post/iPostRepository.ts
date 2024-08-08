import { ForCreateWithId, ForUpdate } from '@/domain/_utils';
import { Post } from '@/domain/post';

export interface IPostRepository {
    create(post: ForCreateWithId<Post>): Promise<Post>;
    update(userId: string, post: ForUpdate<Post>): Promise<Post>;
    delete(userId: string, id: string): Promise<void>;
    find(userId: string, postId: string): Promise<Post | undefined>;
}
