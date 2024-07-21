import { Post } from '@/domain/post';
import { ForCreate } from '@/domain/_utils';

export interface IPostRepository {
    create(post: ForCreate<Post>): Promise<Post>;
    // update(post: ForUpdate<Post>): Promise<Post>;
    // delete(id: string): Promise<Post>;
    find(userId: string, postId: string): Promise<Post | undefined>;
}
