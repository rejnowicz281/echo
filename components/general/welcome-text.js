"use client";

import useAuthContext from "@/providers/auth-provider";
import usePresenceContext from "@/providers/presence-provider";
import Image from "next/image";

export default function WelcomeText() {
    const { user } = useAuthContext();
    const { presenceEnabled } = usePresenceContext();

    return (
        <div>
            <p>
                Welcome, {user.first_name} {user.last_name}
            </p>
            <div>
                <Image src={user.avatar_url} alt="Avatar" width={50} height={50} />
            </div>
            <p>You are currently shown as {presenceEnabled ? "online" : "offline"}.</p>
        </div>
    );
}
