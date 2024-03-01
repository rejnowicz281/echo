import { User } from "./users";

export type Like = {
    id: string;
    created_at: string;
    post: string;
    user: User;
};
