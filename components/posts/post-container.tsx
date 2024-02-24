import PostContent from "@/components/posts/post-content";
import ReplyButton from "@/components/posts/reply-button";
import { Post } from "@/types/posts";
import Link from "next/link";
import { FC } from "react";

export type PostContainerProps = {
    post: Post;
};

const PostContainer: FC<PostContainerProps> = ({ post }) => {
    return (
        <div
            className="relative p-4 border hover:bg-gray-100 transition-colors rounded-lg flex flex-col gap-3"
            key={post.id}
        >
            <PostContent post={post} />

            <ReplyButton post={post} />
            <Link className="absolute inset-0" href={`/posts/${post.id}`}></Link>
        </div>
    );
};

export default PostContainer;
