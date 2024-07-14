import { TopicRepository } from '@/infrastructure/topic/topicRepository';
import PostList from '@/app/posts/[[...topicId]]/_components/postList';

const topicRepository = new TopicRepository();

interface Props {
    params: {
        topicId: string[];
    };
}

export default async function PostListPage({ params }: Props) {
    const topicId = params.topicId.at(params.topicId.length - 1);

    if (topicId === undefined) {
        return <p>Topic id not found.</p>;
    }

    const topic = await topicRepository.find(topicId);

    if (topic === undefined) {
        return <p>Topic not found.</p>;
    }

    return (
        <PostList
            topicId={topic.id}
            topicRight={topic.right}
            topicLeft={topic.left}
        />
    );
}
