import getChatterMessages from "@/actions/messages/read/get-chatter-messages";
import ErrorContainer from "@/components/general/error-container";
import ChatContainer from "@/components/messages/chat-container";
import { FC } from "react";

export type ChatPageProps = {
    params: {
        id: string;
    };
};

const ChatPage: FC<ChatPageProps> = async ({ params: { id } }) => {
    const { messages } = await getChatterMessages(id);

    if (!messages) return <ErrorContainer error="An error occured while fetching your messages" />;

    return <ChatContainer messages={messages} chatterId={id} />;
};

export default ChatPage;
