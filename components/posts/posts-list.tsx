import { Post } from "@/types/posts";
import { FC } from "react";
import PostContainer from "./post-container";

type PostsListProps = {
    posts: Post[];
    showParentPost?: boolean;
};

const PostsList: FC<PostsListProps> = ({ posts, showParentPost = false }) => {
    return posts.map((post) => <PostContainer showParentPost={showParentPost} key={post.id} post={post} />);
};

export default PostsList;
