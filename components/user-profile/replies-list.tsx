"use client";

import useAuthContext from "@/providers/auth-provider";
import { Post } from "@/types/posts";
import { FC } from "react";
import PostContainer from "../posts/post-container";
import useUserContext from "./user-provider";

type RepliesListProps = {
    replies: Post[];
};

const RepliesList: FC<RepliesListProps> = ({ replies }) => {
    const { user: currentUser } = useAuthContext();
    const { user } = useUserContext();

    return replies.length > 0 ? (
        <div className="mx-auto max-w-[700px] w-full flex flex-col gap-10">
            {replies.map((post) => (
                <PostContainer showParentPost={true} key={post.id} post={post} />
            ))}
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

export default RepliesList;
