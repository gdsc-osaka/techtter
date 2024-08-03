import { Timestamp } from 'firebase/firestore';

export interface Role {
    id: string;
    name: string;
    policies: string[];
    created_at: Timestamp;
    updated_at: Timestamp;
}

export function assertsRole(data: object): asserts data is Role {
    if (
        !(
            'id' in data &&
            typeof data.id === 'string' &&
            'name' in data &&
            typeof data.name === 'string' &&
            'policies' in data &&
            Array.isArray(data.policies) &&
            'created_at' in data &&
            typeof data.created_at === 'object' &&
            'updated_at' in data &&
            typeof data.updated_at === 'object'
        )
    ) {
        throw new Error(`data ${JSON.stringify(data)} is not a type of Role`);
    }
}
