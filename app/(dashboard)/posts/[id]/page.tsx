import getPost from "@/actions/posts/read/get-post";
import ErrorContainer from "@/components/general/error-container";
import BackLinkText from "@/components/posts/back-link-text";
import PostContainer from "@/components/posts/post-container";
import PostForm from "@/components/posts/post-form";
import { IoMdArrowRoundBack } from "@react-icons/all-files/io/IoMdArrowRoundBack";
import Link from "next/link";
import { FC } from "react";

export type PostPageProps = {
    params: { id: string };
};

const PostPage: FC<PostPageProps> = async ({ params: { id } }) => {
    const { post } = await getPost(id);

    if (!post)
        return (
            <ErrorContainer error="An error has occured while fetching this post. Are you sure the ID is correct?" />
        );

    return (
        <div className="p-12 mx-auto max-w-[800px] w-full flex flex-col gap-10">
            <Link
                className="text-gray-800 hover:text-gray-600 flex flex-row items-center gap-3"
                href={post.parent_post ? `/posts/${post.parent_post}` : "/"}
            >
                <IoMdArrowRoundBack className="text-2xl" />
                <BackLinkText post={post} />
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
