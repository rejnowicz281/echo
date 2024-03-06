import getChat from "@/actions/messages/read/get-chat";
import ErrorContainer from "@/components/general/error-container";
import ChatContainer from "@/components/messages/chat-container";
import { FC } from "react";

type ChatPageProps = {
    params: {
        id: string; // Contact (user) id
    };
};

const ChatPage: FC<ChatPageProps> = async ({ params: { id } }) => {
    const { messages, contact } = await getChat(id);

    if (!messages || !contact) return <ErrorContainer error="An error occured while loading the chat" />;

    return <ChatContainer messages={messages} contact={contact} />;
};

export default ChatPage;
