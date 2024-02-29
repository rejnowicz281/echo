import getUserReplies from "@/actions/users/read/get-user-replies";
import RepliesList from "@/components/user-profile/replies-list";
import { FC } from "react";

export type UserRepliesPageProps = {
    params: { id: string };
};

const UserRepliesPage: FC<UserRepliesPageProps> = async ({ params: { id } }) => {
    const { replies } = await getUserReplies(id);

    if (!replies) return <div>There was an error fetching the replies</div>;

    return <RepliesList replies={replies} />;
};

export default UserRepliesPage;
