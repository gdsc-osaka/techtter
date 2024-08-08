import { Factory } from 'fishery';
import { Topic } from '@/domain/topic';
import { Timestamp } from 'firebase/firestore';

export const topicFactory = Factory.define<Topic>(({ sequence }) => ({
    id: `topic-${sequence}`,
    name: `Topic ${sequence}`,
    left: 0,
    right: 100,
    gen: 1,
    icon_path: null,
    created_at: Timestamp.now(),
    updated_at: Timestamp.now(),
    webhooks: [],
}));
