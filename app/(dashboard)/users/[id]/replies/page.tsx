import getUserReplies from "@/actions/users/read/get-user-replies";
import ErrorContainer from "@/components/general/error-container";
import LazyUserReplies from "@/components/user-profile/lazy-user-replies";
import { FC } from "react";

type UserRepliesPageProps = {
    params: { id: string };
};

const UserRepliesPage: FC<UserRepliesPageProps> = async ({ params: { id } }) => {
    const { posts: replies, isLastPage } = await getUserReplies(1, id);

    if (!replies) return <ErrorContainer error="An error has occured while fetching this user's replies" />;

    return <LazyUserReplies replies={replies} isLastPage={isLastPage} userId={id} />;
};

export default UserRepliesPage;
