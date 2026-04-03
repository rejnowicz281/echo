import getUserReplies from "@/actions/users/read/get-user-replies";
import ErrorContainer from "@/components/general/error-container";
import UserRepliesContainer from "@/components/user-profile/user-replies-container";
import { NextSearchParams } from "@/types/next-search-params";
import extractPageFromParams from "@/utils/general/extract-page-from-params";

type UserRepliesPageProps = {
    params: Promise<{ id: string }>;
    searchParams: Promise<NextSearchParams>;
};

const UserRepliesPage = async ({ params, searchParams }: UserRepliesPageProps) => {
    const { id } = await params;
    const page = extractPageFromParams(await searchParams);
    const { posts: replies, isLastPage } = await getUserReplies(page, id);

    if (!replies) return <ErrorContainer error="An error has occured while fetching this user's replies" />;

    return <UserRepliesContainer replies={replies} isLastPage={isLastPage} currentPage={page} />;
};

export default UserRepliesPage;
