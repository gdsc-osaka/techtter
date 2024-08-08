'use client';
import { generateTopicItem, } from '@/app/posts/_components/topicSideMenu';
import { topicsAtom } from '@/atoms/topicAtom';
import { generateTopicTree } from '@/lib/topicTreeUtils';
import { useAtom } from 'jotai';
import { useEffect, useMemo } from 'react';

export default function MobileTopicSideMenu() {
    const [topics, subscribe] = useAtom(topicsAtom);

    useEffect(() => {
        const unsub = subscribe();
        return () => {
            unsub();
        };
    }, []);

    const root = useMemo(() => generateTopicTree(topics), [topics]);

    return (
        <div className={'w-full h-full overflow-y-scroll'}>
            {generateTopicItem(root)}
        </div>
    );
}
