import { FC } from "react";
import { PostsProps } from ".";
import PostContainer from "../post-container";

const PostsList: FC<PostsProps> = ({ posts, showParentPost = false }) => {
    return posts.map((post) => <PostContainer showParentPost={showParentPost} key={post.id} post={post} />);
};

export default PostsList;
