import { describe, expect } from 'vitest';
import { topicFactory } from '../../_shared/factories/topicFactory';
import {
    generateTopicLink,
    generateTopicTree,
    TopicTreeNode,
} from '@/lib/topicTreeUtils';

describe('topicTreeUtils', () => {
    describe('generateTopicTree', (it) => {
        it('should generate tree correctly', () => {
            const topics = [
                topicFactory.build({ left: 0, right: 100 }),
                topicFactory.build({ left: 0, right: 50 }),
                topicFactory.build({ left: 0, right: 25 }),
                topicFactory.build({ left: 25, right: 50 }),
                topicFactory.build({ left: 50, right: 100 }),
                topicFactory.build({ left: 100, right: 200 }),
                topicFactory.build({ left: 150, right: 200 }),
            ];
            const shuffled = [
                topics[5],
                topics[1],
                topics[6],
                topics[0],
                topics[3],
                topics[2],
                topics[4],
            ];
            const tree = generateTopicTree(shuffled);
            expect(tree.children[0].topic).toBe(topics[0]);
            expect(tree.children[0].children[0].topic).toBe(topics[1]);
            expect(tree.children[0].children[0].children[0].topic).toBe(
                topics[2]
            );
            expect(tree.children[0].children[0].children[1].topic).toBe(
                topics[3]
            );
            expect(tree.children[0].children[1].topic).toBe(topics[4]);
            expect(tree.children[1].topic).toBe(topics[5]);
            expect(tree.children[1].children[0].topic).toBe(topics[6]);
        });
    });

    describe('generateTopicLink', (it) => {
        it('should generate link text correctly', () => {
            const root: TopicTreeNode = {
                topic: topicFactory.build({
                    left: Number.NEGATIVE_INFINITY,
                    right: Number.POSITIVE_INFINITY,
                }),
                parent: null,
                children: [],
            };

            root.children.push(
                {
                    topic: topicFactory.build({ left: 0, right: 100 }),
                    parent: root,
                    children: [],
                },
                {
                    topic: topicFactory.build({ left: 100, right: 200 }),
                    parent: root,
                    children: [],
                }
            );

            const child = root.children[0];

            child.children.push({
                topic: topicFactory.build({ left: 0, right: 50 }),
                parent: child,
                children: [],
            });

            expect(generateTopicLink(child.children[0])).toBe(
                `${child.topic.id}/${child.children[0].topic.id}/`
            );
        });
    });
});
