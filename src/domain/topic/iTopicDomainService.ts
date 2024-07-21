import { Topic } from '@/domain/topic';

export interface ITopicDomainService {
    /**
     * parent の子 Topic を作成する
     * @param parent undefined ならルート Topic とみなす
     */
    createChildTopic(
        parent?: Topic
    ): Promise<Pick<Topic, 'left' | 'right' | 'gen'>>;
}
