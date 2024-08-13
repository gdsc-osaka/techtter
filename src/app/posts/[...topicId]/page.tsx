import PostList from '@/app/posts/[...topicId]/_components/postList';
import fetchTopic from '@/fetcbers/fetchTopic';

export interface Props {
    params: {
        topicId: string[];
    };
}

export default async function PostListPage({ params }: Props) {
    const topicId = params.topicId[params.topicId.length - 1];
    const topic = await fetchTopic(topicId);
    if (topic === undefined) return <p>Topic not found.</p>;

    return (
        <PostList
            topicId={topicId}
            topicRight={topic.right}
            topicLeft={topic.left}
        />
    );
}
