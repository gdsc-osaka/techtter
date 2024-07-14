import { describe, expect } from 'vitest';
import { TopicRepository } from '@/infrastructure/topic/topicRepository';
import { topicFactory } from '../../../_shared/factories/topicFactory';

describe('TopicRepository', () => {
    const repository = new TopicRepository();

    describe('create', (it) => {
        it('should create a topic', async () => {
            const topic = await repository.create(
                topicFactory.build({
                    id: 'database',
                    name: 'Database',
                    left: 100,
                    right: 150,
                })
            );
            expect(topic).toMatchObject({
                id: 'front-end',
                name: 'Front End',
                left: 1,
                right: 100,
            });
        });
    });
});
