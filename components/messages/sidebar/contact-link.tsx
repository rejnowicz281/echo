"use client";

import PresenceAvatar from "@/components/general/presence-avatar";
import { User } from "@/types/users";
import userDisplayName from "@/utils/general/user-display-name";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

export type ContactLinkProps = {
    contact: User;
};

const ContactLink: FC<ContactLinkProps> = ({ contact }) => {
    const pathname = usePathname();

    const href = `/messages/${contact.id}`;

    return (
        <Link href={href} className="group flex items-center gap-2 group">
            <PresenceAvatar userId={contact.id} avatarSize={50} src={contact.avatar_url} />
            <div
                className={`rounded-lg p-2 transition-colors group-hover:bg-gray-200${
                    pathname === href ? " bg-gray-200" : ""
                }`}
            >
                {userDisplayName(contact)}
            </div>
        </Link>
    );
};

export default ContactLink;
