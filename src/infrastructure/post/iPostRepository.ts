import { Post } from '@/domain/post';
import { ForCreate } from '@/domain/_utils';

export interface IPostRepository {
    create(post: ForCreate<Post>): Promise<Post>;
    // update(post: ForUpdate<Post>): Promise<Post>;
    delete(userId: string, id: string): Promise<void>;
    find(userId: string, postId: string): Promise<Post | undefined>;
}
