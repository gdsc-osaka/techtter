// Topic新規作成
// 親Topic: 0 ~ 2^12, 2^12 ~ 2*2^12
// 子Topic: 0 ~ 2^8, 2^8 ~ 2*2^8, ..., 15*2^8 ~ 16*2^8
// 孫Topic: 0 ~ 2^4, 2^4 ~ 2*2^4, ..., 15*2^4 ~ 16*2^4
// 曾孫Topic: 0 ~ 1, 1 ~ 2, ..., 15 ~ 16
// 玄孫Topic: 0 ~ 2^-4, 2^-4 ~ 2*2^-4, ..., 15*2^-4 ~ 16*2^-4
// > 0 番目をダミー
// > left <= left' && right < right'
// > 子Topic に 17 個目を追加したい -> 孫Topic以降を2で割る
// > > 0 ~ 2^7, 2^7 ~ 2*2^7, ..., 15*2^7 ~ 16*2^7, ..., 31*2^7 ~ 32*2^7
import { Topic } from '@/domain/topic';

export interface ITopicService {
    addTopic(parentId: string, topic: Pick<Topic, 'id' | 'name' | 'icon_path'>): Promise<void>;
}
