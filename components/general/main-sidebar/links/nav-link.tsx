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
        <Link
            className={clsx(
                "group flex-1 border-t border-t-gray-200 lg:border-t-0 flex px-2 py-4 lg:p-0 transition-colors lg:transition-none justify-center lg:justify-normal hover:bg-gray-200 lg:hover:bg-inherit lg:flex lg:flex-row lg:items-center lg:gap-2",
                isActive && "bg-gray-100 lg:bg-inherit"
            )}
            href={href}
        >
            {isActive ? activeIcon : icon}
            <div
                className={clsx(
                    "hidden lg:block p-2 transition-colors rounded-lg group-hover:bg-gray-200",
                    isActive && "font-bold"
                )}
            >
                {text}
            </div>
        </Link>
    );
};

export default NavLink;
