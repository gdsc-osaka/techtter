import Header from '@/app/posts/_components/header';
import NewTopicDialog from '@/app/posts/_components/newTopicDialog';
import PostForm from '@/app/posts/_components/postForm';
import TopicDrawer from '@/app/posts/_components/topicDrawer';
import TopicSideMenu from '@/app/posts/_components/topicSideMenu';
import { Topic } from '@/domain/topic';
import { findManyTopics } from "@/infrastructure/topic/adminTopicRepository";
import { ReactNode } from 'react';

export default async function Layout({ children }: { children: ReactNode }) {
    // const topicRepository = new AdminTopicRepository();
    const topics: Topic[] = await findManyTopics();

    return (
        <div className={'h-screen flex flex-row items-stretch'}>
            <TopicSideMenu topics={topics} />
            <TopicDrawer />
            <NewTopicDialog />
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
