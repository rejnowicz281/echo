import getPost from "@/actions/posts/read/get-post";
import getPostReplies from "@/actions/posts/read/get-post-replies";
import ErrorContainer from "@/components/general/error-container";
import BackLinkText from "@/components/posts/back-link-text";
import PostContainer from "@/components/posts/post-container";
import PostForm from "@/components/posts/post-form";
import PostsPagination from "@/components/posts/posts-pagination";
import { NextSearchParams } from "@/types/next-search-params";
import extractPageFromParams from "@/utils/general/extract-page-from-params";
import { IoMdArrowRoundBack } from "@react-icons/all-files/io/IoMdArrowRoundBack";
import Link from "next/link";
import { FC } from "react";

type PostPageProps = {
    params: { id: string };
    searchParams: NextSearchParams;
};

const PostPage: FC<PostPageProps> = async ({ params: { id }, searchParams }) => {
    const page = extractPageFromParams(searchParams);

    const [{ post }, { replies, isLastPage }] = await Promise.all([getPost(id), getPostReplies(page, id)]);

    if (!post || !replies)
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

            <PostsPagination posts={replies} isLastPage={isLastPage} currentPage={page} />
        </div>
    );
};

export default PostPage;
