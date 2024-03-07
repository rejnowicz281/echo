import { ActionResponse } from "./action-response";
import { Post } from "./posts";

export type PostsActionResponse = ActionResponse & {
    posts?: Post[];
    isLastPage?: boolean;
};
