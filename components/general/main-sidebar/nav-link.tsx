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
};

const NavLink: FC<NavLinkProps> = ({ href, text, icon, activeIcon }) => {
    const pathname = usePathname();

    const isActive = pathname === href;

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
