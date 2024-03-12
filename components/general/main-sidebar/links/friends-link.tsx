import { HiOutlineUsers } from "@react-icons/all-files/hi/HiOutlineUsers";
import { HiUsers } from "@react-icons/all-files/hi/HiUsers";
import NavLink from "./nav-link";

const FriendsLink = () => {
    return (
        <NavLink
            href="/friends"
            text="Friends"
            icon={<HiOutlineUsers className="text-3xl" />}
            activeIcon={<HiUsers className="text-3xl" />}
        />
    );
};

export default FriendsLink;
