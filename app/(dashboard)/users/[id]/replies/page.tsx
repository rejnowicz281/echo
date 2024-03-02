import getUserReplies from "@/actions/users/read/get-user-replies";
import ErrorContainer from "@/components/general/error-container";
import RepliesList from "@/components/user-profile/replies-list";
import { FC } from "react";

export type UserRepliesPageProps = {
    params: { id: string };
};

const UserRepliesPage: FC<UserRepliesPageProps> = async ({ params: { id } }) => {
    const { replies } = await getUserReplies(id);

    if (!replies) return <ErrorContainer error="An error has occured while fetching this user's replies" />;

    return <RepliesList replies={replies} />;
};

export default UserRepliesPage;
