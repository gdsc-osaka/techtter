import { Topic } from '@/domain/topic';

export type TopicsCallback = (topics: Topic[]) => void;

export interface ITopicQueryService {
    subscribeTopics(callback: TopicsCallback): void;
}
