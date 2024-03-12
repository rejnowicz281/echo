import { IoLeafOutline } from "@react-icons/all-files/io5/IoLeafOutline";
import { IoLeafSharp } from "@react-icons/all-files/io5/IoLeafSharp";
import NavLink from "./nav-link";

const DiscoverLink = () => {
    return (
        <NavLink
            href="/discover"
            text="Discover"
            icon={<IoLeafOutline className="text-3xl" />}
            activeIcon={<IoLeafSharp className="text-3xl" />}
        />
    );
};

export default DiscoverLink;
