'use client';
import TopicItem from '@/app/posts/_components/topicItem';
import {
    generateTopicLink,
    generateTopicTree,
    TopicTreeNode,
} from '@/lib/topicTreeUtils';
import {useAtom} from 'jotai';
import {topicsAtom} from '@/atoms/topicAtom';
import {useEffect, useMemo} from 'react';
import AddTopicButton from "@/app/posts/_components/addTopicButton";
import {useSetAtom} from "jotai";
import {newTopicModalAtom} from "@/app/posts/atoms";

export default function TopicSideMenu() {
    const [topics, subscribe] = useAtom(topicsAtom);
    const setOpenModal = useSetAtom(newTopicModalAtom);
    const root = useMemo(() => generateTopicTree(topics), [topics]);

    useEffect(() => {
        subscribe();
    }, []);

    const handleAddTopic = () => {
        setOpenModal({
            open: true,
            topicId: '',
        });
    }

    return (
        <aside className={'h-full min-w-56 bg-stone-100 px-2 flex flex-col'}>
            <div
                className={
                    'flex items-center justify-between px-2 w-full h-12 border-b border-stone-300'
                }
            >
                Topics
                <AddTopicButton onClick={handleAddTopic} size={20}/>
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
