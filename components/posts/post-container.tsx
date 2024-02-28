import PostContent from "@/components/posts/post-content";
import ReplyButton from "@/components/posts/reply-button";
import { Post } from "@/types/posts";
import Link from "next/link";
import { FC } from "react";
import LikeButton from "./like-button";

export type PostContainerProps = {
    post: Post;
    asLink?: boolean;
};

const PostContainer: FC<PostContainerProps> = ({ post, asLink = true }) => {
    return (
        <div
            className={`${
                asLink ? `relative p-4 border hover:bg-gray-100 transition-colors rounded-lg ` : " "
            }flex flex-col gap-3`}
            key={post.id}
        >
            <PostContent post={post} />

            <div className="flex flex-row items-center gap-5">
                <LikeButton post={post} />
                <ReplyButton post={post} />
            </div>
            {asLink && <Link className="absolute inset-0" href={`/posts/${post.id}`}></Link>}
        </div>
    );
};

export default PostContainer;
