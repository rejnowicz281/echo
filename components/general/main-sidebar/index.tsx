import AddPostButton from "@/components/posts/add-post-button";
import { BiMessageSquareDots } from "@react-icons/all-files/bi/BiMessageSquareDots";
import { BiSolidMessageSquareDots } from "@react-icons/all-files/bi/BiSolidMessageSquareDots";
import { GoHome } from "@react-icons/all-files/go/GoHome";
import { GoHomeFill } from "@react-icons/all-files/go/GoHomeFill";
import { HiOutlineUsers } from "@react-icons/all-files/hi/HiOutlineUsers";
import { HiUsers } from "@react-icons/all-files/hi/HiUsers";
import { IoLeafOutline } from "@react-icons/all-files/io5/IoLeafOutline";
import { IoLeafSharp } from "@react-icons/all-files/io5/IoLeafSharp";
import { MdOutlinePersonSearch } from "@react-icons/all-files/md/MdOutlinePersonSearch";
import { MdPersonSearch } from "@react-icons/all-files/md/MdPersonSearch";
import CurrentUser from "./current-user";
import NavLink from "./nav-link";
import ProfileLink from "./profile-link";
import SignOutButton from "./sign-out-button";
import TogglePresenceButton from "./toggle-presence-button";

const MainSidebar = () => {
    return (
        <div className="px-16 py-12 border-r border-r-gray-100 flex-1 flex flex-col gap-12">
            <CurrentUser />
            <div className="flex flex-col gap-3">
                <SignOutButton />
                <TogglePresenceButton />
                <AddPostButton />
            </div>
            <div className="flex flex-col gap-5">
                <NavLink
                    href="/"
                    text="Home"
                    icon={<GoHome className="text-3xl" />}
                    activeIcon={<GoHomeFill className="text-3xl" />}
                />
                <NavLink
                    href="/discover"
                    text="Discover"
                    icon={<IoLeafOutline className="text-3xl" />}
                    activeIcon={<IoLeafSharp className="text-3xl" />}
                />
                <ProfileLink />
                <NavLink
                    href="/messages"
                    text="Messages"
                    icon={<BiMessageSquareDots className="text-3xl" />}
                    activeIcon={<BiSolidMessageSquareDots className="text-3xl" />}
                />
                <NavLink
                    href="/friends"
                    text="Friends"
                    icon={<HiOutlineUsers className="text-3xl" />}
                    activeIcon={<HiUsers className="text-3xl" />}
                />
                <NavLink
                    href="/users"
                    text="Users"
                    icon={<MdOutlinePersonSearch className="text-3xl" />}
                    activeIcon={<MdPersonSearch className="text-3xl" />}
                />
            </div>
        </div>
    );
};

export default MainSidebar;
