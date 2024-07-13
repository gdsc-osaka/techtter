import TopicItem from '@/components/topicItem';
import {
    generateTopicLink,
    generateTopicTree,
    TopicTreeNode,
} from '@/lib/topicTreeUtils';
import { Topic } from '@/domain/topic';

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

interface Props {
    topics: Topic[];
}

export default function TopicSideMenu({ topics }: Props) {
    const root = generateTopicTree(topics);

    return (
        <aside
            className={'h-full min-w-56 bg-stone-100 px-2 py-4 flex flex-col'}
        >
            {generateTopicItem(root)}
        </aside>
    );
}
