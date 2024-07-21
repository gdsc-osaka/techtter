import {ReactNode} from 'react';
import TopicSideMenu from '@/app/posts/_components/topicSideMenu';
import PostForm from '@/app/posts/_components/postForm';
import Header from '@/app/posts/_components/header';
import NewTopicModal from '@/app/posts/_components/newTopicModal';


export default async function Layout({ children }: { children: ReactNode }) {
    return (
        <div className={'h-screen flex flex-row items-stretch'}>
            <TopicSideMenu />
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
