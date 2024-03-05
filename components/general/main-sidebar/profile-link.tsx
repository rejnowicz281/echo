"use client";

import useAuthContext from "@/providers/auth-provider";
import { FaRegUser } from "@react-icons/all-files/fa6/FaRegUser";
import { FaUser } from "@react-icons/all-files/fa6/FaUser";
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
