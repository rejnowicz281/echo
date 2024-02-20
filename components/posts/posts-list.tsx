import { Post } from "@/types/posts";
import { FC } from "react";
import PostContent from "./post-content";

export type PostsListProps = {
    posts: Post[];
    deleteContent?: string;
    deleteLoading?: string;
    link?: boolean;
};

const PostsList: FC<PostsListProps> = ({
    posts,
    deleteContent = "Delete Post",
    deleteLoading = "Deleting Post...",
    link = true,
}) => {
    return posts.length > 0 ? (
        posts.map((post) => (
            <PostContent
                key={post.id}
                link={link}
                post={post}
                deleteContent={deleteContent}
                deleteLoading={deleteLoading}
            />
        ))
    ) : (
        <div>[]</div>
    );
};

export default PostsList;
