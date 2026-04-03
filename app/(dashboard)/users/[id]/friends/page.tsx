import getUserFriends from "@/actions/users/read/get-user-friends";
import ErrorContainer from "@/components/general/error-container";
import FriendsList from "@/components/user-profile/friends-list";

type UserPageProps = {
    params: Promise<{ id: string }>;
};

const UserFriendsPage = async ({ params }: UserPageProps) => {
    const { id } = await params;
    const { friends } = await getUserFriends(id);

    if (!friends) return <ErrorContainer error="An error has occured while fetching this user's friends" />;

    return <FriendsList friends={friends} />;
};

export default UserFriendsPage;
