import { Timestamp } from 'firebase/firestore';

export interface Topic {
    id: string;
    name: string;
    left: number;
    right: number;
    // 世代. 1 が最上位レイヤーのトピック
    gen: number;
    icon_path: string | null;
    created_at: Timestamp;
    updated_at: Timestamp;
}
