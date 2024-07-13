import { ReactNode } from 'react';
import TopicSideMenu from '@/components/topicSideMenu';
import { Topic } from '@/domain/topic';
import { Timestamp } from 'firebase/firestore';
import PostForm from '@/components/postForm';
import Header from '@/components/header';

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
        <div className={'h-screen flex flex-row items-stretch'}>
            <TopicSideMenu topics={topics} />
            <div className={'w-full flex flex-col overflow-hidden'}>
                <Header />
                <main
                    className={
                        'h-full px-4 w-full relative flex flex-col flex-auto'
                    }
                >
                    <div className={'relative h-full'}>
                        <div
                            className={
                                'absolute inset-0 bottom-0 overflow-y-scroll scroll'
                            }
                        >
                            {children}
                        </div>
                    </div>
                    <div className={'shrink-0 pb-4'}>
                        <PostForm />
                    </div>
                </main>
            </div>
        </div>
    );
}
