import { User } from "./users";

export type Friendship = {
    id: string;
    created_at: string;
    requester: User | string;
    recipient: User | string;
    accepted: boolean;
};
