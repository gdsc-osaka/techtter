import { assertsTopic, Topic } from '@/domain/topic';
import { sfetch } from '@/lib/fetchUtils';
import { replacePlainObjWithTimestamp } from '@/lib/timestampUtils';

export default function fetchTopic(topicId: string): Promise<Topic> {
    return fetch(`https://techtter-git-fix-isr-2-harineko0s-projects.vercel.app/api/topics/${topicId}`, { cache: 'force-cache' })
        .then((res) => res.json())
        .then((d) => {
            const topic = replacePlainObjWithTimestamp(d.topic);
            assertsTopic(topic);
            return topic;
        });
}
