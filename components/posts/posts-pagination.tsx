import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/shadcn/ui/pagination";
import { POSTS_PER_PAGE } from "@/constants/posts";
import { Post } from "@/types/posts";
import { FC } from "react";
import PostsList from "./posts-list";

type PostsPaginationProps = {
    currentPage: number;
    isLastPage?: boolean;
    posts: Post[];
    showParentPost?: boolean;
};

const PostsPagination: FC<PostsPaginationProps> = ({ currentPage, isLastPage, showParentPost = false, posts }) => {
    const page = currentPage;
    const prevPage = page - 1;
    const prev2Page = page - 2;
    const nextPage = page + 1;
    const isFirstPage = page === 1;
    const onlyOnePage = isFirstPage && posts.length < POSTS_PER_PAGE;
    const outOfBounds = page !== 1 && posts.length <= 0;

    return (
        <>
            {outOfBounds ? (
                <div className="text-center text-gray-500">Nothing to find here... Maybe try a different page?</div>
            ) : (
                <PostsList posts={posts} showParentPost={showParentPost} />
            )}
            {!onlyOnePage && (
                <Pagination id="pagination">
                    <PaginationContent>
                        {!isFirstPage && (
                            <PaginationItem>
                                <PaginationPrevious href={`?page=${prevPage}`} />
                            </PaginationItem>
                        )}
                        {page > 2 && (
                            <PaginationItem>
                                <PaginationLink href={`?page=1`}>1</PaginationLink>
                            </PaginationItem>
                        )}
                        {page > 3 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}
                        {isLastPage && prev2Page > 0 && prev2Page !== 1 && (
                            <PaginationItem>
                                <PaginationLink href={`?page=${prev2Page}`}>{prev2Page}</PaginationLink>
                            </PaginationItem>
                        )}
                        {prevPage > 0 && (
                            <PaginationItem>
                                <PaginationLink href={`?page=${prevPage}`}>{prevPage}</PaginationLink>
                            </PaginationItem>
                        )}
                        <PaginationItem>
                            <PaginationLink href="#pagination" isActive>
                                {currentPage}
                            </PaginationLink>
                        </PaginationItem>
                        {nextPage > 0 && !isLastPage && !isFirstPage && (
                            <PaginationItem>
                                <PaginationLink href={`?page=${nextPage}`}>{nextPage}</PaginationLink>
                            </PaginationItem>
                        )}
                        {!isLastPage && (
                            <PaginationItem>
                                <PaginationNext href={`?page=${nextPage}`} />
                            </PaginationItem>
                        )}
                    </PaginationContent>
                </Pagination>
            )}
        </>
    );
};

export default PostsPagination;
