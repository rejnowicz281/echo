import { Post } from "@/types/posts";
import { FC } from "react";
import PostContainer from "./post-container";
import PostForm from "./post-form";

export type PostsContainerProps = {
    posts: Post[];
    deleteContent?: string;
    deleteLoading?: string;
    content?: string;
    loading?: string;
    parent_post?: string;
};

const PostsContainer: FC<PostsContainerProps> = ({
    posts,
    deleteContent = "Delete Post",
    deleteLoading = "Deleting Post...",
    parent_post,
    content = "Add Post",
    loading = "Adding Post...",
}) => {
    return (
        <div>
            <PostForm parent_post={parent_post} content={content} loading={loading} />
            {posts.length > 0 ? (
                posts.map((post) => (
                    <PostContainer
                        key={post.id}
                        post={post}
                        deleteContent={deleteContent}
                        deleteLoading={deleteLoading}
                    />
                ))
            ) : (
                <p>[]</p>
            )}
        </div>
    );
};

export default PostsContainer;
