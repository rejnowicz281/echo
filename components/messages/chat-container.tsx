"use client";

import deleteMessage from "@/actions/messages/modify/delete-message";
import ErrorContainer from "@/components/general/error-container";
import useAuthContext from "@/providers/auth-provider";
import { Message } from "@/types/message";
import userDisplayName from "@/utils/general/user-display-name";
import formatMessageDate from "@/utils/messages/format-message-date";
import { assignTimestamp } from "@/utils/messages/generate-timestamps";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { FC, useEffect, useOptimistic, useTransition } from "react";
import useChattersContext from "./chatters-provider";
import MessageForm from "./message-form";

export type ChatContainerProps = {
    messages: Message[];
    chatterId: string;
};

const ChatContainer: FC<ChatContainerProps> = ({ messages, chatterId }) => {
    const { getChatter } = useChattersContext();

    const chatter = getChatter(chatterId);

    if (!chatter) return <ErrorContainer error="Chatter not found" />;

    const [optimisticMessages, setOptimisticMessages] = useOptimistic(messages);
    const { user } = useAuthContext();
    const [isPending, startTransition] = useTransition();

    const router = useRouter();
    const supabase = createClientComponentClient();

    useEffect(() => {
        const messagesChannel = supabase
            .channel("messages")
            .on(
                "postgres_changes",
                {
                    schema: "public",
                    event: "*",
                    table: "messages",
                    filter: `sender=eq.${chatterId}`,
                },
                (payload) => {
                    console.log("Change received", payload.new);
                    router.refresh();
                }
            )
            .subscribe();

        console.log("Connected to messages channel", messagesChannel.topic);

        return () => {
            supabase.removeChannel(messagesChannel);
        };
    }, [supabase, router]);

    const addOptimisticMessage = (text: string, sender = user.id) => {
        const message = {
            id: Math.random().toString(),
            text,
            sender,
            loading: true,
            created_at: new Date().toISOString(),
        };

        setOptimisticMessages((messages) => {
            const lastMessage = messages[messages.length - 1];
            assignTimestamp(message, lastMessage);

            return [...messages, message];
        });
    };

    function deleteOptimisticMessage(id: string) {
        setOptimisticMessages((messages) => {
            const messageIndex = messages.findIndex((message) => message.id === id);
            assignTimestamp(messages[messageIndex + 1], messages[messageIndex - 1]);

            return messages.filter((message) => message.id !== id);
        });
    }

    const getSenderById = (id: string) => {
        return id === user.id ? user : chatter;
    };

    const messageSection = (message: Message) => {
        const sender = getSenderById(message.sender);

        return (
            <div key={message.id}>
                {message.timestamp && (
                    <p className="text-gray-500 text-center">{formatMessageDate(message.created_at)}</p>
                )}
                <div className="border">
                    <p>{message.text}</p>
                    {message.loading && <p className="text-gray-500">Loading...</p>}
                    <p className="text-gray-500">{userDisplayName(sender)}</p>
                    {sender.id === user.id && (
                        <form
                            action={(formData) => {
                                const idFormData = formData.get("id");
                                const id = typeof idFormData === "string" ? idFormData : "";
                                if (id) {
                                    deleteOptimisticMessage(id);
                                    deleteMessage(formData);
                                }
                            }}
                        >
                            <input type="hidden" name="id" value={message.id} />
                            <button type="submit">Delete</button>
                        </form>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div>
            <h1>Chatting with {userDisplayName(chatter)}</h1>
            {optimisticMessages.map((message) => messageSection(message))}
            <MessageForm addOptimisticMessage={addOptimisticMessage} recipient={chatterId} />
        </div>
    );
};

export default ChatContainer;
