import getPost from "@/actions/posts/read/get-post";
import PostContent from "@/components/posts/post-content";
import PostForm from "@/components/posts/post-form";
import PostsList from "@/components/posts/posts-list";
import Link from "next/link";
import { FC } from "react";

export type PostPageProps = {
    params: { id: string };
};

const PostPage: FC<PostPageProps> = async ({ params: { id } }) => {
    const { post } = await getPost(id);

    if (!post) return <div>Post not found</div>;

    return (
        <>
            {post.parent_post && <Link href={`/posts/${post.parent_post}`}>Parent Post</Link>}
            <PostContent post={post} link={false} />
            <PostForm parent_post={id} content="Leave Reply" loading="Leaving Reply..." />
            {post.replies.length > 0 && (
                <>
                    <h3>Replies ({post.replies.length})</h3>
                    <ul>
                        <PostsList
                            posts={post.replies}
                            deleteContent="Delete Reply"
                            deleteLoading="Deleting Reply..."
                        />
                    </ul>
                </>
            )}
        </>
    );
};

export default PostPage;
