import getChat from "@/actions/messages/read/get-chat";
import ErrorContainer from "@/components/general/error-container";
import ChatContainer from "@/components/messages/chat-container";

type ChatPageProps = {
    params: Promise<{
        id: string; // Contact (user) id
    }>;
};

const ChatPage = async ({ params }: ChatPageProps) => {
    const { id } = await params;
    const { messages, contact } = await getChat(id);

    if (!messages || !contact) return <ErrorContainer error="An error occured while loading the chat" />;

    return <ChatContainer messages={messages} contact={contact} />;
};

export default ChatPage;
