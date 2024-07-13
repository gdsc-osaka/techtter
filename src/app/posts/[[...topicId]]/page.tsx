import { PostQueryService } from '@/infrastructure/post/postQueryService';
import PostItem from '@/components/postItem';
import { TopicRepository } from '@/infrastructure/topic/topicRepository';

const postQueryService = new PostQueryService();
const topicRepository = new TopicRepository();

interface Props {
    params: {
        topicId: string[];
    };
}

export default async function PostListPage({ params }: Props) {
    const topicId = params.topicId.at(params.topicId.length - 1);
    const topic =
        topicId !== undefined ? await topicRepository.find(topicId) : undefined;
    const posts = await postQueryService.findManyByTopic(topic);

    return (
        <ol className={'h-full align-bottom'}>
            {posts.map((post) => (
                <PostItem post={post} key={post.id} />
            ))}
        </ol>
    );
}
