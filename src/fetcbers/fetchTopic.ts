import { assertsTopic, Topic } from '@/domain/topic';
import { sfetch } from '@/lib/fetchUtils';
import { replacePlainObjWithTimestamp } from '@/lib/timestampUtils';

export default function fetchTopic(topicId: string): Promise<Topic> {
    return sfetch(`/api/topics/${topicId}`, { cache: 'force-cache' })
        .then((res) => {
            res.text().then(t => console.log(t))
            return res.json();
        })
        .then((d) => {
            const topic = replacePlainObjWithTimestamp(d.topic);
            assertsTopic(topic);
            return topic;
        });
}
