"use client";

import usePresenceContext from "@/providers/presence-provider";
import { User } from "@/types/users";
import userDisplayName from "@/utils/general/user-display-name";
import { FC, useState } from "react";
import ContactLink from "./contact-link";
import ContactSearch from "./contact-search";

type MessagesSidebarProps = {
    contacts: User[];
};

const MessagesSidebar: FC<MessagesSidebarProps> = ({ contacts }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const { loggedUsers } = usePresenceContext();

    contacts.sort((a, b) => {
        if (loggedUsers.includes(a.id) && !loggedUsers.includes(b.id)) return -1; // if 'a' is logged in and 'b' is not, put 'a' first
        if (!loggedUsers.includes(a.id) && loggedUsers.includes(b.id)) return 1; // if 'b' is logged in and 'a' is not, put 'b' first

        const displayNameA = userDisplayName(a);
        const displayNameB = userDisplayName(b);

        return displayNameA.localeCompare(displayNameB); // sort by display name
    });

    contacts = contacts.filter((contact) => {
        const displayName = userDisplayName(contact).toLowerCase();
        const query = searchQuery.toLowerCase().trim();

        return displayName.includes(query); // filter by display name
    });

    return (
        <div className="border-l border-l-gray-100 flex-1 flex flex-col gap-3">
            <ContactSearch setSearchQuery={setSearchQuery} searchQuery={searchQuery} contactsCount={contacts.length} />
            {contacts.length > 0 ? (
                <div className="flex flex-col gap-5 px-4">
                    {contacts.map((contact) => (
                        <ContactLink contact={contact} key={contact.id} />
                    ))}
                </div>
            ) : (
                <div className="px-4 text-gray-600">
                    <p>This is where your contacts (friends, other users you chatted with) will appear.</p>
                    <p>It looks like you don't have any contacts yet.</p>
                </div>
            )}
        </div>
    );
};

export default MessagesSidebar;
