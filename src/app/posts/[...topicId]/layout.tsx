import { Metadata, ResolvingMetadata } from 'next';
import { Props } from '@/app/posts/[...topicId]/page';
import { TopicRepository } from '@/infrastructure/topic/topicRepository';
import { ReactNode } from 'react';

const topicRepository = new TopicRepository();

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const topicId = params.topicId.at(params.topicId.length - 1);
    const topic =
        topicId === undefined ? undefined : await topicRepository.find(topicId);

    if (topic === undefined) {
        return {
            title: 'Topic not found.',
        };
    }

    return {
        title: topic.name,
    };
}

export default function Layout({ children }: { children: ReactNode }) {
    return children;
}
