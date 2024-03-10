import getDiscoveryPosts from "@/actions/posts/read/get-discovery-posts";
import ErrorContainer from "@/components/general/error-container";
import PostsPagination from "@/components/posts/posts-pagination";
import { NextSearchParams } from "@/types/next-search-params";
import extractPageFromParams from "@/utils/general/extract-page-from-params";
import Link from "next/link";
import { FC } from "react";

const DiscoverPage: FC<{ searchParams: NextSearchParams }> = async ({ searchParams }) => {
    const page = extractPageFromParams(searchParams);
    const { posts, isLastPage, error } = await getDiscoveryPosts(page);

    if (error) return <ErrorContainer error={error} />;
    if (!posts) return <ErrorContainer error="An error has occurred while fetching the posts" />;

    return (
        <div className="p-12 mx-auto max-w-[800px] w-full flex flex-col gap-10">
            <div className="flex flex-col gap-5">
                <h1 className="text-4xl font-bold">Discover</h1>
                <div className="text-gray-500 flex flex-col gap-1">
                    <p>Welcome to the discovery page! Here you can see posts of users you aren't friends with.</p>

                    {posts.length <= 0 && page === 1 && (
                        <p>
                            It looks like there are no posts to show here... Click{" "}
                            <Link
                                className="
                            text-blue-500 hover:underline
                            "
                                href="/"
                            >
                                here
                            </Link>{" "}
                            to visit your feed instead.
                        </p>
                    )}
                </div>
            </div>

            <PostsPagination posts={posts} currentPage={page} isLastPage={isLastPage} />
        </div>
    );
};

export default DiscoverPage;
