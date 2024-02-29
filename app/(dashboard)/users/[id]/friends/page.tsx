import getUserFriends from "@/actions/users/read/get-user-friends";
import FriendsList from "@/components/user-profile/friends-list";
import { FC } from "react";

export type UserPageProps = {
    params: { id: string };
};

const UserFriendsPage: FC<UserPageProps> = async ({ params: { id } }) => {
    const { friends } = await getUserFriends(id);

    if (!friends) return <div>There was an error fetching your friends</div>;

    return <FriendsList friends={friends} />;
};

export default UserFriendsPage;
