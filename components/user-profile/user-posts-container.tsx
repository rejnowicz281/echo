"use client";

import useAuthContext from "@/providers/auth-provider";
import { Post } from "@/types/posts";
import { FC } from "react";
import PostsPagination from "../posts/posts-pagination";
import useUserContext from "./user-provider";

type UserPostsContainerProps = {
    posts: Post[];
    currentPage: number;
    isLastPage?: boolean;
};

const UserPostsContainer: FC<UserPostsContainerProps> = ({ posts, isLastPage, currentPage }) => {
    const authData = useAuthContext();
    const { user } = useUserContext();

    const currentUser = authData.user;

    return posts.length <= 0 && currentPage === 1 ? (
        <div className="text-gray-500 text-center">
            {currentUser.id === user.id
                ? "You haven't"
                : user.first_name
                ? `${user.first_name} hasn't`
                : `${user.email} hasn't`}{" "}
            posted anything yet.
        </div>
    ) : (
        <PostsPagination
            posts={posts.map((post) => ({ ...post, creator: user }))}
            currentPage={currentPage}
            isLastPage={isLastPage}
        />
    );
};

export default UserPostsContainer;
