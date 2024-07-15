import {ITopicService} from '@/application/topic/iTopicService';
import {ITopicRepository} from '@/infrastructure/topic/ITopicRepository';

export class TopicService implements ITopicService {
    constructor(private readonly topicRepository: ITopicRepository) {}

}
