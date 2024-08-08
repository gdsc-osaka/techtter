'use client';
import TopicSideMenu from '@/app/posts/_components/topicSideMenu';
import { topicsAtom } from '@/atoms/topicAtom';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

export default function ClientTopicSideMenu() {
    const [topics, subscribe] = useAtom(topicsAtom);

    useEffect(() => {
        const unsub = subscribe();
        return () => {
            unsub();
        };
    }, []);

    return <TopicSideMenu topics={topics} />;
}
