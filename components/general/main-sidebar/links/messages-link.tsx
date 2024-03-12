import { BiMessageSquareDots } from "@react-icons/all-files/bi/BiMessageSquareDots";
import { BiSolidMessageSquareDots } from "@react-icons/all-files/bi/BiSolidMessageSquareDots";
import NavLink from "./nav-link";

const MessagesLink = () => {
    return (
        <NavLink
            href="/messages"
            text="Messages"
            icon={<BiMessageSquareDots className="text-3xl" />}
            activeIcon={<BiSolidMessageSquareDots className="text-3xl" />}
        />
    );
};

export default MessagesLink;
