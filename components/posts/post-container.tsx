import PostContent from "@/components/posts/post-content";
import ReplyButton from "@/components/posts/reply-button";
import { Post } from "@/types/posts";
import Link from "next/link";
import { FC } from "react";
import BackLinkText from "./back-link-text";
import LikeButton from "./like-button";
import OptionsButton from "./options-button";

export type PostContainerProps = {
    post: Post;
    asLink?: boolean;
    showParentPost?: boolean;
};

const PostContainer: FC<PostContainerProps> = ({ post, asLink = true, showParentPost = false }) => {
    return (
        <div
            className={`${
                asLink ? `p-4 border hover:bg-gray-100 transition-colors rounded-lg ` : " "
            }relative flex flex-col gap-3`}
            key={post.id}
        >
            <OptionsButton post={post} />

            {showParentPost && post.parent_post && post.parent_post_creator && (
                <Link href={`/posts/${post.parent_post}`} className="z-10 hover:underline text-gray-500 text-sm">
                    <BackLinkText post={post} />
                </Link>
            )}
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
