"use client";

import { Button } from "@/components/shadcn/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

export type SectionLinksProps = {
    userId: string;
};

const SectionLinks: FC<SectionLinksProps> = ({ userId }) => {
    const pathname = usePathname();

    const section = pathname.split("/").pop();

    return (
        <div className="flex flex-row text-gray-500">
            <Button variant="ghost" className="flex-1 text-lg" asChild>
                <Link href={`/users/${userId}/${section === "friends" ? "" : "friends"}`}>
                    {section === "friends" ? "Posts" : "Friends"}
                </Link>
            </Button>
            <Button variant="ghost" className="flex-1 text-lg" asChild>
                <Link href={`/users/${userId}/${section === "replies" ? "" : "replies"}`}>
                    {section === "replies" ? "Posts" : "Replies"}
                </Link>
            </Button>
        </div>
    );
};

export default SectionLinks;
