import { Props } from '@/app/posts/[...topicId]/page';
import { AdminTopicRepository } from "@/infrastructure/topic/adminTopicRepository";
import { Metadata } from 'next';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>{children}</>
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const topicId = params.topicId[params.topicId.length - 1];
    const topicRepository = new AdminTopicRepository();
    const topic = await topicRepository.find(topicId);
    if (topic === undefined) return { title: 'Topic not found.' };

    return {
        title: topic.name,
    };
}
