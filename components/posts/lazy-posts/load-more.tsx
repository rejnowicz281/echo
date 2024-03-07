"use client";

import getFeedPosts from "@/actions/posts/read/get-feed-posts/server";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import { GetPostsAction } from "@/types/get-posts-action";
import { Post } from "@/types/posts";
import { FC, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import PostsList from "./posts-list";

type LoadMoreProps = {
    getPostsAction?: GetPostsAction;
    showParentPost?: boolean;
};

const LoadMore: FC<LoadMoreProps> = ({ getPostsAction = getFeedPosts, showParentPost = false }) => {
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) loadMorePosts();
    }, [inView]);

    const loadMorePosts = async () => {
        const nextPage = page + 1;

        const { posts, isLastPage } = await getPostsAction(nextPage);

        if (!posts) return setLoading(false);

        if (isLastPage) setLoading(false); // Avoid unecessary fetches
        else setPage(page + 1);

        setPosts((prev) => [...prev, ...posts]);
    };

    return (
        <>
            <PostsList posts={posts} showParentPost={showParentPost} />
            {loading && (
                <div className="px-4 flex flex-col gap-3" ref={ref}>
                    <div className="flex flex-row gap-3 items-center">
                        <Skeleton className="shrink-0 rounded-[50%] h-[50px] w-[50px]" />
                        <div className="flex flex-col justify-center gap-1">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    </div>
                    <div className="py-3 flex flex-col gap-3">
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-6 w-full" />
                    </div>
                    <Skeleton className="h-4 w-36" />
                    <div className="flex flex-row items-center gap-10">
                        <Skeleton className="h-6 w-6 rounded-[50%]" />
                        <Skeleton className="h-6 w-6 rounded-[50%]" />
                    </div>
                </div>
            )}
        </>
    );
};

export default LoadMore;
