"use client";

import { User } from "@/types/users";
import { FC, createContext, useContext } from "react";

export type ChattersContextType = {
    chatters: User[];
    getChatter: (id: string) => User | undefined;
};

export type ChattersProviderProps = {
    children: React.ReactNode;
    chatters: User[];
};

const ChattersContext = createContext<ChattersContextType | null>(null);

export const ChattersProvider: FC<ChattersProviderProps> = ({ children, chatters }) => {
    const getChatter = (id: string) => chatters.find((chatter) => chatter.id === id);

    return (
        <ChattersContext.Provider
            value={{
                chatters,
                getChatter,
            }}
        >
            {children}
        </ChattersContext.Provider>
    );
};

const useChattersContext = () => {
    const context = useContext(ChattersContext);

    if (!context) throw new Error("useChattersContext must be used within a ChattersContext Provider");

    return context;
};

export default useChattersContext;
