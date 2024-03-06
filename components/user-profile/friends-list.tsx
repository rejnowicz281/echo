"use client";

import PresenceAvatar from "@/components/general/presence-avatar";
import useAuthContext from "@/providers/auth-provider";
import { User } from "@/types/users";
import userDisplayName from "@/utils/general/user-display-name";
import Link from "next/link";
import { FC } from "react";
import useUserContext from "./user-provider";

type FriendsListProps = {
    friends: User[];
};

const FriendsList: FC<FriendsListProps> = ({ friends }) => {
    const { user: currentUser } = useAuthContext();
    const { user } = useUserContext();

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

    return friends.length > 0 ? (
        <div className="flex flex-col gap-2">
            <h1 className="text-xl border-b pb-2 text-gray-500 text-center">Friends</h1>
            <div className="gap-4 flex flex-row justify-center flex-wrap">
                {friends.map((user) => userSection(user))}
            </div>
        </div>
    ) : (
        <div className="text-center text-gray-500">
            {currentUser.id === user.id
                ? "You've got"
                : user.first_name
                ? `${user.first_name} has`
                : `${user.email} has`}{" "}
            no friends.
        </div>
    );
};

export default FriendsList;
