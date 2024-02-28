import getPost from "@/actions/posts/read/get-post";
import PostContainer from "@/components/posts/post-container";
import PostForm from "@/components/posts/post-form";
import userDisplayName from "@/utils/general/user-display-name";
import Link from "next/link";
import { FC } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

export type PostPageProps = {
    params: { id: string };
};

const PostPage: FC<PostPageProps> = async ({ params: { id } }) => {
    const { post } = await getPost(id);

    if (!post) return <div>Post not found</div>;

    return (
        <div className="p-12 mx-auto max-w-[800px] w-full flex flex-col gap-10">
            <Link
                className="text-gray-800 hover:text-gray-600 flex flex-row items-center gap-3"
                href={post.parent_post ? `/posts/${post.parent_post}` : "/"}
            >
                <IoMdArrowRoundBack className="text-2xl" />
                {post.parent_post
                    ? post.parent_post_creator
                        ? `Replying to ${userDisplayName(post.parent_post_creator)}`
                        : "Parent Post"
                    : "Home"}
            </Link>

            <div className="flex flex-col gap-6">
                <PostContainer post={post} asLink={false} />
                <PostForm parent_post={id} content="Reply" placeholder="Reply to this post" />
            </div>

            {post.replies.length > 0 && post.replies.map((reply) => <PostContainer key={reply.id} post={reply} />)}
        </div>
    );
};

export default PostPage;
