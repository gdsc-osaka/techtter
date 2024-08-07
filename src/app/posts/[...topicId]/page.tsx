import PostList from '@/app/posts/[...topicId]/_components/postList';
import { Topic } from "@/domain/topic";
import { Timestamp } from "firebase/firestore";

export interface Props {
    params: {
        topicId: string[];
    };
}

async function findTopic(id: string): Promise<Topic | undefined> {
    return {
        gen: 0,
        icon_path: null,
        id: id,
        left: 0,
        name: 'Test',
        right: 0,
    } as Topic;
}

export default async function PostListPage({ params }: Props) {
    const topicId = params.topicId[params.topicId.length - 1];
    // const topicRepository = new AdminTopicRepository();
    const topic = await findTopic(topicId);
    if (topic === undefined) return <p>Topic not found.</p>;

    return (
        <PostList
            topicId={topicId}
            topicRight={topic.right}
            topicLeft={topic.left}
        />
    );
}
