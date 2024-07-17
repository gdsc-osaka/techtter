import { Topic } from '@/domain/topic';
import { Timestamp } from 'firebase/firestore';

export interface TopicTreeNode {
    topic: Topic;
    children: TopicTreeNode[];
    parent: TopicTreeNode | null;
}

const rootTopic: Topic = {
    id: 'root',
    name: 'Root',
    left: Number.NEGATIVE_INFINITY,
    right: Number.POSITIVE_INFINITY,
    gen: 0,
    icon_path: null,
    created_at: Timestamp.now(),
    updated_at: Timestamp.now(),
};

export function generateTopicTree(topics: Topic[]): TopicTreeNode {
    // right 降順にソートしたあと, left 昇順にソート
    topics.sort((a, b) => a.left - b.left || b.right - a.right);

    const root: TopicTreeNode = {
        topic: rootTopic,
        children: [],
        parent: null,
    };
    let node = root;

    for (const topic of topics) {
        while (node.topic.right <= topic.left && node.parent !== null) {
            node = node.parent;
        }

        const child = {
            topic: topic,
            children: [],
            parent: node,
        };
        node.children.push(child);
        node = child;
    }

    return root;
}

/**
 * TopicTreeNode からトピックの URL に対応するリンクを生成する.
 * @example front-end(react(remix), next) で remix を入力すると /front-end/react/remix/ が返る.
 * @param node 生成したい Topic のノード
 */
export function generateTopicLink(node: TopicTreeNode): string {
    let href = '';

    while (node.parent !== null) {
        href = node.topic.id + '/' + href;
        node = node.parent;
    }

    return href;
}
