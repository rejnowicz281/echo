import { Friendship } from "@/types/friendships";
import { Message } from "@/types/message";
import { User } from "@/types/users";
import { FC } from "react";
import { ChatProvider } from "./chat-provider";
import ContactInfo from "./contact-info";
import MessageForm from "./message-form";
import MessagesList from "./messages-list";

export type Contact = User & { friendship: Friendship; is_current_user: boolean };

type ChatContainerProps = {
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
