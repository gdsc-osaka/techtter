import { ForCreate, ForUpdate } from '@/domain/_utils';
import { Topic } from '@/domain/topic';

export interface ITopicRepository {
    create(topic: ForCreate<Topic>): Promise<void>;
    update(topic: ForUpdate<Topic>): Promise<void>;
    delete(id: string): Promise<void>;
    find(id: string): Promise<Topic | undefined>;
    findMany(): Promise<Topic[]>;
}
