"use client";

import formatMessageDate from "@/utils/messages/format-message-date";
import { useEffect, useRef } from "react";
import useChatContext from "../chat-provider";
import MessageContainer from "./message-container";

const MessagesList = () => {
    const listRef = useRef<HTMLDivElement>(null);
    const previousMessageCount = useRef<number>(0);
    const { optimisticMessages: messages } = useChatContext();

    useEffect(() => {
        if (messages && listRef.current) {
            const container = listRef.current;
            const currentMessageCount = messages.length;

            // Scroll down only if a new message is added
            if (currentMessageCount > previousMessageCount.current) {
                const lastMessage = container.lastElementChild;
                if (lastMessage) lastMessage.scrollIntoView({ behavior: "smooth" });
            }

            previousMessageCount.current = currentMessageCount;
        }
    }, [messages]);

    if (messages.length <= 0)
        return (
            <div className="flex flex-col flex-1 text-gray-500 text-lg items-center justify-center p-3 word-break">
                No messages found.
            </div>
        );

    return (
        <div className="flex flex-col flex-1 relative">
            <div ref={listRef} className="absolute inset-0 pt-5 overflow-y-auto word-break flex-1">
                {messages.map((message) => (
                    <div key={message.id}>
                        {message.timestamp && (
                            <div className="text-center text-gray-500 text-sm font-bold">
                                {formatMessageDate(message.created_at)}
                            </div>
                        )}
                        <MessageContainer message={message} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MessagesList;
