import { Topic } from '@/domain/topic';
import { Unsubscribe } from '@/infrastructure/utils';

export type TopicsCallback = (topics: Topic[]) => void;

export interface ITopicQueryService {
    subscribeTopics(callback: TopicsCallback): Unsubscribe;

    findManyChildren(
        parent: Topic,
        includeDescendants?: boolean
    ): Promise<Topic[]>;
}
