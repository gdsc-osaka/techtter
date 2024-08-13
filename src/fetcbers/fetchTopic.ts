import { assertsTopic, Topic } from '@/domain/topic';
import { sfetch } from '@/lib/fetchUtils';

export default function fetchTopic(topicId: string): Promise<Topic> {
    return sfetch(`/api/topics/${topicId}`, { cache: 'force-cache' })
        .then((res) => res.json())
        .then((d) => {
            const { topic } = d;
            assertsTopic(topic);
            return topic;
        });
}
