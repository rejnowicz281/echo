import getUser from "@/actions/auth/read/get-user";
import FriendshipContainer from "@/components/users/friendship-container";
import userDisplayName from "@/utils/general/user-display-name";
import Image from "next/image";

const UserPage = async ({ params: { id } }) => {
    const { user } = await getUser(id);

    return (
        <>
            <h1>{user.email}</h1>
            <p>{userDisplayName(user)}</p>
            <p>{user.id}</p>
            <Image src={user.avatar_url} alt={userDisplayName(user)} width={150} height={150} />
            <FriendshipContainer userVisited={user} />
        </>
    );
};

export default UserPage;
