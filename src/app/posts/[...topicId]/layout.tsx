import { Props } from '@/app/posts/[...topicId]/page';
import fetchTopic from '@/fetcbers/fetchTopic';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    return <>{children}</>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const topicId = params.topicId[params.topicId.length - 1];
    const topic = await fetchTopic(topicId);

    if (topic === undefined) return { title: 'Topic not found.' };

    return {
        title: topic.name,
    };
}
