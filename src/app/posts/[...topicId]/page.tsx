import PostList from '@/app/posts/[...topicId]/_components/postList';
import {sfetch} from '@/lib/fetchUtils';

export interface Props {
    params: {
        topicId: string[];
    };
}

export default async function PostListPage({ params }: Props) {
    const topicId = params.topicId.at(params.topicId.length - 1);
    if (topicId === undefined) return <p>Topic id not found.</p>;

    const res = await sfetch(`/api/topics/${topicId}`, {
        method: 'GET',
    });

    if (res.status >= 300) {
        return <p>Topic not found.</p>;
    }

    const topic = (await res.json()).topic;

    return (
        <PostList
            topicId={topic.id}
            topicRight={topic.right}
            topicLeft={topic.left}
        />
    );
}
