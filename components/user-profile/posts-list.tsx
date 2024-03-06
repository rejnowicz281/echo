"use client";

import PostContainer from "@/components/posts/post-container";
import useAuthContext from "@/providers/auth-provider";
import { Post } from "@/types/posts";
import { User } from "@/types/users";
import { FC } from "react";

type PostsListProps = {
    user: User & { posts: Post[] };
};

const PostsList: FC<PostsListProps> = ({ user }) => {
    const authData = useAuthContext();

    const currentUser = authData.user;

    return user.posts.length > 0 ? (
        user.posts.map((post) => <PostContainer key={post.id} post={post} />)
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

export default PostsList;
