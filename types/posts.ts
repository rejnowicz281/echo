import { User } from "./users";

export type Post = {
    id: string;
    text: string;
    image_url: string;
    creator: User;
    created_at: string;
    reply_count: number;
    like_count: number;
    like: string;
    parent_post?: string;
    parent_post_creator?: {
        id: string;
        email: string;
        first_name?: string;
        last_name?: string;
    };
};
