import { User } from "./users";

export type Post = {
    id: string;
    text: string;
    image_url: string;
    creator: User;
    created_at: string;
    reply_count: number;
    parent_post?: string;
};
