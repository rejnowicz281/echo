"use client";

import getPostReplies from "@/actions/posts/read/get-post-replies/server";
import { Post } from "@/types/posts";
import { FC } from "react";
import LazyPosts from "./lazy-posts";

type LazyRepliesProps = {
    replies: Post[];
    isLastPage?: boolean;
    postId: string;
};

const LazyReplies: FC<LazyRepliesProps> = ({ replies, isLastPage, postId }) => {
    return (
        <LazyPosts
            posts={replies}
            isLastPage={isLastPage}
            getPostsAction={(page: number) => getPostReplies(page, postId)}
        />
    );
};

export default LazyReplies;
