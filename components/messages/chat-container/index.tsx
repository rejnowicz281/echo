import { Message } from "@/types/message";
import { User } from "@/types/users";
import { FC } from "react";
import { ChatProvider } from "./chat-provider";
import ContactInfo from "./contact-info";
import MessageForm from "./message-form";
import MessagesList from "./messages-list";

export type Contact = User & { is_friend: boolean };

export type ChatContainerProps = {
    messages: Message[];
    contact: Contact;
};

const ChatContainer: FC<ChatContainerProps> = ({ messages, contact }) => {
    return (
        <ChatProvider messages={messages} contact={contact}>
            <ContactInfo />

            <MessagesList />
            <MessageForm />
        </ChatProvider>
    );
};

export default ChatContainer;
