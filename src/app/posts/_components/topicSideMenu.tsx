'use client';
import TopicItem from '@/app/posts/_components/topicItem';
import {
    generateTopicLink,
    generateTopicTree,
    TopicTreeNode,
} from '@/lib/topicTreeUtils';
import { useAtom } from 'jotai';
import { topicsAtom } from '@/atoms/topicAtom';
import { useEffect, useMemo } from 'react';

export default function TopicSideMenu() {
    const [topics, subscribe] = useAtom(topicsAtom);
    const root = useMemo(() => generateTopicTree(topics), [topics]);

    useEffect(() => {
        subscribe();
    }, []);

    return (
        <aside className={'h-full min-w-56 bg-stone-100 px-2 flex flex-col'}>
            <div
                className={
                    'flex items-center px-2 h-12 border-b border-stone-300'
                }
            >
                Topics
            </div>
            {generateTopicItem(root)}
        </aside>
    );
}

function generateTopicItem(node: TopicTreeNode) {
    if (node.children.length === 0) return;

    return (
        <>
            {node.children.map((child) => (
                <TopicItem
                    key={child.topic.id}
                    id={child.topic.id}
                    label={child.topic.name}
                    href={`/posts/${generateTopicLink(child)}`}
                >
                    {generateTopicItem(child)}
                </TopicItem>
            ))}
        </>
    );
}
