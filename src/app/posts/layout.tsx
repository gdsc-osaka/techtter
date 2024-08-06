import { ReactNode } from 'react';
import TopicSideMenu from '@/app/posts/_components/topicSideMenu';
import PostForm from '@/app/posts/_components/postForm';
import Header from '@/app/posts/_components/header';
import NewTopicModal from '@/app/posts/_components/newTopicModal';
import { getHost } from '@/lib/urlUtils';
import { Topic } from '@/domain/topic';
import TopicDrawer from '@/app/posts/_components/topicDrawer';

export default async function Layout({ children }: { children: ReactNode }) {
    const host = getHost();
    if (host === null) return Promise.reject();

    const topics: Topic[] = await fetch(`${host}/api/topics`, {
        // next: { revalidate: 3600 },
    })
        .then((res) => res.json())
        .then((json) => json.topics);

    return (
        <div className={'h-screen flex flex-row items-stretch'}>
            <TopicSideMenu topics={topics} />
            <TopicDrawer />
            <NewTopicModal />
            <div className={'w-full flex flex-col overflow-hidden'}>
                <Header />
                <main
                    className={
                        'h-full px-4 w-full relative flex flex-col flex-auto'
                    }
                >
                    <div className={'relative h-full'}>{children}</div>
                    <div className={'shrink-0 pb-4'}>
                        <PostForm />
                    </div>
                </main>
            </div>
        </div>
    );
}
