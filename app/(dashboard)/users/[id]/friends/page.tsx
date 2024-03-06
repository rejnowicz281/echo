import getUserFriends from "@/actions/users/read/get-user-friends";
import ErrorContainer from "@/components/general/error-container";
import FriendsList from "@/components/user-profile/friends-list";
import { FC } from "react";

type UserPageProps = {
    params: { id: string };
};

const UserFriendsPage: FC<UserPageProps> = async ({ params: { id } }) => {
    const { friends } = await getUserFriends(id);

    if (!friends) return <ErrorContainer error="An error has occured while fetching this user's friends" />;

    return <FriendsList friends={friends} />;
};

export default UserFriendsPage;
