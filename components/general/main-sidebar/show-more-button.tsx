"use client";

import AddPostButton from "@/components/posts/add-post-button";
import { Button } from "@/components/shadcn/ui/button";
import useAuthContext from "@/providers/auth-provider";
import { HiBars3 } from "@react-icons/all-files/hi2/HiBars3";
import { HiBars3BottomRight } from "@react-icons/all-files/hi2/HiBars3BottomRight";
import { MdOutlinePersonSearch } from "@react-icons/all-files/md/MdOutlinePersonSearch";
import { MdPersonSearch } from "@react-icons/all-files/md/MdPersonSearch";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import CurrentUser from "./current-user";
import SignOutButton from "./sign-out-button";
import TogglePresenceButton from "./toggle-presence-button";

const ShowMoreButton = () => {
    const pathname = usePathname();
    const [showMore, setShowMore] = useState(false);
    const { user } = useAuthContext();

    useEffect(() => {
        const mainChildrenSection = document.getElementById("main-children-section");
        if (mainChildrenSection) {
            if (showMore) mainChildrenSection.style.display = "none";
            else mainChildrenSection.style.display = "flex";
        }
    }, [showMore]);

    // Hide show more section when route changes
    useEffect(() => {
        setShowMore(false);
    }, [pathname]);

    const showMoreContainer = () => {
        const mainSection = document.getElementById("main-section");

        if (mainSection) {
            return createPortal(
                <div className="lg:hidden flex-1 flex justify-center py-8 px-4">
                    <div className="flex-1 flex flex-col justify-center gap-4 max-w-[350px]">
                        <CurrentUser onClick={() => (pathname === `/users/${user.id}` ? setShowMore(false) : null)} />

                        <Button
                            variant="ghost"
                            asChild
                            className={clsx(
                                "rounded-2xl flex flex-row gap-2 items-center border",
                                pathname === "/users" && "bg-gray-50"
                            )}
                        >
                            <Link onClick={() => (pathname === "/users" ? setShowMore(false) : null)} href="/users">
                                {pathname === "/users" ? (
                                    <MdPersonSearch className="text-xl" />
                                ) : (
                                    <MdOutlinePersonSearch className="text-xl" />
                                )}{" "}
                                See all users
                            </Link>
                        </Button>

                        <TogglePresenceButton />

                        <AddPostButton />

                        <SignOutButton />
                    </div>
                </div>,
                mainSection
            );
        }
    };

    return (
        <>
            {showMore && showMoreContainer()}
            <button
                onClick={() => setShowMore(!showMore)}
                className={clsx(
                    "lg:hidden group flex-1 border-t border-t-gray-200 flex px-2 py-4 transition-colors justify-center hover:bg-gray-200",
                    showMore && "bg-gray-100"
                )}
            >
                {showMore ? <HiBars3BottomRight className="text-3xl" /> : <HiBars3 className="text-3xl" />}
            </button>
        </>
    );
};

export default ShowMoreButton;
