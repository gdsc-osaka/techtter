import { atom } from 'jotai';
import { Topic } from '@/domain/topic';
import { TopicQueryService } from '@/infrastructure/topic/topicQueryService';
import { atomFamily } from 'jotai/utils';

const _topicsAtom = atom<Topic[]>([]);

const topicQueryService = new TopicQueryService();

export const topicsAtom = atom(
    (get) => get(_topicsAtom),
    (get, set) => {
        topicQueryService.subscribeTopics((topics) => {
            set(_topicsAtom, (prev) =>
                prev
                    .filter((p) => !topics.map((t) => t.id).includes(p.id))
                    .concat(topics)
            );
        });
    }
);

export const topicFamily = atomFamily((topicId: string) =>
    atom<Topic | undefined>((get) => {
        return get(_topicsAtom).find((t) => t.id === topicId);
    })
);
