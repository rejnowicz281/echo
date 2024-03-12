"use client";

import useAuthContext from "@/providers/auth-provider";
import { MdOutlinePersonSearch } from "@react-icons/all-files/md/MdOutlinePersonSearch";
import { MdPersonSearch } from "@react-icons/all-files/md/MdPersonSearch";
import NavLink from "./nav-link";

const UsersLink = () => {
    const { user } = useAuthContext();

    return (
        <NavLink
            activeCondition={(pathname: string) =>
                !pathname.startsWith(`/users/${user.id}`) && pathname.startsWith("/users")
            }
            href="/users"
            text="Users"
            icon={<MdOutlinePersonSearch className="text-3xl" />}
            activeIcon={<MdPersonSearch className="text-3xl" />}
        />
    );
};

export default UsersLink;
