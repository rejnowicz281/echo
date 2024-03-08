"use client";

import { GoHome } from "@react-icons/all-files/go/GoHome";
import { GoHomeFill } from "@react-icons/all-files/go/GoHomeFill";
import NavLink from "./nav-link";

const HomeLink = () => {
    return (
        <NavLink
            activeCondition={(pathname: string) => pathname === "/" || pathname.startsWith("/posts")}
            href="/"
            text="Home"
            icon={<GoHome className="text-3xl" />}
            activeIcon={<GoHomeFill className="text-3xl" />}
        />
    );
};

export default HomeLink;
