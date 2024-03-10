import getUserPosts from "@/actions/users/read/get-user-posts";
import ErrorContainer from "@/components/general/error-container";
import ConditionalPostForm from "@/components/user-profile/conditional-post-form";
import UserPostsContainer from "@/components/user-profile/user-posts-container";
import { NextSearchParams } from "@/types/next-search-params";
import extractPageFromParams from "@/utils/general/extract-page-from-params";
import { FC } from "react";

type UserPageProps = {
    searchParams: NextSearchParams;
    params: { id: string };
};

const UserPage: FC<UserPageProps> = async ({ params: { id }, searchParams }) => {
    const page = extractPageFromParams(searchParams);

    const { posts, isLastPage } = await getUserPosts(page, id);

    if (!posts)
        return <ErrorContainer error="An error occurred while fetching this user's posts. Please try again later." />;

    return (
        <div className="mx-auto max-w-[700px] w-full flex flex-col gap-10">
            <ConditionalPostForm />
            <UserPostsContainer isLastPage={isLastPage} posts={posts} currentPage={page} />
        </div>
    );
};

export default UserPage;
