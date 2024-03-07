import { PostsActionResponse } from "./posts-action-response";

export type GetPostsAction = (page: number) => Promise<PostsActionResponse>;
