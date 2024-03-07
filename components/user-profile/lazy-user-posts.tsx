"use client";

import getUserPosts from "@/actions/users/read/get-user-posts/server";
import useAuthContext from "@/providers/auth-provider";
import { Post } from "@/types/posts";
import { User } from "@/types/users";
import { FC } from "react";
import LazyPosts from "../posts/lazy-posts";

type LazyUserPostsProps = {
    user: User & { posts: Post[] };
    postId?: string;
};

const LazyUserPosts: FC<LazyUserPostsProps> = ({ user }) => {
    const authData = useAuthContext();

    const currentUser = authData.user;

    return user.posts.length > 0 ? (
        <LazyPosts posts={user.posts} getPostsAction={(page: number) => getUserPosts(page, user)} isLastPage={false} />
    ) : (
        <div className="text-gray-500 text-center">
            {currentUser.id === user.id
                ? "You haven't"
                : user.first_name
                ? `${user.first_name} hasn't`
                : `${user.email} hasn't`}{" "}
            posted anything yet.
        </div>
    );
};

export default LazyUserPosts;
