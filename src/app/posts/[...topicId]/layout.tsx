import { Metadata } from 'next';
import { Props } from '@/app/posts/[...topicId]/page';
import { ReactNode } from 'react';
import { sfetch } from '@/lib/fetchUtils';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const topicId = params.topicId.at(params.topicId.length - 1);
    const res = await sfetch(`/api/topics/${topicId}`, {
        method: 'GET',
    });

    if (res.status >= 300) {
        return {
            title: 'Topic not found.',
        };
    }

    const topic = (await res.json()).topic;

    return {
        title: topic.name,
    };
}

export default function Layout({ children }: { children: ReactNode }) {
    return children;
}
