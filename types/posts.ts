import User from "./user";

export type Post = {
    id: string;
    text: string;
    image_url: string;
    creator: User | string; // User type or user id
    created_at: string;
};

export type Posts = Post[];
