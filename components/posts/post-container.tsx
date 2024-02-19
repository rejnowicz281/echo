import DeletePostButton from "@/components/posts/delete-post-button";
import RepliesContainer from "@/components/posts/replies-container";
import { Post } from "@/types/posts";
import userDisplayName from "@/utils/general/user-display-name";
import Image from "next/image";
import { FC } from "react";

export type PostContainerProps = {
    post: Post;
    deleteContent?: string;
    deleteLoading?: string;
};

const PostContainer: FC<PostContainerProps> = ({
    post,
    deleteContent = "Delete Post",
    deleteLoading = "Deleting Post...",
}) => {
    return (
        <div>
            {post.text && <h3>{post.text}</h3>}
            <p>{post.id}</p>
            {post.image_url && <Image src={post.image_url} width="400" height="400" alt="post image" />}
            <p>Creator: {typeof post.creator === "string" ? post.creator : userDisplayName(post.creator)}</p>
            <DeletePostButton id={post.id} content={deleteContent} loading={deleteLoading} />
            <hr />
            <RepliesContainer parent_post={post.id} replies={post.replies} />
        </div>
    );
};

export default PostContainer;
