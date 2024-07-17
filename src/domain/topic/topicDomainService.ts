import { ITopicDomainService } from '@/domain/topic/iTopicDomainService';
import { Topic } from '@/domain/topic';
import { ITopicQueryService } from '@/infrastructure/topic/iTopicQueryService';
import { Timestamp } from 'firebase/firestore';
import { gcd, isPow2 } from '@/lib/numUtils';
import { ITopicRepository } from '@/infrastructure/topic/ITopicRepository';
import { logger } from '@/logger';

const rootTopic: Topic = {
    id: 'id',
    name: 'name',
    // JS の整数最大値は 2^53 - 1
    left: 0,
    right: 2 ** 10,
    gen: 0,
    icon_path: null,
    created_at: Timestamp.now(),
    updated_at: Timestamp.now(),
};

const initialLength = 16;

export class TopicDomainService implements ITopicDomainService {
    constructor(
        private readonly topicQueryService: ITopicQueryService,
        private readonly topicRepository: ITopicRepository
    ) {}

    async createChildTopic(
        parent: Topic = rootTopic
    ): Promise<Pick<Topic, 'left' | 'right' | 'gen'>> {
        try {
            const children =
                await this.topicQueryService.findManyChildren(parent);
            const len = children.length;
            // 16, 32, 64... の場合以外空きあり
            const hasRoom = len < initialLength || !isPow2(len);

            const lastChild =
                len > 0
                    ? children[len - 1]
                    : {
                          // 子データがない場合はダミーの child. 0 番目にデータは入れない (親と干渉するから)
                          left: parent.left,
                          right:
                              parent.left +
                              gcd([parent.left, parent.right]) / initialLength,
                          gen: parent.gen + 1,
                      };
            // left ~ right の距離
            const range = Math.abs(lastChild.right - lastChild.left);

            if (hasRoom) {
                // 余裕がある場合はそのまま作成
                return {
                    left: lastChild.left + range,
                    right: lastChild.right + range,
                    gen: lastChild.gen,
                };
            }

            // 余裕がない場合は倍に拡張
            const descendants = await this.topicQueryService.findManyChildren(
                parent,
                true
            );
            const newDescendants = descendants.map((d) => ({
                ...d,
                left: d.left / 2,
                right: d.right / 2,
            }));

            const promises = newDescendants.map((n) =>
                this.topicRepository.update(n)
            );
            await Promise.all(promises);
            const newRange = range / 2;
            return {
                left: lastChild.left + newRange,
                right: lastChild.right + newRange,
                gen: lastChild.gen,
            };
        } catch (e) {
            logger.error(e);
            return Promise.reject(e);
        }
    }
}
