import { Post } from "@/types/posts";
import { FC } from "react";
import PostsContainer from "./posts-container";

export type RepliesContainerProps = {
    replies: Post[];
    parent_post: string;
};

const RepliesContainer: FC<RepliesContainerProps> = ({ replies = [], parent_post }) => {
    return (
        <ul>
            <PostsContainer
                parent_post={parent_post}
                content="Leave a reply"
                loading="Leaving reply..."
                posts={replies}
                deleteContent="Delete Reply"
                deleteLoading="Deleting reply..."
            />
        </ul>
    );
};

export default RepliesContainer;
