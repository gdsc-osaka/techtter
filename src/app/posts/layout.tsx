import { ReactNode } from 'react';
import TopicSideMenu from '@/components/topicSideMenu';
import { Topic } from '@/domain/topic';
import { Timestamp } from 'firebase/firestore';
import PostForm from "@/components/postForm";

function topicFactory(
    topic: Pick<Topic, 'id' | 'name' | 'left' | 'right'>
): Topic {
    return {
        ...topic,
        icon_path: undefined,
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
    };
}

export default function Layout({ children }: { children: ReactNode }) {
    const topics: Topic[] = [
        topicFactory({
            id: 'front-end',
            name: 'Front End',
            left: 0,
            right: 100,
        }),
        topicFactory({
            id: 'react',
            name: 'React',
            left: 0,
            right: 50,
        }),
        topicFactory({
            id: 'remix',
            name: 'Remix',
            left: 0,
            right: 10,
        }),
        topicFactory({
            id: 'next',
            name: 'Next.js',
            left: 50,
            right: 100,
        }),
        topicFactory({
            id: 'back-end',
            name: 'Back End',
            left: 100,
            right: 200,
        }),
        topicFactory({
            id: 'database',
            name: 'Database',
            left: 100,
            right: 150,
        }),
    ];

    return (
        <main className={'flex flex-row'}>
            <TopicSideMenu topics={topics} />
            <div className={'flex flex-col px-4 py-6 w-full'}>
                <div className={"h-full"}>
                    {children}
                </div>
                <PostForm />
            </div>
        </main>
    );
}
