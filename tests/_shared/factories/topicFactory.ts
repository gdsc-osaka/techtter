import { Factory } from 'fishery';
import { Topic } from '@/domain/topic';
import { Timestamp } from 'firebase/firestore';

export const topicFactory = Factory.define<Topic>(({ sequence }) => ({
    id: `topic-${sequence}`,
    name: `Topic ${sequence}`,
    left: 0,
    right: 100,
    icon_path: undefined,
    created_at: Timestamp.now(),
    updated_at: Timestamp.now(),
}));
