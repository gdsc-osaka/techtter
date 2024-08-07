import { Props } from '@/app/posts/[...topicId]/page';
import { AdminTopicRepository } from '@/infrastructure/topic/adminTopicRepository';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const topicId = params.topicId.pop();
    const topicRepository = new AdminTopicRepository();
    const topic =
        topicId === undefined ? undefined : await topicRepository.find(topicId);
    if (topic === undefined) return { title: 'Topic not found.' };

    return {
        title: topic.name,
    };
}

export default function Layout({ children }: { children: ReactNode }) {
    return children;
}
