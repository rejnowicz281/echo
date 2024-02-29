"use client";

import { Friendship } from "@/types/friendships";
import { Post } from "@/types/posts";
import { User } from "@/types/users";
import { FC, createContext, useContext } from "react";

export type UserType = User & { friendship: Friendship; posts: Post[] };

export type UserProviderProps = {
    children: React.ReactNode;
    user: UserType;
};

const UserContext = createContext<{ user: UserType } | null>(null);

export const UserProvider: FC<UserProviderProps> = ({ children, user }) => {
    return (
        <UserContext.Provider
            value={{
                user,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

const useUserContext = () => {
    const context = useContext(UserContext);

    if (!context) throw new Error("useUserContext must be used within a AuthContext Provider");

    return context;
};

export default useUserContext;
