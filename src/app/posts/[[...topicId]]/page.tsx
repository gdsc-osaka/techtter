import { PostQueryService } from '@/infrastructure/post/postQueryService';
import { Timestamp } from 'firebase/firestore';
import PostItem from '@/components/postItem';

const postQueryService = new PostQueryService();

interface Props {
    params: {
        topicId: string[];
    };
}

export default async function PostListPage(_: Props) {
    const posts = await postQueryService.findManyByTopic({
        id: 'react',
        name: 'React',
        left: 0,
        right: 50,
        icon_path: undefined,
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
    });

    return (
        <ol className={'h-full align-bottom'}>
            {posts.map((post) => (
                <PostItem post={post} key={post.id} />
            ))}
        </ol>
    );
}
