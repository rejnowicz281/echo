import getAllUsers from "@/actions/users/read/get-all-users";
import ErrorContainer from "@/components/general/error-container";
import PresenceAvatar from "@/components/general/presence-avatar";
import { User } from "@/types/users";
import userDisplayName from "@/utils/general/user-display-name";
import Link from "next/link";

const UsersPage = async () => {
    const { users } = await getAllUsers();

    if (!users) return <ErrorContainer error="An error has occured while fetching the users" />;

    const userSection = (user: User) => {
        const displayName = userDisplayName(user);

        return (
            <Link
                href={`/users/${user.id}`}
                className="group rounded-lg p-4 w-72 h-72 flex flex-col items-center gap-4"
                key={user.id}
            >
                <PresenceAvatar avatarSize={100} markerSize={23} userId={user.id} src={user.avatar_url} />
                <div className="p-2 transition-colors rounded-lg group-hover:bg-gray-200">
                    <div className="text-center">{displayName}</div>
                    {displayName !== user.email && <div className="text-gray-500 text-center">{user.email}</div>}
                </div>
            </Link>
        );
    };

    return (
        <div className="p-16">
            <h1 className="border-b mb-4 pb-4 text-center text-2xl">Users</h1>
            <div className="flex-1 gap-4 flex flex-row justify-center flex-wrap">
                {users.map((user) => userSection(user))}
            </div>
        </div>
    );
};

export default UsersPage;
