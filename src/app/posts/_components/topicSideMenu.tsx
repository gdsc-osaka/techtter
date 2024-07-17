import TopicItem from '@/app/posts/_components/topicItem';
import {
    generateTopicLink,
    generateTopicTree,
    TopicTreeNode,
} from '@/lib/topicTreeUtils';
import { TopicRepository } from '@/infrastructure/topic/topicRepository';
import RootAddTopicButton from '@/app/posts/_components/rootAddTopicButton';
import { Topic } from '@/domain/topic';
import { getHost } from '@/lib/urlUtils';

const topicRepository = new TopicRepository();

export default async function TopicSideMenu() {
    const host = getHost();

    if (host === null) return Promise.reject();

    const topics: Topic[] = await fetch(`${host}/api/topics`, {
        next: { revalidate: 3600 },
    })
        .then((res) => res.json())
        .then((json) => json.topics);
    const root = generateTopicTree(topics);

    return (
        <aside className={'h-full min-w-56 bg-stone-100 px-2 flex flex-col'}>
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
