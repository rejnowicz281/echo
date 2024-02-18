"use client";

import useAuthContext from "@/providers/auth-provider";
import usePresenceContext from "@/providers/presence-provider";
import userDisplayName from "@/utils/general/user-display-name";
import Image from "next/image";
import Link from "next/link";

const WelcomeText = () => {
    const { user } = useAuthContext();
    const { presenceEnabled } = usePresenceContext();

    return (
        <div>
            <p>
                Welcome, <Link href={`/users/${user.id}`}>{userDisplayName(user)}</Link>
            </p>
            {!user.first_name && !user.last_name && (
                <p>It looks like you haven't set your full name yet. You can do that in the settings.</p>
            )}
            <div>
                <Image src={user.avatar_url} alt="Avatar" width={50} height={50} />
            </div>
            <p>You are currently shown as {presenceEnabled ? "online" : "offline"}.</p>
        </div>
    );
};

export default WelcomeText;
