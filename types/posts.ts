import { User } from "./users";

export type Post = {
    id: string;
    text: string;
    image_url: string;
    creator: User | string; // User type or user id
    created_at: string;
    replies: Post[];
    reply_count: number;
    parent_post?: string;
};
