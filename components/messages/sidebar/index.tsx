"use client";

import { Message } from "@/types/message";
import { User } from "@/types/users";
import userDisplayName from "@/utils/general/user-display-name";
import { FC, useState } from "react";
import AddContactButton from "./add-contact-button";
import ContactLink from "./contact-link";
import ContactSearch from "./contact-search";

export type SidebarContact = User & { is_friend: boolean; most_recent_message: Message | null };

type MessagesSidebarProps = {
    contacts: SidebarContact[];
};

const MessagesSidebar: FC<MessagesSidebarProps> = ({ contacts }) => {
    const [searchQuery, setSearchQuery] = useState("");

    contacts.sort((a, b) => {
        const dateA = a.most_recent_message ? new Date(a.most_recent_message.created_at) : new Date(0);
        const dateB = b.most_recent_message ? new Date(b.most_recent_message.created_at) : new Date(0);

        return dateB.getTime() - dateA.getTime(); // sort in descending order of date
    });

    const filteredContacts = contacts.filter((contact) => {
        const displayName = userDisplayName(contact).toLowerCase();
        const query = searchQuery.toLowerCase().trim();

        return displayName.includes(query); // filter by display name
    });

    return (
        <div className="border-l border-l-gray-100 flex-1">
            <ContactSearch setSearchQuery={setSearchQuery} searchQuery={searchQuery} contactsCount={contacts.length} />
            <div className="flex flex-col gap-4 px-4 pb-4">
                <AddContactButton />
                {contacts.length > 0 ? (
                    <div className="flex flex-col gap-5">
                        {filteredContacts.map((contact) => (
                            <ContactLink contact={contact} key={contact.id} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500">
                        <p>This is where your contacts (friends, other users you chatted with) will appear.</p>
                        <p>It looks like you don't have any contacts yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessagesSidebar;
