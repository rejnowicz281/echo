"use client";

import { Button } from "@/components/shadcn/ui/button";
import { Message } from "@/types/message";
import { User } from "@/types/users";
import userDisplayName from "@/utils/general/user-display-name";
import { MdKeyboardArrowLeft } from "@react-icons/all-files/md/MdKeyboardArrowLeft";
import { MdKeyboardArrowRight } from "@react-icons/all-files/md/MdKeyboardArrowRight";
import clsx from "clsx";
import { FC, useState } from "react";
import AddContactButton from "./add-contact-button";
import ContactLink from "./contact-link";
import ContactSearch from "./contact-search";

export type SidebarContact = User & { is_friend: boolean; most_recent_message: Message | null };

type MessagesSidebarProps = {
    contacts: SidebarContact[];
};

const MessagesSidebar: FC<MessagesSidebarProps> = ({ contacts }) => {
    const [open, setOpen] = useState(false);
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
        <div className={clsx("relative flex shrink-0", open ? "basis-[400px]" : "basis-[100px] 2xl:basis-[400px]")}>
            <div className="absolute overflow-auto inset-0 flex-1 flex flex-col">
                <div className="border-l border-l-gray-100 flex-1 flex flex-col">
                    <Button
                        variant="ghost"
                        onClick={() => setOpen(!open)}
                        className={clsx(
                            "2xl:hidden mx-4 flex gap-1 items-center border",
                            open ? "mt-4 rounded-2xl" : "my-4 rounded-full"
                        )}
                    >
                        {open ? (
                            <>
                                <MdKeyboardArrowRight className="text-xl" />
                                Collapse Sidebar
                            </>
                        ) : (
                            <MdKeyboardArrowLeft className="text-xl" />
                        )}
                    </Button>
                    <div className={clsx(open ? "block" : "hidden 2xl:block")}>
                        <ContactSearch
                            setSearchQuery={setSearchQuery}
                            searchQuery={searchQuery}
                            contactsCount={contacts.length}
                        />
                    </div>
                    <div className="flex flex-col gap-4 pb-4">
                        <AddContactButton sidebarOpen={open} />
                        {contacts.length > 0 ? (
                            <div className="flex flex-col">
                                {filteredContacts.map((contact) => (
                                    <ContactLink sidebarOpen={open} contact={contact} key={contact.id} />
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
            </div>
        </div>
    );
};

export default MessagesSidebar;
