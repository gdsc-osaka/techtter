export interface Post {
    id: string;
    topic_id: string;
    topic_center: number;
    tags: string[];
    content: string;
    created_at: Date;
    updated_at: Date;
}
