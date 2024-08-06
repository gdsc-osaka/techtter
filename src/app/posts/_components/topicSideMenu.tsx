import TopicItem from '@/app/posts/_components/topicItem';
import {generateTopicLink, generateTopicTree, TopicTreeNode,} from '@/lib/topicTreeUtils';
import RootAddTopicButton from '@/app/posts/_components/rootAddTopicButton';
import {Topic} from '@/domain/topic';

interface Props {
    topics: Topic[];
}

export default async function TopicSideMenu({topics}: Props) {
    const root = generateTopicTree(topics);

    return (
        <aside className={'hidden md:block h-full min-w-56 bg-stone-100 px-2'}>
            <div
                className={
                    'flex items-center justify-between px-2 w-full h-12 border-b border-stone-300'
                }
            >
                Topics
                <RootAddTopicButton />
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
