"use client";

import useAuthContext from "@/providers/auth-provider";
import { FaRegUser, FaUser } from "react-icons/fa6";
import NavLink from "./nav-link";

const ProfileLink = () => {
    const { user } = useAuthContext();

    return (
        <NavLink
            href={`/users/${user.id}`}
            text="Profile"
            icon={<FaRegUser className="text-3xl" />}
            activeIcon={<FaUser className="text-3xl" />}
        />
    );
};

export default ProfileLink;
