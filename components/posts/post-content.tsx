import DeletePostButton from "@/components/posts/delete-post-button";
import { Post } from "@/types/posts";
import userDisplayName from "@/utils/general/user-display-name";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

export type PostContentProps = {
    post: Post;
    deleteContent?: string;
    deleteLoading?: string;
    link?: boolean;
};

const PostContent: FC<PostContentProps> = ({
    post,
    deleteContent = "Delete Post",
    deleteLoading = "Deleting Post...",
    link = true,
}) => {
    return (
        <div>
            {post.text && <h3>{post.text}</h3>}
            {link && <Link href={`/posts/${post.id}`}>{post.id}</Link>}
            {post.image_url && <Image src={post.image_url} width="400" height="400" alt="post image" />}
            <p>Creator: {typeof post.creator === "string" ? post.creator : userDisplayName(post.creator)}</p>
            {post.reply_count > 0 && <p>Replies: {post.reply_count}</p>}
            <DeletePostButton id={post.id} content={deleteContent} loading={deleteLoading} />
        </div>
    );
};

export default PostContent;
