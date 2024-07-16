import { ITopicRepository } from '@/infrastructure/topic/ITopicRepository';
import { vi } from 'vitest';
import { Topic } from '@/domain/topic';
import { ForUpdate, WithFieldValues } from '@/domain/_utils';

export class MockTopicRepository implements ITopicRepository {
    create = vi.fn();
    delete = vi.fn<(id: string) => Promise<void>>();
    find = vi.fn<(id: string) => Promise<Topic | undefined>>();
    findMany = vi.fn<() => Promise<Topic[]>>();
    update =
        vi.fn<(topic: ForUpdate<WithFieldValues<Topic>>) => Promise<void>>();
}
