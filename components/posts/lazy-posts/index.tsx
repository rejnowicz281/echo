import getFeedPosts from "@/actions/posts/read/get-feed-posts/server";
import { GetPostsAction } from "@/types/get-posts-action";
import { Post } from "@/types/posts";
import { FC } from "react";
import LoadMore from "./load-more";
import PostsList from "./posts-list";

export type PostsProps = {
    posts: Post[];
    showParentPost?: boolean;
};

type LazyPostsProps = PostsProps & { isLastPage?: boolean; getPostsAction?: GetPostsAction };

const LazyPosts: FC<LazyPostsProps> = ({
    posts,
    isLastPage,
    getPostsAction = getFeedPosts,
    showParentPost = false,
}) => {
    return (
        <>
            <PostsList posts={posts} showParentPost={showParentPost} />
            {!isLastPage && <LoadMore getPostsAction={getPostsAction} showParentPost={showParentPost} />}
        </>
    );
};

export default LazyPosts;
