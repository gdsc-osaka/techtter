import {Timestamp} from "firebase/firestore";

export interface Category {
    id: string;
    name: string;
    left: number;
    right: number;
    icon_path?: string;
    created_at: Timestamp;
    updated_at: Timestamp;
}
