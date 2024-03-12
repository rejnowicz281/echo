"use client";

import useAuthContext from "@/providers/auth-provider";
import userDisplayName from "@/utils/general/user-display-name";
import Link from "next/link";
import { FC } from "react";
import PresenceAvatar from "../presence-avatar";

const CurrentUser: FC<{ onClick?: () => void }> = ({ onClick }) => {
    const { user } = useAuthContext();

    const displayName = userDisplayName(user);

    return (
        <Link onClick={onClick} className="group flex flex-col items-center gap-3" href={`/users/${user.id}`}>
            <PresenceAvatar markerSize={17} avatarSize={65} userId={user.id} src={user.avatar_url} />
            <div className="word-break p-2 transition-colors rounded-lg group-hover:bg-gray-200">
                <div className="text-center">{displayName}</div>
                <div className="text-gray-500 text-center">
                    {displayName === user.email ? "Please set your full name in the profile settings." : user.email}
                </div>
            </div>
        </Link>
    );
};

export default CurrentUser;
