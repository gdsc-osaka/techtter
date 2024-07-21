import { TopicRepository } from '@/infrastructure/topic/topicRepository';
import PostList from '@/app/posts/[...topicId]/_components/postList';
import {getHost} from "@/lib/urlUtils";

const topicRepository = new TopicRepository();

export interface Props {
    params: {
        topicId: string[];
    };
}

export default async function PostListPage({ params }: Props) {
    const topicId = params.topicId.at(params.topicId.length - 1);
    if (topicId === undefined) return <p>Topic id not found.</p>;

    const host = getHost();
    if (host === null) return Promise.reject();

    const res = await fetch(`${host}/api/topics/${topicId}`, {
        method: 'GET',
        // cache for one day
        next: {revalidate: 86400}
    });
    const topic = (await res.json()).topic;

    return (
        <PostList
            topicId={topic.id}
            topicRight={topic.right}
            topicLeft={topic.left}
        />
    );
}
