"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

type NavLinkProps = {
    href: string;
    text: string;
    icon: React.ReactNode;
    activeIcon: React.ReactNode;
    activeCondition?: (pathname: string) => boolean;
};

const NavLink: FC<NavLinkProps> = ({ href, text, icon, activeIcon, activeCondition }) => {
    const pathname = usePathname();

    const isActive = activeCondition
        ? activeCondition(pathname)
        : href === "/"
        ? pathname === href
        : pathname.startsWith(href);

    return (
        <Link className="group flex flex-row items-center gap-2" href={href}>
            {isActive ? activeIcon : icon}{" "}
            <div className={clsx("p-2 transition-colors rounded-lg group-hover:bg-gray-200", isActive && "font-bold")}>
                {text}
            </div>
        </Link>
    );
};

export default NavLink;
