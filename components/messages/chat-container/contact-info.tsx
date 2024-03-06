"use client";

import PresenceAvatar from "@/components/general/presence-avatar";
import userDisplayName from "@/utils/general/user-display-name";
import Link from "next/link";
import useChatContext from "./chat-provider";

const ContactInfo = () => {
    const { contact } = useChatContext();

    const displayName = userDisplayName(contact);

    return (
        <div className="p-8 border-b border-b-gray-100 word-break flex flex-wrap items-center gap-2 justify-between">
            <Link href={`/users/${contact.id}`} className="flex items-center gap-3 group">
                <PresenceAvatar avatarSize={60} src={contact.avatar_url} userId={contact.id} />
                <div className="flex flex-col justify-evenly p-2 group-hover:bg-gray-200 rounded-lg transition-colors">
                    <div>{displayName}</div>
                    {contact.email !== displayName && <div className="text-gray-500">{contact.email}</div>}
                </div>
            </Link>
            <div className="text-gray-500">
                {contact.is_current_user
                    ? "You are currently talking to yourself"
                    : `You are ${!contact.is_friend ? "not" : ""} friends with this user`}
            </div>
        </div>
    );
};

export default ContactInfo;
