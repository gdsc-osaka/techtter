import { ITopicService } from '@/application/topic/iTopicService';
import { ITopicRepository } from '@/infrastructure/topic/ITopicRepository';
import { Topic } from '@/domain/topic';
import { ITopicDomainService } from '@/domain/topic/iTopicDomainService';
import { logger } from '@/logger';

export class TopicService implements ITopicService {
    constructor(
        private readonly topicRepository: ITopicRepository,
        private readonly topicDomainService: ITopicDomainService
    ) {}

    async addTopic(
        parentId: string,
        topic: Pick<Topic, 'id' | 'name' | 'icon_path'>
    ): Promise<Topic> {
        const parent =
            parentId === ''
                ? undefined
                : await this.topicRepository.find(parentId);

        const childTopic =
            await this.topicDomainService.createChildTopic(parent);
        const newTopic = await this.topicRepository.create({
            ...topic,
            ...childTopic,
        });
        logger.log(`Topic created. ${newTopic.id}`);
        return newTopic;
    }
}
