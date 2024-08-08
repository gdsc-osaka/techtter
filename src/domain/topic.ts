import { Timestamp } from 'firebase/firestore';

export interface Topic {
    id: string;
    name: string;
    left: number;
    right: number;
    // 世代. 1 が最上位レイヤーのトピック
    gen: number;
    icon_path: string | null;
    webhooks: string[];
    created_at: Timestamp;
    updated_at: Timestamp;
}

export function assertsTopic(data: object): asserts data is Topic {
    if (
        !(
            'id' in data &&
            typeof data.id === 'string' &&
            'name' in data &&
            typeof data.name === 'string' &&
            'left' in data &&
            typeof data.left === 'number' &&
            'right' in data &&
            typeof data.right === 'number' &&
            'gen' in data &&
            typeof data.gen === 'number' &&
            'created_at' in data &&
            typeof data.created_at === 'object' &&
            'updated_at' in data &&
            typeof data.updated_at === 'object' &&
            'icon_path' in data &&
            (data.icon_path === null || typeof data.icon_path === 'string') &&
            (!('webhooks' in data) || data.webhooks instanceof Array)
        )
    ) {
        throw new Error(`data ${JSON.stringify(data)} is not a type of Topic`);
    }
}

export function initTopic(
    topic: Pick<Topic, 'id' | 'name' | 'icon_path'>,
    generated: Pick<Topic, 'left' | 'right' | 'gen'>
): Omit<Topic, 'created_at' | 'updated_at'> {
    return {
        ...topic,
        ...generated,
        webhooks: [],
    };
}
