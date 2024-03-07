"use client";

import getUserReplies from "@/actions/users/read/get-user-replies/server";
import useAuthContext from "@/providers/auth-provider";
import { Post } from "@/types/posts";
import { FC } from "react";
import LazyPosts from "../posts/lazy-posts";
import useUserContext from "./user-provider";

type LazyUserRepliesProps = {
    replies: Post[];
    isLastPage?: boolean;
    userId: string;
};

const LazyUserReplies: FC<LazyUserRepliesProps> = ({ replies, isLastPage, userId }) => {
    const { user: currentUser } = useAuthContext();
    const { user } = useUserContext();

    return replies.length > 0 ? (
        <div className="mx-auto max-w-[700px] w-full flex flex-col gap-10">
            <LazyPosts
                posts={replies}
                isLastPage={isLastPage}
                showParentPost={true}
                getPostsAction={(page: number) => getUserReplies(page, userId)}
            />
        </div>
    ) : (
        <div className="text-gray-500 text-center">
            {currentUser.id === user.id
                ? "You haven't"
                : user.first_name
                ? `${user.first_name} hasn't`
                : `${user.email} hasn't`}{" "}
            replied to anything yet.
        </div>
    );
};

export default LazyUserReplies;
