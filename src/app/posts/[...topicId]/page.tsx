import PostList from '@/app/posts/[...topicId]/_components/postList';
import { AdminTopicRepository } from '@/infrastructure/topic/adminTopicRepository';

export interface Props {
    params: {
        topicId: string[];
    };
}

const topicRepository = new AdminTopicRepository();

export default async function PostListPage({ params }: Props) {
    const topicId = params.topicId.pop();
    const topic =
        topicId === undefined ? undefined : await topicRepository.find(topicId);
    if (topic === undefined) return <p>Topic not found.</p>;

    return (
        <PostList
            topicId={topic.id}
            topicRight={topic.right}
            topicLeft={topic.left}
        />
    );
}
