"use client";

import useAuthContext from "@/providers/auth-provider";
import { Message } from "@/types/message";
import { assignTimestamp } from "@/utils/messages/generate-timestamps";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { FC, createContext, useContext, useEffect, useOptimistic } from "react";
import { Contact } from ".";

type ChatContextType = {
    contact: Contact;
    optimisticMessages: Message[];
    addOptimisticMessage: (text: string, sender?: string) => void;
    deleteOptimisticMessage: (id: string) => void;
};

type ChatProviderProps = {
    children: React.ReactNode;
    messages: Message[];
    contact: Contact;
};

const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider: FC<ChatProviderProps> = ({ children, contact, messages }) => {
    const [optimisticMessages, setOptimisticMessages] = useOptimistic(messages);
    const { user } = useAuthContext();

    const router = useRouter();
    const supabase = createClientComponentClient();

    useEffect(() => {
        if (contact.id === user.id) return;

        const messagesChannel = supabase
            .channel("messages")
            .on(
                "postgres_changes",
                {
                    schema: "public",
                    event: "*",
                    table: "messages",
                    filter: `recipient=eq.${user.id}`,
                },
                (payload) => {
                    console.log("Change received, refreshing router", payload.new);
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

    return (
        <ChatContext.Provider
            value={{
                contact,
                addOptimisticMessage,
                deleteOptimisticMessage,
                optimisticMessages,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

const useChatContext = () => {
    const context = useContext(ChatContext);

    if (!context) throw new Error("useChatContext must be used within a ChatContext Provider");

    return context;
};

export default useChatContext;
