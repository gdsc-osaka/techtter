export interface Post {
    id: string;
    category_id: string;
    category_center: number;
    tags: string[]
    content: string;
    created_at: Date;
    updated_at: Date;
}
