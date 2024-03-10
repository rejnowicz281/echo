"use client";

import useAuthContext from "@/providers/auth-provider";
import { Post } from "@/types/posts";
import { FC } from "react";
import PostsPagination from "../posts/posts-pagination";
import useUserContext from "./user-provider";

type UserRepliesContainerProps = {
    replies: Post[];
    isLastPage?: boolean;
    currentPage: number;
};

const UserRepliesContainer: FC<UserRepliesContainerProps> = ({ replies, isLastPage, currentPage }) => {
    const { user: currentUser } = useAuthContext();
    const { user } = useUserContext();

    return replies.length > 0 ? (
        <div className="mx-auto max-w-[700px] w-full flex flex-col gap-10">
            <PostsPagination posts={replies} isLastPage={isLastPage} currentPage={currentPage} showParentPost={true} />
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

export default UserRepliesContainer;
