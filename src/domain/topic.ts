import { Timestamp } from 'firebase/firestore';

export interface Topic {
    id: string;
    name: string;
    left: number;
    right: number;
    icon_path?: string;
    created_at: Timestamp;
    updated_at: Timestamp;
}
