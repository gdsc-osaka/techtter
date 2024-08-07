import { Props } from '@/app/posts/[...topicId]/page';
import { Topic } from "@/domain/topic";
import { Timestamp } from "firebase/firestore";
import { Metadata } from 'next';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    return <>{children}</>;
}

async function findTopic(id: string): Promise<Topic | undefined> {
    return {
        created_at: Timestamp.now(),
        gen: 0,
        icon_path: null,
        id: id,
        left: 0,
        name: 'Test',
        right: 0,
        updated_at: Timestamp.now(),
    };
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
