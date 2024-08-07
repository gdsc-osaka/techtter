import { Props } from '@/app/posts/[...topicId]/page';
import { Topic } from "@/domain/topic";
import { Metadata } from 'next';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    return <>{children}</>;
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const topicId = params.topicId[params.topicId.length - 1];
    // const topicRepository = new AdminTopicRepository();
    const topic = await findTopic(topicId);
    if (topic === undefined) return { title: 'Topic not found.' };

    return {
        title: topic.name,
    };
}
