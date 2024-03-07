"use client";

import PresenceAvatar from "@/components/general/presence-avatar";
import useAuthContext from "@/providers/auth-provider";
import userDisplayName from "@/utils/general/user-display-name";
import timePassedSinceDate from "@/utils/messages/time-passed-since-date";
import { FaRegCircle } from "@react-icons/all-files/fa/FaRegCircle";
import { FaUser } from "@react-icons/all-files/fa/FaUser";
import { FaUserFriends } from "@react-icons/all-files/fa/FaUserFriends";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { SidebarContact } from ".";

type ContactLinkProps = {
    contact: SidebarContact;
};

const ContactLink: FC<ContactLinkProps> = ({ contact }) => {
    const pathname = usePathname();

    const { user } = useAuthContext();

    const href = `/messages/${contact.id}`;

    const mostRecentMessageSection = () => {
        if (contact.most_recent_message) {
            const senderId = contact.most_recent_message.sender;
            const prefix = senderId === user.id ? "You: " : "";
            const timePassed = timePassedSinceDate(contact.most_recent_message.created_at);

            return (
                <div className="flex flex-row text-gray-500 text-sm gap-1">
                    <div className="truncate">{`${prefix}${contact.most_recent_message.text}`}</div>
                    <div>·</div>
                    <div>{timePassed}</div>
                </div>
            );
        }
    };

    return (
        <Link href={href} className="group flex items-center justify-between gap-4 group">
            <div className="min-w-0 truncate flex items-center gap-3">
                <PresenceAvatar userId={contact.id} avatarSize={50} src={contact.avatar_url} />
                <div
                    className={clsx(
                        "truncate flex flex-col justify-evenly p-2 group-hover:bg-gray-200 rounded-lg transition-colors",
                        pathname === href && "bg-gray-200"
                    )}
                >
                    <div className="flex flex-row gap-2 items-center">
                        {contact.id === user.id ? (
                            <FaUser className="shrink-0 text-xs text-gray-500" />
                        ) : contact.is_friend ? (
                            <FaUserFriends className="shrink-0 text-gray-500" />
                        ) : (
                            <FaRegCircle className="shrink-0 text-xs text-gray-500" />
                        )}
                        <div className="truncate">{userDisplayName(contact)}</div>
                    </div>
                    {mostRecentMessageSection()}
                </div>
            </div>
        </Link>
    );
};

export default ContactLink;
