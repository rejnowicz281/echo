import getAllUsers from "@/actions/auth/read/get-all-users";
import userDisplayName from "@/utils/general/user-display-name";
import Link from "next/link";

const UsersPage = async () => {
    const { users } = await getAllUsers();

    if (!users) return <div>There was an error fetching the users</div>;

    return (
        <ul>
            {users.map((user) => (
                <li key={user.id}>
                    <Link href={`/users/${user.id}`}>{userDisplayName(user)}</Link>
                </li>
            ))}
        </ul>
    );
};

export default UsersPage;
