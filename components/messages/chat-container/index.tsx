"use client";

import ErrorContainer from "@/components/general/error-container";
import { Message } from "@/types/message";
import { FC } from "react";
import useContactsContext from "../contacts-provider";
import { ChatProvider } from "./chat-provider";
import ContactInfo from "./contact-info";
import MessageForm from "./message-form";
import MessagesList from "./messages-list";

export type ChatContainerProps = {
    messages: Message[];
    contactId: string;
};

const ChatContainer: FC<ChatContainerProps> = ({ messages, contactId }) => {
    const { getContact } = useContactsContext();

    const contact = getContact(contactId);

    if (!contact) return <ErrorContainer error="Contact not found" />;

    return (
        <ChatProvider messages={messages} contact={contact}>
            <ContactInfo />
            <MessagesList />
            <MessageForm />
        </ChatProvider>
    );
};

export default ChatContainer;
