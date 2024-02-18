import getAllFriends from "@/actions/friendships/read/get-all-friends";
import userDisplayName from "@/utils/general/user-display-name";
import Link from "next/link";

const FriendsPage = async () => {
    const { friends } = await getAllFriends();

    return (
        <ul>
            {friends.map((friend) => (
                <li key={friend.id}>
                    <Link href={`/users/${friend.id}`}>{userDisplayName(friend)}</Link>
                    {!friend.accepted && " (request pending)"}
                </li>
            ))}
        </ul>
    );
};

export default FriendsPage;
