import getUserReplies from "@/actions/users/read/get-user-replies";
import ErrorContainer from "@/components/general/error-container";
import UserRepliesContainer from "@/components/user-profile/user-replies-container";
import { NextSearchParams } from "@/types/next-search-params";
import extractPageFromParams from "@/utils/general/extract-page-from-params";
import { FC } from "react";

type UserRepliesPageProps = {
    params: { id: string };
    searchParams: NextSearchParams;
};

const UserRepliesPage: FC<UserRepliesPageProps> = async ({ params: { id }, searchParams }) => {
    const page = extractPageFromParams(searchParams);
    const { posts: replies, isLastPage } = await getUserReplies(page, id);

    if (!replies) return <ErrorContainer error="An error has occured while fetching this user's replies" />;

    return <UserRepliesContainer replies={replies} isLastPage={isLastPage} currentPage={page} />;
};

export default UserRepliesPage;
